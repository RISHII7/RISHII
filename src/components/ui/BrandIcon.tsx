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
  ].map((icon) => [icon.slug, icon]),
);

/** Inline SVG for a simple-icons brand glyph (add new icons to the import list). */
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
  if (!icon) return null;
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
