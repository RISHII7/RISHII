# 01 — Project Plan

> Portfolio website for **Rushikesh Palande** — Software Engineer, Full-Stack & AI-Powered Systems.

## Vision

A dark, editorial, type-driven portfolio that feels engineered rather than templated: oversized display headlines, monospace microlabels, live scroll/cursor readouts, numbered sections, canvas-dithered portrait art, and project cards that open into full case-study pages. The design system is defined first (`02-design-spec.md`) and every component is built from its tokens.

## Confirmed decisions

| Decision | Choice |
| --- | --- |
| Tech stack | React 19 + Vite 7 + Tailwind CSS v4 + TypeScript + React Router 7 |
| Font | Rubik Variable (self-hosted via @fontsource-variable) |
| Page shape | Single page, five numbered sections + case-study routes (`/work/:slug`, `/projects/:slug`, `/data/:slug`) |
| Live URL | `https://rishii-two.vercel.app` (free Vercel subdomain, no custom domain purchased) |
| Featured Work | GHOST-AI · ECHO · NODEBASE (3 cards, owner-curated) |
| More Projects | ROOMIFY · NIMBUS · APPLE MACBOOK · SENDKIT · ZENBREW · FIZZIE · FLOWBROWSE |
| Data Engineering | WALMART DATA PLATFORM — section rebranded from "Experiment Lab" (2026-08-05); Night-Code dropped, didn't fit the theme |
| Project images | Real screenshots in `public/images/projects/` where available; data-engineering entries are text-only by owner's choice |
| Dates on project cards | **None** — cards lead with tech and outcomes, not timelines |
| Contact email | `rishikeshx1006@gmail.com` |

## Milestones

1. ✅ Design system defined — tokens, type scale, motion (`02-design-spec.md`)
2. ✅ Content gathered — resume, GitHub, prior portfolio (`03-content-map.md`)
3. ✅ Documentation set created and maintained
4. ✅ Project scaffolded (Vite + React 19 + TS + Tailwind v4)
5. ✅ Design tokens + base styles implemented
6. ✅ All sections built: Preloader → Hero → Tech band → 01 Work → 02 Projects → 03 Data Engineering → 04 About → 05 Contact
7. ✅ Case-study pages for all projects across three collections (routing, per-page SEO)
8. ✅ SEO layer — meta, OG, JSON-LD (Person + WebSite + ProfilePage), sitemap with all routes, robots, Vercel SPA rewrites
9. ✅ Per-route SEO tags baked into static HTML at build time via `prerender.tsx` — not just client-patched, so crawlers/link-unfurl bots see correct route-specific title/description/canonical/OG/Twitter
10. ✅ Real project data + screenshots across Work, Projects, and Data Engineering
11. ✅ Quality gates — ESLint (flat config, TS + react-hooks), typecheck, production build all green
12. ✅ Released to `main`, deployed to Vercel at `rishii-two.vercel.app`
13. ✅ Google Search Console: property verified, sitemap submitted, homepage indexed
14. ✅ GitHub profile README (`RISHII7/RISHII7`) updated with a portfolio spotlight + corrected project cards
15. ⬜ Custom domain (optional — currently on the free Vercel subdomain; a custom domain would strengthen name-search ranking further)

## Open items (owner's call, not blocking)

- [ ] Custom domain purchase — if bought, update canonical/OG URLs in `index.html`, `src/prerender.tsx`, `public/sitemap.xml`, `public/robots.txt`, `src/data/site.ts`
- [ ] Old portfolio (`rushikesh-indol.vercel.app`) still competes with this site in search results for the owner's name — a 301 redirect to `rishii-two.vercel.app` would consolidate ranking authority, pending owner access/confirmation
