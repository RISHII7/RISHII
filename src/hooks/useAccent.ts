import { useCallback, useState } from "react";

/** Accent palette the THEME button cycles through. */
const ACCENTS = ["#c3fffc", "#ffc3ef", "#d8ffc3", "#ffd9a3", "#c3d4ff"] as const;

export function useAccent(): { accent: string; cycle: () => void } {
  const [index, setIndex] = useState(0);

  const cycle = useCallback(() => {
    setIndex((i) => {
      const next = (i + 1) % ACCENTS.length;
      document.documentElement.style.setProperty("--color-accent", ACCENTS[next]);
      return next;
    });
  }, []);

  return { accent: ACCENTS[index], cycle };
}
