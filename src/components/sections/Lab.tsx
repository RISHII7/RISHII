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

      <div className="mt-[clamp(2rem,4vw,3.5rem)] text-center">
        <a
          href={labFooterLink.href}
          target="_blank"
          rel="noreferrer"
          className="hud-label inline-flex items-center gap-2 text-muted/80 transition-colors hover:text-accent"
        >
          {labFooterLink.label} <span aria-hidden="true">→</span>
        </a>
      </div>
    </SectionFrame>
  );
}
