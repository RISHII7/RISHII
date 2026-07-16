import { Fragment } from "react";
import { moreProjects } from "../../data/moreProjects";
import { MarqueeTitle, SectionEyebrow, SectionFrame } from "../ui/SectionShell";
import { LogRow } from "../ui/LogRow";

export function MoreProjects() {
  return (
    <SectionFrame id="projects" labelledBy="projects-title">
      <SectionEyebrow number="02" label={`${moreProjects.length} BUILDS`} />
      <MarqueeTitle id="projects-title" outline="MORE" solid="PROJECTS" />

      <div className="mt-[clamp(1.5rem,3vw,3rem)] space-y-3">
        {moreProjects.map((p, i) => (
          <LogRow
            key={p.number}
            href={p.href}
            big={i === 0}
            title={p.title}
            description={p.description}
            action="VIEW"
            meta={
              <Fragment>
                <span>{p.number}</span>
                {p.tags.map((t) => (
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
