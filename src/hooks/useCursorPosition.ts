import { useEffect, useState } from "react";

export interface CursorPosition {
  x: number;
  y: number;
}

/** Live cursor coordinates, rAF-throttled. */
export function useCursorPosition(): CursorPosition {
  const [pos, setPos] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    let next: CursorPosition = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      next = { x: e.clientX, y: e.clientY };
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          setPos(next);
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return pos;
}
