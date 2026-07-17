import { useEffect, useRef, useState, type ReactNode } from "react";

/** Eyebrow row: accent number · dashed leader line · right-hand label. */
export function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="hud-label shrink-0 text-accent">{number}</span>
      <div
        aria-hidden="true"
        className="dash-h w-full min-w-0 flex-1 opacity-40 text-muted/45"
      />
      <span className="hud-label shrink-0 text-muted/75">{label}</span>
    </div>
  );
}

/**
 * Giant marquee heading: repeated outline+solid word pairs on a perpetual
 * leftward crawl, nudged further by scroll. The track holds 8 repetitions,
 * so translation wraps every 12.5% for a seamless loop.
 */
export function MarqueeTitle({
  id,
  outline,
  solid,
  className = "mt-4",
}: {
  id: string;
  outline: string;
  solid: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let base = 0;
    let lastT = performance.now();
    let lastScroll = window.scrollY;

    const tick = (t: number) => {
      const dt = Math.min(0.1, (t - lastT) / 1000);
      lastT = t;
      // perpetual drift …
      if (!reduced) base -= dt * 0.9;
      // … plus scroll influence in the drift direction
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      base -= Math.abs(dy) * 0.004;
      // wrap every repetition (100% / 8) so the loop is seamless
      const wrapped = base % 12.5;
      setShift(wrapped > 0 ? wrapped - 12.5 : wrapped);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`ml-[calc(50%-50vw)] w-screen overflow-hidden ${className}`}>
      <h2 id={id} className="sr-only">
        {outline} {solid}
      </h2>
      <div
        ref={trackRef}
        aria-hidden="true"
        className="flex w-max items-center whitespace-nowrap text-display-xl font-black uppercase leading-[0.9] tracking-[-0.01em]"
        style={{ transform: `translateX(${shift}%)` }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="flex items-center">
            <span className="mr-[0.18em] text-transparent [-webkit-text-stroke:2px_var(--color-accent)]">
              {outline}
            </span>
            <span className="mr-[0.18em] text-accent">{solid}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Standard section wrapper: max width, gutter padding. */
export function SectionFrame({
  id,
  labelledBy,
  children,
  className = "",
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`bg-ink ${className}`}>
      <div className="mx-auto max-w-[1700px] px-6 py-[clamp(4rem,8vw,7rem)] md:px-10">
        {children}
      </div>
    </section>
  );
}
