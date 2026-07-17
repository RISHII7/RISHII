import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Decode-in text: characters resolve left-to-right out of random glyphs.
 * Re-runs whenever `text` changes (or `trigger` flips true).
 */
export function ScrambleText({
  text,
  trigger = true,
  duration = 900,
  className,
}: {
  text: string;
  trigger?: boolean;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    const t0 = performance.now();

    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const settled = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (i < settled || c === " " || c === "·" || c === "&" || c === "/" || c === ".") {
          out += c;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      if (p < 1) frameRef.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [text, trigger, duration]);

  return (
    <span className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
