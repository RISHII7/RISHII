import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { featuredWork } from "../data/featuredWork";
import { Header } from "../components/layout/Header";
import { StatusBar, EdgeLines } from "../components/layout/StatusBar";
import { Footer } from "../components/layout/Footer";
import { SectionEyebrow } from "../components/ui/SectionShell";
import { ScrambleText } from "../components/ui/ScrambleText";
import { CardMedia } from "../components/sections/FeaturedWork";

const EASE_SOFT = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: EASE_SOFT },
});

/** Case-study page for a featured project — the card's click-through. */
export default function ProjectPage() {
  const { slug } = useParams();
  const idx = featuredWork.findIndex((p) => p.slug === slug);
  const project = idx >= 0 ? featuredWork[idx] : null;
  const next = idx >= 0 ? featuredWork[(idx + 1) % featuredWork.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !next) {
    return (
      <div className="noise flex min-h-svh flex-col">
        <Header active="" />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 pt-14">
          <p className="text-display-sm font-black uppercase text-muted">NOT FOUND</p>
          <Link to="/" className="hud-label text-accent">
            ← BACK TO HOME
          </Link>
        </main>
        <StatusBar active="work" />
      </div>
    );
  }

  const d = project.detail;

  return (
    <div className="noise">
      <Header active="work" />
      <main className="bg-ink pt-14">
        <div className="mx-auto max-w-[1700px] px-6 pb-[clamp(4rem,8vw,7rem)] pt-8 md:px-10">
          <motion.div {...fadeUp(0)}>
            <SectionEyebrow number={project.number} label="CASE STUDY" />
          </motion.div>

          {/* Title block */}
          <motion.div {...fadeUp(0.08)} className="mt-[clamp(2rem,4vw,3.5rem)]">
            <p className="text-lead font-light italic text-muted/80">{project.category}</p>
            <h1 className="mt-2 text-[clamp(3rem,9vw,9rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-accent">
              <ScrambleText text={project.title} duration={900} />
            </h1>
          </motion.div>

          {/* Meta grid */}
          <motion.div
            {...fadeUp(0.16)}
            className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-8 border-y border-dashed border-muted/25 py-8 md:grid-cols-4"
          >
            <div>
              <p className="hud-label text-accent">ROLE</p>
              <p className="hud-label mt-2 text-muted">{d.role}</p>
            </div>
            <div>
              <p className="hud-label text-accent">TIMELINE</p>
              <p className="hud-label mt-2 text-muted">{d.timeline}</p>
            </div>
            <div>
              <p className="hud-label text-accent">SCOPE</p>
              <div className="mt-2 flex flex-col gap-1">
                {d.scope.map((s) => (
                  <span key={s} className="hud-label text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="hud-label text-accent">STACK</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="hud-label border border-muted/25 px-2.5 py-1 text-muted/85">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hero media */}
          <motion.div
            {...fadeUp(0.24)}
            className="relative mt-[clamp(2rem,4vw,3.5rem)] aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-muted/15"
          >
            <div className="fw-cinema-img !filter-none">
              <CardMedia project={project} />
            </div>
          </motion.div>

          {/* Summary + metrics */}
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
            <motion.div {...fadeUp(0.1)}>
              <p className="hud-label text-accent">OVERVIEW</p>
              <p className="mt-4 max-w-[38ch] text-lead font-light italic text-muted/90">
                {d.summary}
              </p>
              <div className="mt-8 max-w-[62ch] space-y-5">
                {d.body.map((para) => (
                  <p key={para.slice(0, 24)} className="text-body font-light text-muted/80">
                    {para}
                  </p>
                ))}
              </div>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="clip-chamfer hud-label mt-10 inline-block bg-accent px-5 py-3 text-ink transition-opacity hover:opacity-85"
                >
                  OPEN PROJECT ↗
                </a>
              )}
            </motion.div>

            <motion.div {...fadeUp(0.18)}>
              <p className="hud-label text-accent">OUTCOMES</p>
              <div className="mt-4 flex flex-col gap-6">
                {project.metrics.map((m) => (
                  <div key={m.label} className="fw-metric border-b border-dashed border-muted/25 pb-6">
                    <span className="fw-metric__val">{m.value}</span>
                    <span className="fw-metric__lbl">{m.label}</span>
                  </div>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-accent pl-5 text-lead font-light italic text-muted/85">
                {d.pullquote}
              </blockquote>
            </motion.div>
          </div>

          {/* Prev/next footer */}
          <motion.div
            {...fadeUp(0.1)}
            className="mt-[clamp(4rem,8vw,7rem)] flex items-center justify-between gap-6 border-t border-dashed border-muted/25 pt-8"
          >
            <Link to="/#work" className="hud-label text-muted/80 transition-colors hover:text-accent">
              ← ALL WORK
            </Link>
            <Link
              to={`/work/${next.slug}`}
              className="group/next flex items-baseline gap-4 text-right"
            >
              <span className="hud-label text-muted/60">NEXT</span>
              <span className="text-display-sm font-black uppercase leading-none text-muted transition-colors group-hover/next:text-accent">
                {next.title}
              </span>
              <span className="hud-label text-accent">→</span>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <StatusBar active="work" />
      <EdgeLines />
      <div aria-hidden="true" className="h-12" />
    </div>
  );
}
