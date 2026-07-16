import type { ReactNode } from "react";

/**
 * Ledger-row card: mono meta column · big title · trailing action.
 * Hovering sweeps the accent across and flips text to ink.
 */
export function LogRow({
  href,
  meta,
  title,
  description,
  action,
  big = false,
}: {
  href?: string;
  meta: ReactNode;
  title: string;
  description: string;
  action: string;
  big?: boolean;
}) {
  const Tag = href ? "a" : "div";
  const external = href?.startsWith("http");

  return (
    <Tag
      {...(href ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}
      className="group/log relative block overflow-hidden rounded-[var(--radius-card)] border border-muted/20 transition-colors [transition-duration:var(--dur-hover)] [transition-timing-function:var(--ease-soft)] [transform:translateZ(0)] hover:border-accent/50"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-accent transition-transform [transition-duration:var(--dur-hover)] [transition-timing-function:var(--ease-soft)] group-hover/log:scale-x-100"
      />
      <span className="relative z-10 grid items-start gap-2 p-5 transition-colors [transition-duration:var(--dur-hover)] [transition-timing-function:var(--ease-soft)] md:grid-cols-[8rem_1fr_auto] md:gap-8 md:p-8">
        <span className="hud-label flex flex-col gap-1 text-accent group-hover/log:text-ink">
          {meta}
        </span>
        <span className="min-w-0">
          <span
            className={`block font-black uppercase leading-[1.02] text-muted transition-colors [transition-duration:var(--dur-hover)] group-hover/log:text-ink ${
              big
                ? "text-[clamp(2rem,5.2vw,4.75rem)]"
                : "text-[clamp(1.5rem,3.4vw,2.9rem)]"
            }`}
          >
            {title}
          </span>
          <span className="mt-2 block max-w-[52ch] text-body font-light text-muted/75 transition-colors [transition-duration:var(--dur-hover)] group-hover/log:text-ink/70">
            {description}
          </span>
        </span>
        <span className="hud-label text-muted/80 transition-colors [transition-duration:var(--dur-hover)] group-hover/log:text-ink">
          {action} →
        </span>
      </span>
    </Tag>
  );
}
