import { useEffect, useRef } from "react";
import { hero, about } from "../../data/profile";
import {
  drawDitheredPortrait,
  drawAmbientField,
  makeAmbientField,
  loadImage,
  type AmbientField,
} from "../../lib/dither";
import { ScrambleText } from "../ui/ScrambleText";

/** Per-letter variable-weight word; letters swell toward the cursor. */
function WeightedWord({
  word,
  base,
  className,
  leading,
  revealDelay,
}: {
  word: string;
  base: number;
  className: string;
  leading: string;
  revealDelay: string;
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
    <span
      ref={ref}
      data-reveal="true"
      style={{ transitionDelay: revealDelay }}
      className={`block whitespace-nowrap ${leading}`}
    >
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

function HeroBackdrop() {
  const fieldRef = useRef<HTMLCanvasElement>(null);
  const portraitRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const portrait = portraitRef.current;
    if (!field || !portrait) return;

    let disposed = false;
    let img: HTMLImageElement | null = null;
    
    // cached fields
    let fieldAmbient: AmbientField | null = null;
    
    const sizeCanvas = () => {
      const aspect = field.clientHeight > 0 ? field.clientWidth / field.clientHeight : 16 / 9;
      const res = aspect < 1 ? 240 : 420; // Higher resolution on desktop for crispness
      field.width = res;
      field.height = Math.max(1, Math.round(res / aspect));
      if (img) {
         fieldAmbient = makeAmbientField(field, img);
      }
    };

    const render = () => {
      if (disposed || !img || !fieldAmbient) return;

      const aspect = field.width / field.height;
      const narrow = aspect < 1;
      
      const ctx = portrait.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, field.width, field.height);
      }
      
      const fCtx = field.getContext("2d");
      if (fCtx) {
        fCtx.clearRect(0, 0, field.width, field.height);
      }

      drawAmbientField(field, fieldAmbient);

      if (narrow) {
        drawDitheredPortrait(portrait, img, hero.photoCrop, { anchorX: 0.45, zoom: 1, res: field.width });
      } else {
        // Move image slightly left from the right edge on desktop (anchorX: 0.80)
        drawDitheredPortrait(portrait, img, hero.photoCropFull, { anchorX: 0.80, zoom: 1, res: field.width });
      }
    };

    loadImage(about.photo)
      .then((loaded) => {
        img = loaded;
        sizeCanvas();
        render(); // render once, no need for requestAnimationFrame if static
      })
      .catch(() => {});

    const onResize = () => {
      sizeCanvas();
      render();
    };

    window.addEventListener("resize", onResize);
    
    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
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

export function Hero({ ready = true }: { ready?: boolean }) {
  const [firstName, lastName] = [hero.firstName, `${hero.lastName}.`];

  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-svh flex-col overflow-clip bg-ink pb-8 pt-12"
    >
      <HeroBackdrop />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-between px-6 md:px-10">
        <div className="flex flex-col gap-1.5 pt-5">
          <p
            data-reveal="true"
            className="font-light uppercase tracking-[0.06em] text-accent text-[clamp(16px,4.6vw,24px)]"
          >
            <ScrambleText text={hero.role} trigger={ready} duration={1600} />
          </p>
          <p data-reveal="true" style={{ transitionDelay: "80ms" }} className="hud-label text-muted/80">
            <ScrambleText text={hero.specialization} trigger={ready} duration={2000} />
          </p>
        </div>

        <div className="pointer-events-auto">
          <h1 className="flex flex-col uppercase">
            <WeightedWord
              word={firstName}
              base={320}
              revealDelay="150ms"
              leading="leading-[0.86]"
              className="text-[clamp(2.3rem,0.5rem+10.3vw,10.3rem)] text-muted tracking-[-0.01em]"
            />
            <WeightedWord
              word={lastName}
              base={900}
              revealDelay="260ms"
              leading="leading-[0.84]"
              className="text-[clamp(3.5rem,0.8rem+14.8vw,14.8rem)] text-accent tracking-[-0.02em]"
            />
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[hero.stat, hero.location, hero.availability].map((tag, i) => (
              <span
                key={tag}
                data-reveal="true"
                style={{ transitionDelay: `${380 + i * 90}ms` }}
                className="hud-label flex items-center gap-2 text-muted/80"
              >
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
