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

        <div className="mt-16 flex items-end justify-between pb-6">
          <span
            aria-hidden="true"
            className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-[-0.04em]"
          >
            <span className="text-muted">R</span>
            <span className="text-accent">P</span>
          </span>
          <span className="hud-label text-muted/60">
            © {site.year} {site.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}
