import { useEffect, useRef } from "react";
import { about, hero } from "../../data/profile";
import {
  competencies,
  education,
  experience,
  foundations,
  toolkit,
  type Competency,
} from "../../data/career";
import { MarqueeTitle, SectionEyebrow, SectionFrame } from "../ui/SectionShell";
import { BrandIcon } from "../ui/BrandIcon";
import Tilt from "react-parallax-tilt";
import { drawDitheredCard, loadImage } from "../../lib/dither";

/** Interactive 3D Holographic Card of the User's Portrait */
function HoloPortraitCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const ro = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width === 0) return;
      
      loadImage(about.photo).then((img) => {
        raf = requestAnimationFrame(() => {
          drawDitheredCard(canvas, img, { anchorX: 0.25, anchorY: 0.5 });
        });
      });
    });
    
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Tilt
      className="parallax-effect-glare-scale"
      perspective={800}
      glareEnable={true}
      glareMaxOpacity={0.3}
      glarePosition="all"
      glareColor="var(--color-accent)"
      glareBorderRadius="var(--radius-card)"
      scale={1.02}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      transitionSpeed={1500}
      tiltReverse={true}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] border border-muted/15 bg-ink">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(195,255,252,0.1)_0%,transparent_70%)] mix-blend-overlay pointer-events-none" />
      </div>
    </Tilt>
  );
}

function CompetencyIcon({ icon }: { icon: Competency["icon"] }) {
  const paths: Record<Competency["icon"], string> = {
    eye: "M12 5C5.6 5 2 12 2 12s3.6 7 10 7 10-7 10-7-3.6-7-10-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z",
    layers: "m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16.5l10 5 10-5",
    gauge: "M12 4a9 9 0 0 0-9 9h4a5 5 0 0 1 10 0h4a9 9 0 0 0-9-9Zm0 7 4 5h-8l4-5Z",
    monitor: "M3 4h18v12H3V4Zm5 16h8m-4-4v4",
    cpu: "M8 8h8v8H8V8ZM4 10h2m-2 4h2m14-4h2m-2 4h2M10 4v2m4-2v2m-4 14v2m4-2v2",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6 shrink-0 text-muted/80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={paths[icon]} />
    </svg>
  );
}

/** Career ledger entry: giant name, italic role, mono period. */
function LedgerRow({ name, sub, period }: { name: string; sub: string; period: string }) {
  return (
    <div className="border-b border-dashed border-muted/25 py-6 first:pt-0">
      <div className="flex items-baseline justify-between gap-6">
        <span className="text-[clamp(1.9rem,4.4vw,4rem)] font-black uppercase leading-none text-muted">
          {name}
        </span>
        <span className="hud-label shrink-0 text-muted/75">{period}</span>
      </div>
      <p className="mt-2 text-body font-light italic uppercase tracking-[0.04em] text-muted/75">
        {sub}
      </p>
    </div>
  );
}

export function About() {
  return (
    <SectionFrame id="about" labelledBy="about-title">
      <SectionEyebrow number="04" label="CAREER" />
      <MarqueeTitle id="about-title" outline="ABOUT" solid="ME" />

      <div className="mt-[clamp(2rem,4vw,4rem)] grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        {/* Left: portrait, lead, location */}
        <div>
          <HoloPortraitCard />
          <p className="hud-label mt-3 text-right text-muted/75">{about.coords}</p>

          <p className="mt-[clamp(2rem,4vw,3rem)] max-w-[32ch] text-lead font-light italic text-muted/90">
            {about.intro}
          </p>

          <div className="mt-8 space-y-2">
            <p className="hud-label text-muted/80">
              LOCATION — <span className="text-muted">{hero.location.replace("BASED IN ", "")}</span>
            </p>
            <p className="hud-label text-muted/80">
              AVAILABILITY — <span className="text-muted">{hero.availability}</span>
            </p>
          </div>
        </div>

        {/* Right: experience, study, resume */}
        <div>
          <p className="hud-label text-accent">WORK EXPERIENCE</p>
          <div className="mt-4">
            {experience.map((job) => (
              <LedgerRow key={job.company} name={job.company} sub={job.role} period={job.period} />
            ))}
          </div>

          <p className="hud-label mt-12 text-accent">STUDY</p>
          <div className="mt-4">
            {education.map((ed) => (
              <LedgerRow key={ed.title} name={ed.title} sub={ed.school} period={ed.period} />
            ))}
          </div>

          <p className="hud-label mt-12 text-accent">IN-DEPTH LOOK</p>
          <a
            href={about.resumeHref}
            download
            className="clip-chamfer hud-label mt-4 inline-block bg-accent px-5 py-3 text-ink transition-opacity hover:opacity-85"
          >
            DOWNLOAD RESUMÉ/CV
          </a>
        </div>
      </div>

      {/* Core foundations */}
      <p className="hud-label mt-[clamp(3rem,6vw,5rem)] text-accent">CORE FOUNDATIONS</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {foundations.map((f) => (
          <div
            key={f.number}
            className="rounded-[var(--radius-card)] border border-muted/20 p-6 transition-colors [transition-duration:var(--dur-hover)] hover:border-accent/50"
          >
            <p className="hud-label text-accent">{f.number}</p>
            <p className="mt-4 text-[clamp(1.2rem,1.8vw,1.6rem)] font-black uppercase leading-tight text-muted">
              {f.title}
            </p>
            <p className="mt-2 text-body font-light text-muted/75">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Core competencies */}
      <p className="hud-label mt-[clamp(3rem,6vw,5rem)] text-accent">CORE COMPETENCIES</p>
      <div className="mt-4">
        {competencies.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-6 border-b border-dashed border-muted/25 py-5"
          >
            <CompetencyIcon icon={c.icon} />
            <span className="text-[clamp(1.3rem,2.6vw,2.1rem)] font-black uppercase text-muted">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Toolkit */}
      <p className="hud-label mt-[clamp(3rem,6vw,5rem)] text-accent">MY TOOLKIT</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {toolkit.map((tool) => (
          <div
            key={tool.slug}
            className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-muted/20 px-6 py-10 transition-colors [transition-duration:var(--dur-hover)] hover:border-accent/50"
          >
            <BrandIcon slug={tool.slug} colored className="size-9" />
            <span className="hud-label mt-2 text-muted">{tool.name}</span>
            <span className="hud-label text-muted/60">{tool.role}</span>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
