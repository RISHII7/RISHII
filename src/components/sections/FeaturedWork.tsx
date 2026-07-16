import { useEffect, useRef, useState } from "react";
import { featuredWork, type FeaturedProject } from "../../data/featuredWork";
import { MarqueeTitle, SectionEyebrow } from "../ui/SectionShell";

/** Styled cover shown until a real screenshot is provided. */
function PlaceholderCover({ title }: { title: string }) {
  return (
    <div className="flex size-full items-center justify-center bg-[#161616]">
      <span className="hud-label text-muted/40">{title} — SCREENSHOT PENDING</span>
    </div>
  );
}

function WorkCard({ project, style }: { project: FeaturedProject; style: React.CSSProperties }) {
  const inner = (
    <article className="fw-card">
      <div className="fw-card__content">
        <div>
          <p className="text-lead font-light italic text-muted/80">{project.category}</p>
          <h3 className="mt-2 text-display-sm font-black uppercase leading-none text-accent">
            {project.title}
          </h3>
          <p className="mt-4 max-w-[38ch] text-body font-light italic text-muted/85">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="fw-metric">
              <span className="fw-metric__val">{m.value}</span>
              <span className="fw-metric__lbl">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-1">
        <div className="fw-cinema-frame">
          <div className="fw-cinema-img">
            {project.image ? (
              <img src={project.image} alt={`${project.title} — screenshot`} loading="lazy" />
            ) : (
              <PlaceholderCover title={project.title} />
            )}
          </div>
        </div>
        <div className="fw-cinema-corners" />
      </div>
    </article>
  );

  return (
    <div className="fw-card-absolute" style={style}>
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" className="contents">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

/**
 * Sticky deck: the section pins while scroll progress deals one card at a
 * time; each incoming card slides up over the previous one.
 */
export function FeaturedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const t = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(t);
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

  const n = featuredWork.length;
  const step = 1 / n;

  return (
    <section id="work" aria-labelledby="work-title" className="fw-deck relative bg-ink">
      <div className="mx-auto max-w-[1700px] px-6 pt-6 md:px-10">
        <SectionEyebrow number="01" label={`${n} PROJECTS`} />
      </div>

      <div ref={trackRef} className="fw-deck-track" style={{ height: `${95 + n * 50}svh` }}>
        <div className="fw-deck-sticky">
          <div className="fw-deck-header mx-auto max-w-[1700px] px-6 pb-2 pt-2 md:px-10">
            <MarqueeTitle id="work-title" outline="FEATURED" solid="WORK" className="" />
          </div>

          <div className="fw-cards-container">
            {featuredWork.map((project, i) => {
              // local progress of card i entering: 0 → offscreen, 1 → seated
              const local = Math.min(1, Math.max(0, (progress - i * step) / step));
              const entering = i === 0 ? 1 : local;
              const style: React.CSSProperties = {
                zIndex: i + 1,
                pointerEvents: entering > 0.5 ? "auto" : "none",
                transform: `translateY(${(1 - entering) * 105}%)`,
              };
              return <WorkCard key={project.number} project={project} style={style} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
