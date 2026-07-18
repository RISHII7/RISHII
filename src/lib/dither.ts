/**
 * Canvas dithering helpers for the hero portrait/field and About halftone.
 * Hero canvases render at a deliberately low resolution and are upscaled
 * with `image-rendering: pixelated` for the dot-matrix look.
 */

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Canvas backing resolution: fixed low width, height follows CSS aspect. */
function lowRes(canvas: HTMLCanvasElement, w = 240): { w: number; h: number } {
  const aspect = canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : 16 / 9;
  const h = Math.max(1, Math.round(w / aspect));
  canvas.width = w;
  canvas.height = h;
  return { w, h };
}

/**
 * Ordered-dither monochrome portrait from a face-focused crop of `img`,
 * fit to the canvas height (times `zoom`), centered on `anchorX`
 * (canvas-width fraction) and top-aligned so the head is never cropped.
 * Edges dissolve into the background field.
 */
export function drawDitheredPortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  crop: CropRect,
  opts: { anchorX?: number; zoom?: number; res?: number } = {},
  blobOpts?: { bx: number; by: number; fieldW: number; fieldH: number }
): void {
  const { anchorX = 0.72, zoom = 1, res = 240 } = opts;
  const { w, h } = lowRes(canvas, res);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const sx = crop.x * img.width;
  const sy = crop.y * img.height;
  const sw = crop.w * img.width;
  const sh = crop.h * img.height;

  // fit crop to canvas height, then zoom; top-aligned keeps the head whole
  const scale = (h / sh) * zoom;
  const dw = Math.round(sw * scale);
  const dx = Math.round(w * anchorX - dw / 2);

  const dh = Math.round(sh * scale);

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return;
  // slight blur at low res softens the dither clusters like the reference
  octx.filter = "blur(0.5px)";
  octx.drawImage(img, sx, sy, sw, sh, dx, 0, dw, dh);

  const px = octx.getImageData(0, 0, w, h).data;
  ctx.clearRect(0, 0, w, h);

  const light = "#cfccc6";
  const mid = "#8f8c88";
  const dark = "#3f3f3d";
  const fadeBand = Math.max(6, Math.round(dw * 0.18));

  for (let y = 0; y < h; y++) {
    for (let x = Math.max(0, dx); x < Math.min(w, dx + dw); x++) {
      const i = (y * w + x) * 4;
      if (px[i + 3] < 40) continue;
      const raw = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      
      // if blobOpts is passed, we check proximity to cursor blob to erase points
      let eraser = 1;
      if (blobOpts && blobOpts.bx >= 0) {
        const bd = Math.hypot(x - blobOpts.bx, y - blobOpts.by);
        const br = w * 0.18; // radius of eraser blob in low-res pixels, scales with width
        if (bd < br) {
          // completely erase near the center, smoothly falloff at the edge
          eraser = Math.pow(bd / br, 2.5);
        }
      }

      if (eraser < 0.05) continue; // skipped

      // contrast boost so facial planes separate cleanly when dithered, with
      // a soft knee above 0.6 so bright highlights (skin, fabric) keep dot
      // texture instead of clamping into a solid block
      const linear = (raw - 0.5) * 1.6 + 0.56;
      const knee = 0.6;
      const lum = Math.max(0, linear <= knee ? linear : knee + (linear - knee) * 0.12);
      // true blacks stay empty — the face pops against the dark field
      if (lum < 0.16) continue;
      // dissolve toward both crop edges
      const edge = Math.min(x - dx, dx + dw - x);
      const fade = Math.min(1, edge / fadeBand);
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (lum * fade * 1.1 * eraser < threshold * 0.95) continue;
      ctx.fillStyle = lum > 0.7 ? light : lum > 0.42 ? mid : dark;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

/**
 * Crisp ordered-dither portrait that FILLS a contained card (About section)
 * — same fine 1px Bayer look as the hero, no edge fade. The whole photo is
 * cover-fit into the card; `anchorX`/`anchorY` (0–1) keep the face framed,
 * and the canvas should carry `image-rendering: pixelated`.
 */
export function drawDitheredCard(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  opts: {
    anchorX?: number;
    anchorY?: number;
    res?: number;
    shades?: [string, string, string];
  } = {},
): void {
  const {
    anchorX = 0.5,
    anchorY = 0.18,
    res = 340,
    shades = ["#ece9e4", "#9d9a95", "#4a4a47"],
  } = opts;

  const rect = canvas.getBoundingClientRect();
  const aspect = rect.width > 0 && rect.height > 0 ? rect.width / rect.height : 0.8;
  const w = res;
  const h = Math.max(1, Math.round(res / aspect));
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return;

  // cover-fit the whole photo, framed by the anchors
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = (w - dw) * anchorX;
  const dy = (h - dh) * anchorY;
  octx.filter = "blur(0.4px)";
  octx.drawImage(img, dx, dy, dw, dh);

  const px = octx.getImageData(0, 0, w, h).data;
  ctx.clearRect(0, 0, w, h);
  const [light, mid, dark] = shades;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (px[i + 3] < 40) continue;
      const raw = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      // contrast boost for midtone separation, with a soft knee above 0.6 so
      // bright regions (skin under flash, white fabric) keep dot texture
      // instead of clamping to a solid block
      const linear = (raw - 0.5) * 1.6 + 0.56;
      const knee = 0.6;
      const lum = Math.max(0, linear <= knee ? linear : knee + (linear - knee) * 0.12);
      if (lum < 0.14) continue; // true blacks stay empty
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (lum * 1.1 < threshold * 0.95) continue;
      ctx.fillStyle = lum > 0.7 ? light : lum > 0.42 ? mid : dark;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

/**
 * Whole-photo ordered dither, cover-fit across the entire canvas (the
 * "mobile look"): bright checkerboard rendering of the full scene, face
 * kept in frame via `faceX` (image-width fraction) anchored to `anchorX`.
 */
export function drawDitheredCover(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  opts: { faceX?: number; anchorX?: number } = {},
): void {
  const { faceX = 0.36, anchorX = 0.5 } = opts;
  const { w, h } = lowRes(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  // pull the face toward anchorX, but never expose canvas beyond the image
  const dx = Math.min(0, Math.max(w - dw, w * anchorX - faceX * dw));
  const dy = 0; // top-aligned: the head lives in the upper part of the photo

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return;
  octx.filter = "blur(0.5px)";
  octx.drawImage(img, dx, dy, dw, dh);

  const px = octx.getImageData(0, 0, w, h).data;
  ctx.clearRect(0, 0, w, h);

  const light = "#c2bfb9";
  const mid = "#8a8783";
  const dark = "#454543";

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (px[i + 3] < 40) continue;
      const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (lum * 1.15 < threshold * 0.92) continue;
      ctx.fillStyle = lum > 0.68 ? light : lum > 0.4 ? mid : dark;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

export interface AmbientField {
  /** luminance of the blurred full photo, per low-res pixel */
  lum: Float32Array;
  /** static per-pixel jitter so the clouds feel grainy */
  jitter: Float32Array;
  w: number;
  h: number;
}

/**
 * Precompute the ambient backdrop: the WHOLE photo, blurred and darkened,
 * sampled at low resolution. Dithering this luminance map produces the
 * cloudy dot-matrix background the hero sits on.
 */
export function makeAmbientField(canvas: HTMLCanvasElement, img: HTMLImageElement): AmbientField {
  const w = canvas.width;
  const h = canvas.height;

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  const lum = new Float32Array(w * h);
  const jitter = new Float32Array(w * h);
  for (let i = 0; i < jitter.length; i++) jitter[i] = Math.random();

  if (octx) {
    // cover-fit the full photo, heavily blurred relative to the low res
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    octx.filter = "blur(3px)";
    octx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    const px = octx.getImageData(0, 0, w, h).data;
    for (let i = 0; i < lum.length; i++) {
      const j = i * 4;
      lum[i] = (0.2126 * px[j] + 0.7152 * px[j + 1] + 0.0722 * px[j + 2]) / 255;
    }
  }

  return { lum, jitter, w, h };
}

/** Render the static ambient field (cloudy dithered echo of the photo). */
export function drawAmbientField(canvas: HTMLCanvasElement, field: AmbientField): void {
  const { lum, jitter, w, h } = field;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      // faint ambient level from the blurred photo, plus grain — kept dim
      // so the portrait owns the frame
      const v = lum[i] * 0.26 + jitter[i] * 0.05;
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (v < threshold) continue;
      ctx.fillStyle = v > 0.3 ? "#343432" : "#212120";
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

/**
 * Accent-duotone halftone portrait (About section): round dots sized by
 * luminance, accent color on ink.
 */
export function drawHalftonePortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  accent: string,
  cell = 5,
  offsetX = 0.5,
  offsetY = 0.5,
): void {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return;

  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  
  const dx = (w - dw) * offsetX;
  const dy = (h - dh) * offsetY;
  octx.drawImage(img, dx, dy, dw, dh);
  const px = octx.getImageData(0, 0, w, h).data;

  ctx.fillStyle = "#0e0e0e";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = accent;

  for (let y = cell / 2; y < h; y += cell) {
    for (let x = cell / 2; x < w; x += cell) {
      const i = (Math.floor(y) * w + Math.floor(x)) * 4;
      const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      const r = (lum * cell) / 2;
      if (r < 0.3) continue;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
