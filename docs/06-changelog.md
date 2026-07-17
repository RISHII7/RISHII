# 06 — Changelog

All notable project events, newest first.

## 2026-07-17

- **Real project content everywhere**: Featured Work = GHOST-AI · ECHO · NODEBASE (PR #11); More Projects = ROOMIFY · NIMBUS · APPLE MACBOOK · SENDKIT · ZENBREW · FIZZIE — all copy written from the repositories, 9 screenshots in `public/images/projects/`
- **Case-study pages for every project**: shared template serves `/work/:slug` and `/projects/:slug` with role/scope/stack, overview, outcomes, pullquote, live + GitHub buttons, next-project navigation; section highlight follows the collection
- **Interactions**: perpetual marquee crawl, scramble-decode on preloader/hero/card titles, preloader with role line, hover-scramble card titles (owner tweak), mobile portrait shift, contrast-boosted hero dither at higher desktop resolution
- **SEO hardening**: WebSite JSON-LD added to Person schema, `og:site_name`/locale, robots + theme-color meta, hero image preload, per-route titles/descriptions on case studies, sitemap.xml covering all 10 URLs, `vercel.json` SPA rewrites + immutable asset caching
- **Quality gates**: ESLint 9 flat config (TS + react-hooks) added with `lint`/`typecheck` scripts; lint, typecheck and production build all green
- Docs 01–05 refreshed to reflect the finished feature set

## 2026-07-16 (night)

- Fidelity pass from a frame-by-frame study of the target experience (PR #7):
  preloader intro (identity block, 0→100 counter, any-key skip, staggered hero
  reveal), measured face-crop for the hero portrait, cursor-following dither
  blob, CRSR pixel readout, 00 — INTRO label, lab VISIT row, larger band logos

## 2026-07-16 (evening)

- Full site built and merged (PR #4): header/HUD chrome, hero with dithered canvas portrait + cursor-weight name, tech marquee band, featured-work sticky deck, projects/lab ledger rows, about with live halftone portrait, contact + footer; Lenis smooth scroll; reduced-motion support
- SEO assets merged (PR #5): favicon, og.jpg card, robots.txt, sitemap.xml; repo hygiene
- Verified with headless-browser screenshots of every section against the design spec
- Production build: 272 KB JS (88 KB gzip)
- Waiting on owner: featured/more/lab project lists + 4 screenshots; then release v1.0.0

## 2026-07-16

- Docs reworked to stand alone as the project's own design & product documentation
- Git workflow established: `main` (releases) ← `develop` (integration) ← `feature/*` branches via PRs; repo `github.com/RISHII7/RISHII`
- Scaffolded Vite 7 + React 19 + TypeScript + Tailwind CSS v4; SEO head (meta/OG/Twitter/JSON-LD) in `index.html` (PR #1)
- Design system defined: color tokens, Rubik Variable + mono microlabel type scale, fluid gutter, motion rules → `02-design-spec.md`
- Content gathered from resume, GitHub (43 repos), and prior portfolio → `03-content-map.md`
- Decisions: Section 02 = More Projects grid; owner provides screenshots; contact email `rishikeshx1006@gmail.com`; no dates on project cards; owner curates project lists (placeholders until then)
- Documentation set created (docs 01–06)
