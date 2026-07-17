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
 * fit to the full canvas height and centered on `anchorX` (canvas-width
 * fraction). Edges dissolve into the background field.
 */
export function drawDitheredPortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  crop: CropRect,
  anchorX = 0.72,
): void {
  const { w, h } = lowRes(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const sx = crop.x * img.width;
  const sy = crop.y * img.height;
  const sw = crop.w * img.width;
  const sh = crop.h * img.height;

  // fit crop to full canvas height
  const scale = h / sh;
  const dw = Math.round(sw * scale);
  const dx = Math.round(w * anchorX - dw / 2);

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return;
  // slight blur at low res softens the dither clusters like the reference
  octx.filter = "blur(0.5px)";
  octx.drawImage(img, sx, sy, sw, sh, dx, 0, dw, h);

  const px = octx.getImageData(0, 0, w, h).data;
  ctx.clearRect(0, 0, w, h);

  const light = "#a8a5a0";
  const mid = "#6b6a66";
  const dark = "#3a3a38";
  const fadeBand = Math.max(6, Math.round(dw * 0.22));

  for (let y = 0; y < h; y++) {
    for (let x = Math.max(0, dx); x < Math.min(w, dx + dw); x++) {
      const i = (y * w + x) * 4;
      if (px[i + 3] < 40) continue;
      const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      // dissolve toward both crop edges
      const edge = Math.min(x - dx, dx + dw - x);
      const fade = Math.min(1, edge / fadeBand);
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (lum * fade < threshold) continue;
      ctx.fillStyle = lum > 0.72 ? light : lum > 0.42 ? mid : dark;
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

/**
 * Render the ambient field with a soft reveal blob trailing the cursor
 * (`bx`/`by` in canvas coords; pass -1 to hide the blob).
 */
export function drawAmbientField(
  canvas: HTMLCanvasElement,
  field: AmbientField,
  bx = -1,
  by = -1,
): void {
  const { lum, jitter, w, h } = field;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);

  const blobR = Math.max(18, Math.round(w * 0.11));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      // dark ambient level from the blurred photo, plus grain
      let v = lum[i] * 0.42 + jitter[i] * 0.08;
      let lit = 0;
      if (bx >= 0) {
        const d = Math.hypot(x - bx, y - by);
        if (d < blobR) {
          const t = 1 - d / blobR;
          lit = t * t;
          v += lit * 0.5;
        }
      }
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (v < threshold) continue;
      ctx.fillStyle =
        lit > 0.45 ? "#8a8a86" : v > 0.5 ? "#4e4e4b" : v > 0.3 ? "#343432" : "#212120";
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
  octx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
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
