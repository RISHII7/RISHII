# 06 — Changelog

All notable project events, newest first.

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
