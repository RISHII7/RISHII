import { useEffect, useRef, useState } from "react";
import { preloader } from "../../data/profile";

/**
 * Intro overlay: mono identity block top-left, a 0→100 counter bottom-right,
 * skippable with any key/click. Calls `onDone` after the exit transition.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const DURATION = 2200;
    let frame = 0;
    const t0 = performance.now();

    const leave = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setCount(100);
      setLeaving(true);
      setTimeout(onDone, 650);
    };

    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else leave();
    };
    frame = requestAnimationFrame(tick);

    const skip = () => leave();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[80] flex flex-col justify-between bg-ink p-6 transition-[opacity,transform] duration-700 ease-soft md:p-10 ${
        leaving ? "-translate-y-[3%] opacity-0" : ""
      }`}
    >
      <div className="hud-label flex flex-col gap-1.5 pt-10 text-muted/85">
        {preloader.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <span className="hud-label text-muted/60">{preloader.skipHint}</span>
        <span className="font-sans text-[clamp(8rem,22vw,17rem)] font-black leading-[0.8] tracking-[-0.02em] text-accent tabular-nums">
          {count}
        </span>
      </div>
    </div>
  );
}
