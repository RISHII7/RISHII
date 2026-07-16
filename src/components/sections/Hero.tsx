import { useEffect, useRef } from "react";
import { hero, about } from "../../data/profile";
import { drawDitheredPortrait, drawDitherField, loadImage } from "../../lib/dither";

/** Per-letter variable-weight word; letters swell toward the cursor. */
function WeightedWord({
  word,
  base,
  className,
  leading,
}: {
  word: string;
  base: number;
  className: string;
  leading: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = [...el.querySelectorAll<HTMLSpanElement>("[data-ch]")];
    // headroom decides whether proximity pushes weight up or down
    const target = base < 600 ? 900 : 560;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        for (const ch of chars) {
          const r = ch.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);
          const t = Math.max(0, 1 - d / 320);
          const wght = Math.round(base + (target - base) * t * t);
          ch.style.fontVariationSettings = `'wght' ${wght}`;
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [base]);

  return (
    <span ref={ref} className={`block whitespace-nowrap ${leading}`}>
      <span className={className}>
        <span aria-hidden="true">
          {[...word].map((c, i) => (
            <span
              key={i}
              data-ch="true"
              className="inline-block will-change-[font-variation-settings]"
              style={{ fontVariationSettings: `'wght' ${base}` }}
            >
              {c}
            </span>
          ))}
        </span>
        <span className="sr-only">{word}</span>
      </span>
    </span>
  );
}

/** Low-res dithered background: noise field + portrait, pixel-upscaled. */
function HeroBackdrop() {
  const fieldRef = useRef<HTMLCanvasElement>(null);
  const portraitRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let timer = 0;

    const field = fieldRef.current;
    const portrait = portraitRef.current;
    if (!field || !portrait) return;

    const renderField = () => {
      drawDitherField(field);
      timer = window.setTimeout(renderField, 420);
    };
    renderField();

    let img: HTMLImageElement | null = null;
    const renderPortrait = () => {
      if (img && !disposed) drawDitheredPortrait(portrait, img);
    };
    loadImage(about.photo)
      .then((loaded) => {
        img = loaded;
        renderPortrait();
      })
      .catch(() => {
        /* portrait is decorative — the field alone still reads correctly */
      });

    window.addEventListener("resize", renderPortrait);
    return () => {
      disposed = true;
      clearTimeout(timer);
      window.removeEventListener("resize", renderPortrait);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0" aria-hidden="true">
        <canvas ref={fieldRef} className="block size-full [image-rendering:pixelated]" />
      </div>
      <div className="absolute inset-0" aria-hidden="true">
        <canvas ref={portraitRef} className="block size-full [image-rendering:pixelated]" />
      </div>
    </>
  );
}

export function Hero() {
  const [firstName, lastName] = [hero.firstName, `${hero.lastName}.`];

  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-[calc(100svh-6.5rem)] flex-col overflow-clip bg-ink pb-8 pt-12"
    >
      <HeroBackdrop />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-between px-6 md:px-10">
        <div className="flex flex-col gap-1.5 pt-5">
          <p className="font-light uppercase tracking-[0.06em] text-accent text-[clamp(16px,4.6vw,24px)]">
            {hero.role}
          </p>
          <p className="hud-label text-muted/80">{hero.specialization}</p>
        </div>

        <div className="pointer-events-auto">
          <h1 className="flex flex-col uppercase">
            <WeightedWord
              word={firstName}
              base={320}
              leading="leading-[0.86]"
              className="text-[clamp(2.3rem,0.5rem+10.3vw,10.3rem)] text-muted tracking-[-0.01em]"
            />
            <WeightedWord
              word={lastName}
              base={900}
              leading="leading-[0.84]"
              className="text-[clamp(3.5rem,0.8rem+14.8vw,14.8rem)] text-accent tracking-[-0.02em]"
            />
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[hero.stat, hero.location, hero.availability].map((tag) => (
              <span key={tag} className="hud-label flex items-center gap-2 text-muted/80">
                <span aria-hidden="true" className="block size-1.5 bg-accent" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 right-6 z-10 max-md:hidden md:right-10"
      >
        <span className="hud-label flex items-center gap-2 text-muted/80">
          <span className="blink text-accent">▼</span> SCROLL
        </span>
      </div>
    </section>
  );
}
