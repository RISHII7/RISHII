# 04 — Architecture & Folder Structure

## Stack

- **Vite 7** — build tool, dev server
- **React 19** + **TypeScript** — UI
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` plugin (CSS-first config, no tailwind.config.js)
- **@fontsource-variable/rubik** — self-hosted variable font (matches reference exactly)

## Principles

1. **Content lives in `src/data/`** — every section reads typed data objects. Swapping a project = editing one file, zero component changes.
2. **Components split by responsibility** — `layout/` (chrome), `sections/` (one per page section), `ui/` (reusable atoms).
3. **Design tokens in CSS** — `src/styles/index.css` declares the exact extracted tokens as CSS custom properties + Tailwind `@theme`, so utilities like `text-display-xl` and `bg-ink` exist.
4. **Hooks isolate behavior** — scroll progress, cursor tracking, in-view reveals are reusable hooks, not inline effects.

## Folder structure

```
Rushikesh_Palande/
├── docs/                      # Project documentation (this folder)
├── public/
│   ├── images/
│   │   ├── projects/          # Project screenshots (user-provided)
│   │   └── rushikesh.jpg      # Profile photo
│   ├── resume.pdf             # Downloadable resume
│   ├── favicon.svg
│   ├── og.jpg                 # Social share image (1200×630)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx               # Entry
│   ├── App.tsx                # Page composition (sections in order)
│   ├── styles/
│   │   └── index.css          # Tailwind v4 @theme + extracted design tokens
│   ├── data/                  # ALL site content (typed)
│   │   ├── site.ts            # Meta, nav, socials, SEO constants
│   │   ├── profile.ts         # Hero + about content
│   │   ├── featuredWork.ts    # Section 01 (4 projects)
│   │   ├── moreProjects.ts    # Section 02 (6 projects)
│   │   ├── lab.ts             # Section 03 (3 OSS projects)
│   │   └── career.ts          # Experience, education, competencies, toolkit
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx     # Sticky nav + mobile menu + CTA
│   │   │   └── Footer.tsx     # © line + back-to-top
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedWork.tsx
│   │   │   ├── MoreProjects.tsx
│   │   │   ├── Lab.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── SectionHeading.tsx   # "01 / FEATURED WORK" eyebrow rows
│   │       ├── Tag.tsx              # Mono pill tags
│   │       ├── Metric.tsx           # Stat blocks on work cards
│   │       ├── ArrowLink.tsx        # ↗ hover links
│   │       ├── ScrollReadout.tsx    # SCRL 0.00 counter
│   │       ├── CursorReadout.tsx    # CRSR x/y readout
│   │       └── PlaceholderCover.tsx # Styled cover until screenshots arrive
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   └── useCursorPosition.ts
│   └── lib/
│       └── utils.ts           # cn() class merge helper
├── index.html                 # SEO meta, OG, JSON-LD
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Conventions

- Components: PascalCase `.tsx`, one component per file, typed props.
- Data files export `const` objects/arrays with exported TS interfaces.
- No CSS files per component — Tailwind utilities + tokens only.
- Placeholder content is marked `// PLACEHOLDER — awaiting user` so it's greppable.
