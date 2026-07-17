import { useState } from "react";
import { useLocation } from "react-router-dom";
import { nav, site } from "../../data/site";
import { cn } from "../../lib/utils";

/** Angled bracket glyph shown around the active nav item / on hover. */
function Bracket({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 6 25"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("h-3.5 w-[5px]", flipped && "rotate-180")}
    >
      <path
        d="M5.5 0.5L0.5 7.5V24.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** RP monogram wordmark. */
function Logo() {
  return (
    <span
      aria-hidden="true"
      className="flex h-4 items-center font-sans text-[17px] font-black leading-none tracking-[-0.04em]"
    >
      <span className="text-muted">R</span>
      <span className="text-accent">P</span>
    </span>
  );
}

export function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // section anchors only exist on the home page; prefix "/" elsewhere
  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  return (
    <>
      <a href="#top" className="skip-link hud-label">
        SKIP TO CONTENT
      </a>
      <header className="fixed left-1/2 top-0 z-50 w-full -translate-x-1/2 border border-muted/15 border-t-transparent border-x-transparent bg-ink">
        <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          <a
            href={anchor("#top")}
            aria-label={`${site.name} — back to top`}
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-75"
          >
            <Logo />
            <span className="hud-label whitespace-nowrap text-muted">
              RISHII
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={anchor(item.href)}
                  className={cn(
                    "hud-label group/nav flex items-center px-3 py-1 transition-colors",
                    isActive ? "text-accent" : "text-muted/80 hover:text-muted",
                  )}
                >
                  <span
                    className={cn(
                      "transition-opacity",
                      isActive ? "opacity-100" : "opacity-0 group-hover/nav:opacity-100",
                    )}
                  >
                    <Bracket />
                  </span>
                  <span className="px-1.5">
                    {item.number}/{item.label}
                  </span>
                  <span
                    className={cn(
                      "transition-opacity",
                      isActive ? "opacity-100" : "opacity-0 group-hover/nav:opacity-100",
                    )}
                  >
                    <Bracket flipped />
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={anchor("#contact")}
              className="clip-chamfer hud-label hidden bg-accent px-4 py-2 text-ink transition-opacity hover:opacity-85 md:block"
            >
              GET IN TOUCH
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1 md:hidden"
            >
              <span className="block h-px w-5 bg-muted" />
              <span className="block h-px w-5 bg-accent" />
              <span className="block h-px w-5 bg-muted" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-60 flex flex-col bg-ink transition-[clip-path] duration-500 ease-soft md:hidden",
          open ? "[clip-path:inset(0_0_0%)]" : "pointer-events-none [clip-path:inset(0_0_100%)]",
        )}
      >
        <div className="flex h-[70px] items-center justify-between px-6">
          <span className="hud-label text-muted">MENU</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-muted"
          >
            <span className="relative block h-6 w-6">
              <span className="absolute left-0 top-1/2 block h-[2px] w-6 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 block h-[2px] w-6 -rotate-45 bg-current" />
            </span>
          </button>
        </div>
        <nav aria-label="Sections" className="flex flex-1 flex-col justify-center gap-2 px-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={anchor(item.href)}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 py-3"
            >
              <span className="hud-label text-accent">{item.number}</span>
              <span className="text-display-sm font-black uppercase text-muted">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="px-6 pb-10">
          <a
            href={anchor("#contact")}
            onClick={() => setOpen(false)}
            className="clip-chamfer hud-label inline-block bg-accent px-5 py-3 text-ink"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </>
  );
}
