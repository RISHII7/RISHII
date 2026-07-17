import { techBand } from "../../data/career";
import { BrandIcon } from "../ui/BrandIcon";

/** Off-white full-width marquee of technology logos, ◆-separated. */
export function TechBand() {
  const row = (
    <>
      {techBand.slugs.map((slug) => (
        <span key={slug} className="flex items-center gap-[clamp(2rem,4vw,4rem)]">
          <BrandIcon slug={slug} className="h-[clamp(2.5rem,5vw,4.5rem)] w-auto text-ink/85" />
          <span aria-hidden="true" className="block size-2 rotate-45 bg-ink/50" />
        </span>
      ))}
    </>
  );

  return (
    <section aria-label={techBand.caption} className="bg-ink">
      <div className="overflow-hidden bg-muted pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(1.5rem,3.5vw,2.75rem)]">
        <p className="px-6 text-center text-caption font-light italic uppercase tracking-[0.04em] text-ink/70">
          {techBand.caption}
        </p>
        <div className="marquee-hover-pause mt-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="animate-marquee flex w-max items-center gap-[clamp(2rem,4vw,4rem)]">
            {row}
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}
