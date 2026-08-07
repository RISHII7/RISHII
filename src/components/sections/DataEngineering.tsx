import { Fragment } from "react";
import { dataEngineering } from "../../data/dataEngineering";
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
                  <span key={t} className="text-muted/75 group-hover/log:text-ink/60">
                    {t}
                  </span>
                ))}
              </Fragment>
            }
          />
        ))}
      </div>
    </SectionFrame>
  );
}
