/**
 * Canvas dithering helpers for the hero portrait and background field.
 * Everything renders at a deliberately low resolution and is upscaled with
 * `image-rendering: pixelated` for the dot-matrix look.
 */

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Draws `img` onto `canvas` as an ordered-dither monochrome portrait.
 * The image is anchored to the right edge, covering the full height.
 */
export function drawDitheredPortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  opts: { width?: number; levels?: [string, string, string] } = {},
): void {
  const w = opts.width ?? 240;
  const aspect = canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : 16 / 9;
  const h = Math.max(1, Math.round(w / aspect));
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // cover-fit the portrait into the right ~55% of the frame
  const zoneW = Math.round(w * 0.55);
  const zoneX = w - zoneW;
  const scale = Math.max(zoneW / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = zoneX + (zoneW - dw) / 2;
  const dy = (h - dh) / 2;

  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return;
  octx.drawImage(img, dx, dy, dw, dh);

  const data = octx.getImageData(0, 0, w, h);
  const px = data.data;
  ctx.clearRect(0, 0, w, h);

  const [dark, mid, light] = opts.levels ?? ["#2a2a28", "#6b6a66", "#b9b6b0"];

  for (let y = 0; y < h; y++) {
    for (let x = zoneX; x < w; x++) {
      const i = (y * w + x) * 4;
      const a = px[i + 3];
      if (a < 40) continue;
      const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      // edge fade so the portrait dissolves into the background
      const fade = Math.min(1, (x - zoneX) / (zoneW * 0.35));
      if (lum * fade < threshold * 0.55) continue;
      ctx.fillStyle = lum > 0.72 ? light : lum > 0.45 ? mid : dark;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

/** Sparse random dot field behind the portrait — redrawn for a soft flicker. */
export function drawDitherField(canvas: HTMLCanvasElement, density = 0.045): void {
  const w = 240;
  const aspect = canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : 16 / 9;
  const h = Math.max(1, Math.round(w / aspect));
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (Math.random() > density) continue;
      const v = Math.random();
      ctx.fillStyle = v > 0.85 ? "#4a4a48" : v > 0.5 ? "#2c2c2a" : "#1d1d1c";
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
