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
 * Giant scroll-linked marquee heading: repeated outline+solid word pairs,
 * translated horizontally in proportion to the section's scroll progress.
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
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the title enters the viewport bottom, 1 when it leaves the top
      const t = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
      setShift(-t * 12.5);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
