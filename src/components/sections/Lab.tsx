import { Fragment } from "react";
import { lab } from "../../data/lab";
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
    </SectionFrame>
  );
}
