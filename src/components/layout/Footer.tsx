import { site } from "../../data/site";

export function Footer() {
  return (
    <footer className="bg-ink pb-12">
      <div className="mx-auto max-w-[1700px] px-6 md:px-10">
        <div className="dash-h w-full text-muted/45 opacity-40" aria-hidden="true" />
        <div className="flex items-center justify-between py-6">
          <span className="hud-label text-muted/75">
            © {site.year} {site.name.toUpperCase()}
          </span>
          <a
            href="#top"
            className="hud-label text-muted/75 transition-colors hover:text-accent"
          >
            BACK TO TOP ↑
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-4 pb-6 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
          <span
            aria-hidden="true"
            className="font-sans text-[clamp(3rem,13vw,5rem)] font-black leading-none tracking-[-0.04em]"
          >
            <span className="text-muted">R</span>
            <span className="text-accent">P</span>
          </span>
          <span className="hud-label text-muted/60 sm:text-right">
            © {site.year} {site.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}
