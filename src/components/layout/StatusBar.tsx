import { nav } from "../../data/site";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useCursorPosition } from "../../hooks/useCursorPosition";
import { useClock } from "../../hooks/useClock";
import { useAccent } from "../../hooks/useAccent";

/** Fixed bottom HUD: scroll/cursor telemetry, current section, theme, clock. */
export function StatusBar({ active }: { active: string }) {
  const progress = useScrollProgress();
  const cursor = useCursorPosition();
  const clock = useClock();
  const { accent, cycle } = useAccent();

  const current =
    active === "top" || active === ""
      ? { number: "00", label: "INTRO" }
      : (nav.find((n) => n.href.slice(1) === active) ?? { number: "00", label: "INTRO" });
  const crsr = `${Math.round(cursor.x)}.${Math.round(cursor.y)}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-muted/15 bg-ink">
      <div className="flex h-12 items-center justify-between gap-4 px-4 md:px-6">
        <span aria-hidden="true">
          <span className="hud-label flex gap-5 text-muted/80">
            <span>
              SCRL <span className="text-accent">{progress.toFixed(2)}</span>
            </span>
            <span className="max-lg:hidden">
              CRSR <span>{crsr}</span>
            </span>
          </span>
        </span>

        <span aria-hidden="true" className="hud-label text-muted/80 max-sm:hidden">
          <span className="text-accent">{current.number}</span> — {current.label}
        </span>

        <div className="flex items-center gap-5">
          <button
            type="button"
            title="Cycle accent colour"
            aria-label="Cycle the site accent colour"
            onClick={cycle}
            className="hud-label flex cursor-pointer items-center gap-2 text-muted/80 transition-opacity hover:opacity-75"
          >
            <span className="max-sm:hidden">THEME</span>
            <span aria-hidden="true" className="block size-2.5 bg-accent" />
            <span className="text-accent">{accent}</span>
          </button>
          <span aria-hidden="true">
            <span className="hud-label text-muted/80">
              {clock.time} <span className="text-muted/75">{clock.offset}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Dashed vertical hairlines pinned to both page edges. */
export function EdgeLines() {
  return (
    <>
      <div
        aria-hidden="true"
        className="dash-v fixed bottom-12 left-2 top-14 z-40 text-muted opacity-20 max-md:hidden"
      />
      <div
        aria-hidden="true"
        className="dash-v fixed bottom-12 right-2 top-14 z-40 text-muted opacity-20 max-md:hidden"
      />
    </>
  );
}
