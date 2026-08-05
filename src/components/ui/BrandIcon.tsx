import {
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siPython,
  siPostgresql,
  siMongodb,
  siDocker,
  siTailwindcss,
  siLinux,
  siClaude,
  siDatabricks,
  siRedis,
  type SimpleIcon,
} from "simple-icons";

const bySlug = new Map<string, SimpleIcon>(
  [
    siReact,
    siNextdotjs,
    siTypescript,
    siNodedotjs,
    siPython,
    siPostgresql,
    siMongodb,
    siDocker,
    siTailwindcss,
    siLinux,
    siClaude,
    siDatabricks,
    siRedis,
  ].map((icon) => [icon.slug, icon]),
);

// A few toolkit entries aren't branded products (SQL is a language spec, not
// a company), so simple-icons has no icon for them — show a clean monogram
// tile instead of leaving the slot blank.
const TEXT_FALLBACKS: Record<string, string> = {
  sql: "SQL",
};

/** Inline SVG for a simple-icons brand glyph, or a text monogram when no icon exists. */
export function BrandIcon({
  slug,
  className = "size-6",
  colored = false,
}: {
  slug: string;
  className?: string;
  colored?: boolean;
}) {
  const icon = bySlug.get(slug);
  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={icon.title}
        className={className}
        fill={colored ? `#${icon.hex}` : "currentColor"}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const fallback = TEXT_FALLBACKS[slug];
  if (!fallback) return null;
  return (
    <span
      role="img"
      aria-label={fallback}
      className={`${className} flex items-center justify-center font-black uppercase leading-none tracking-[-0.02em] text-muted`}
      style={{ fontSize: "0.5em" }}
    >
      {fallback}
    </span>
  );
}
