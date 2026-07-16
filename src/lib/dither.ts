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

/** Static noise-field values in [0,1), reusable across frames. */
export function makeFieldBase(w: number, h: number): Float32Array {
  const base = new Float32Array(w * h);
  for (let i = 0; i < base.length; i++) base[i] = Math.random();
  return base;
}

/**
 * Sparse dot field with a soft dithered blob that follows the cursor
 * (`bx`/`by` in canvas coords; pass -1 to hide).
 */
export function drawDitherField(
  canvas: HTMLCanvasElement,
  base: Float32Array,
  bx = -1,
  by = -1,
): void {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);

  const blobR = Math.max(14, Math.round(w * 0.085));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = base[y * w + x];
      let boost = 0;
      if (bx >= 0) {
        const d = Math.hypot(x - bx, y - by);
        if (d < blobR) {
          const t = 1 - d / blobR;
          boost = t * t * 0.85;
        }
      }
      if (boost > 0) {
        const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
        if (boost > threshold) {
          ctx.fillStyle = v > 0.6 ? "#8a8a86" : "#71716d";
          ctx.fillRect(x, y, 1, 1);
          continue;
        }
      }
      if (v > 0.955) {
        ctx.fillStyle = v > 0.985 ? "#4a4a48" : "#242422";
        ctx.fillRect(x, y, 1, 1);
      }
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
