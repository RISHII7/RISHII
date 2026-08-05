import { Fragment } from "react";
import {
  dataEngineering,
  dataEngineeringFooterLink,
} from "../../data/dataEngineering";
import { MarqueeTitle, SectionEyebrow, SectionFrame } from "../ui/SectionShell";
import { LogRow } from "../ui/LogRow";

export function DataEngineering() {
  return (
    <SectionFrame id="data" labelledBy="data-title">
      <SectionEyebrow number="03" label="PIPELINE ENGINEERING" />
      <MarqueeTitle id="data-title" outline="DATA" solid="ENGINEERING" />

      <div className="mt-[clamp(1.5rem,3vw,3rem)] space-y-3">
        {dataEngineering.map((project, i) => (
          <LogRow
            key={project.slug}
            href={`/data/${project.slug}`}
            title={project.title}
            description={project.description}
            action="VIEW"
            meta={
              <Fragment>
                <span>{String(i + 1).padStart(3, "0")}</span>
                {project.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-muted/75 group-hover/log:text-ink/60"
                  >
                    {t}
                  </span>
                ))}
              </Fragment>
            }
          />
        ))}
      </div>

      <a
        href={dataEngineeringFooterLink.href}
        target="_blank"
        rel="noreferrer"
        className="group/log relative mt-3 block overflow-hidden rounded-(--radius-card) border border-muted/20 transition-colors duration-(--dur-hover) ease-soft transform-[translateZ(0)] hover:border-accent/50"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-accent transition-transform duration-(--dur-hover) ease-soft group-hover/log:scale-x-100"
        />
        <span className="relative z-10 flex items-center justify-between gap-6 p-5 md:p-8">
          <span className="hud-label text-accent transition-colors duration-(--dur-hover) group-hover/log:text-ink">
            {dataEngineeringFooterLink.label}
          </span>
          <span className="hud-label text-muted/80 transition-colors duration-(--dur-hover) group-hover/log:text-ink">
            VISIT →
          </span>
        </span>
      </a>
    </SectionFrame>
  );
}
