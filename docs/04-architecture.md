# 04 — Architecture & Folder Structure

## Stack

- **Vite 7** — build tool, dev server
- **React 19** + **TypeScript** (strict) — UI
- **React Router 7** — `/` home, `/work/:slug` and `/projects/:slug` case-study pages
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` plugin (CSS-first config, no tailwind.config.js)
- **@fontsource-variable/rubik** — self-hosted variable font (no external font CDN)
- **Lenis** — smooth scrolling · **framer-motion** — page-enter animations · **simple-icons** — brand glyphs
- **ESLint 9** (flat config: JS + typescript-eslint + react-hooks + react-refresh)

## Principles

1. **Content lives in `src/data/`** — every section reads typed data objects. Swapping a project = editing one file, zero component changes.
2. **Components split by responsibility** — `layout/` (chrome), `sections/` (one per page section), `ui/` (reusable atoms), `pages/` (routes).
3. **Design tokens in CSS** — `src/styles/index.css` declares the design-system tokens as CSS custom properties + Tailwind `@theme`, so utilities like `text-display-xl` and `bg-ink` exist.
4. **Hooks isolate behavior** — scroll progress, cursor tracking, clock, accent cycling, active section are reusable hooks, not inline effects.
5. **Canvas art is deterministic helpers** — all dithering lives in `lib/dither.ts`, components only wire canvases to it.

## Folder structure

```text
Rushikesh_Palande/
├── docs/                      # Project documentation (this folder)
├── public/
│   ├── images/
│   │   ├── projects/          # 9 project screenshots
│   │   └── rushikesh.jpg      # Profile photo (hero + about canvases)
│   ├── resume.pdf             # Downloadable resume
│   ├── favicon.svg            # RP monogram
│   ├── og.jpg                 # Social share image (1200×630)
│   ├── robots.txt
│   └── sitemap.xml            # Home + all 9 case-study routes
├── src/
│   ├── main.tsx               # Entry (BrowserRouter)
│   ├── App.tsx                # Routes + Lenis
│   ├── pages/
│   │   ├── Home.tsx           # Preloader + all five sections + chrome
│   │   └── ProjectPage.tsx    # Case-study template (work + projects), per-route SEO
│   ├── styles/
│   │   └── index.css          # Tailwind v4 @theme tokens + system chrome + fw-deck CSS
│   ├── data/                  # ALL site content (typed)
│   │   ├── site.ts            # Meta, nav, socials
│   │   ├── profile.ts         # Hero, preloader, about, photo crops
│   │   ├── featuredWork.ts    # Section 01 — 3 projects + case-study detail
│   │   ├── moreProjects.ts    # Section 02 — 6 projects + case-study detail
│   │   ├── lab.ts             # Section 03 — OSS slots
│   │   └── career.ts          # Experience, education, foundations, competencies, toolkit, tech band
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Preloader.tsx  # Scrambled identity lines + 0→100 counter
│   │   │   ├── Header.tsx     # Fixed nav, bracket-active items, mobile menu
│   │   │   ├── StatusBar.tsx  # Bottom HUD (SCRL/CRSR/section/theme/clock) + EdgeLines
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Dither canvases + cursor-weight name + scramble entrance
│   │   │   ├── TechBand.tsx   # Off-white logo marquee
│   │   │   ├── FeaturedWork.tsx  # Sticky card deck → /work/:slug
│   │   │   ├── MoreProjects.tsx  # Ledger rows → /projects/:slug
│   │   │   ├── Lab.tsx
│   │   │   ├── About.tsx      # Halftone canvas, career ledgers, toolkit
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── SectionShell.tsx   # SectionEyebrow · MarqueeTitle · SectionFrame
│   │       ├── LogRow.tsx         # Ledger row w/ accent sweep (internal Link or external a)
│   │       ├── ScrambleText.tsx   # Decode/random text scramble
│   │       └── BrandIcon.tsx      # simple-icons inline SVGs
│   ├── hooks/
│   │   ├── useScrollProgress.ts · useCursorPosition.ts
│   │   ├── useClock.ts · useAccent.ts · useActiveSection.ts
│   └── lib/
│       ├── dither.ts          # Bayer dither portrait/cover/ambient/halftone helpers
│       └── utils.ts           # cn() class helper
├── index.html                 # SEO head: meta, OG, Twitter, Person + WebSite JSON-LD
├── vercel.json                # SPA rewrites + asset cache headers
├── eslint.config.js
├── package.json               # dev/build/lint/typecheck/preview scripts
├── vite.config.ts · tsconfig.json
└── README.md
```

## Conventions

- Components: PascalCase `.tsx`, one component per file, typed props.
- Data files export `const` objects/arrays with exported TS interfaces (`FeaturedProject` is the shared project shape).
- No CSS files per component — Tailwind utilities + tokens; bespoke effects live in `styles/index.css`.
- Placeholder content is marked `// PLACEHOLDER — awaiting user` so it's greppable (only `lab.ts` remains).
- Quality gates before merge: `npm run lint`, `npm run build` (tsc + vite) must pass.
