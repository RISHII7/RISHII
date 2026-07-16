import { Fragment } from "react";
import { lab, labFooterLink } from "../../data/lab";
import { MarqueeTitle, SectionEyebrow, SectionFrame } from "../ui/SectionShell";
import { LogRow } from "../ui/LogRow";

export function Lab() {
  return (
    <SectionFrame id="lab" labelledBy="lab-title">
      <SectionEyebrow number="03" label="PROOF OF BUILD" />
      <MarqueeTitle id="lab-title" outline="EXPERIMENT" solid="LAB" />

      <div className="mt-[clamp(1.5rem,3vw,3rem)] space-y-3">
        {lab.map((project, i) => (
          <LogRow
            key={project.name}
            href={project.href}
            title={project.name}
            description={project.description}
            action="GITHUB"
            meta={
              <Fragment>
                <span>{String(i + 1).padStart(3, "0")}</span>
                {project.tags.map((t) => (
                  <span key={t} className="text-muted/75 group-hover/log:text-ink/60">
                    {t}
                  </span>
                ))}
                <span className="text-muted/75 group-hover/log:text-ink/60">OPEN SOURCE</span>
              </Fragment>
            }
          />
        ))}
      </div>

      <a
        href={labFooterLink.href}
        target="_blank"
        rel="noreferrer"
        className="group/log relative mt-3 block overflow-hidden rounded-[var(--radius-card)] border border-muted/20 transition-colors [transition-duration:var(--dur-hover)] [transition-timing-function:var(--ease-soft)] [transform:translateZ(0)] hover:border-accent/50"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-accent transition-transform [transition-duration:var(--dur-hover)] [transition-timing-function:var(--ease-soft)] group-hover/log:scale-x-100"
        />
        <span className="relative z-10 flex items-center justify-between gap-6 p-5 md:p-8">
          <span className="hud-label text-accent transition-colors [transition-duration:var(--dur-hover)] group-hover/log:text-ink">
            {labFooterLink.label}
          </span>
          <span className="hud-label text-muted/80 transition-colors [transition-duration:var(--dur-hover)] group-hover/log:text-ink">
            VISIT →
          </span>
        </span>
      </a>
    </SectionFrame>
  );
}
