import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Ledger-row card: mono meta column · big title · trailing action.
 * Hovering sweeps the accent across and flips text to ink.
 * Internal hrefs ("/…") navigate client-side; external open a new tab.
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
  const external = href?.startsWith("http");
  const rowClass =
    "group/log relative block overflow-hidden rounded-card border border-muted/20 transition-colors duration-(--dur-hover) ease-soft [transform:translateZ(0)] hover:border-accent/50";

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-accent transition-transform duration-(--dur-hover) ease-soft group-hover/log:scale-x-100"
      />
      <span className="relative z-10 grid items-start gap-2 p-5 transition-colors duration-(--dur-hover) ease-soft md:grid-cols-[8rem_1fr_auto] md:gap-8 md:p-8">
        <span className="hud-label flex flex-col gap-1 text-accent group-hover/log:text-ink">
          {meta}
        </span>
        <span className="min-w-0">
          <span
            className={`block font-black uppercase leading-[1.02] text-muted transition-colors duration-(--dur-hover) group-hover/log:text-ink ${
              big
                ? "text-[clamp(2rem,5.2vw,4.75rem)]"
                : "text-[clamp(1.5rem,3.4vw,2.9rem)]"
            }`}
          >
            {title}
          </span>
          <span className="mt-2 block max-w-[52ch] text-body font-light text-muted/75 transition-colors duration-(--dur-hover) group-hover/log:text-ink/70">
            {description}
          </span>
        </span>
        <span className="hud-label text-muted/80 transition-colors duration-(--dur-hover) group-hover/log:text-ink">
          {action} →
        </span>
      </span>
    </>
  );

  if (href && !external) {
    return (
      <Link to={href} className={rowClass}>
        {inner}
      </Link>
    );
  }

  const Tag = href ? "a" : "div";
  return (
    <Tag
      {...(href ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}
      className={rowClass}
    >
      {inner}
    </Tag>
  );
}
