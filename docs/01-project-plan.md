# 01 — Project Plan

> Portfolio website for **Rushikesh Palande** — Software Engineer, Full-Stack & AI-Powered Systems.

## Vision

A dark, editorial, type-driven portfolio that feels engineered rather than templated: oversized display headlines, monospace microlabels, live scroll/cursor readouts, numbered sections, canvas-dithered portrait art, and project cards that open into full case-study pages. The design system is defined first (`02-design-spec.md`) and every component is built from its tokens.

## Confirmed decisions

| Decision | Choice |
| --- | --- |
| Tech stack | React 19 + Vite 7 + Tailwind CSS v4 + TypeScript + React Router 7 |
| Font | Rubik Variable (self-hosted via @fontsource-variable) |
| Page shape | Single page, five numbered sections + case-study routes (`/work/:slug`, `/projects/:slug`) |
| Featured Work | GHOST-AI · ECHO · NODEBASE (3 cards, owner-curated) |
| More Projects | ROOMIFY · NIMBUS · APPLE MACBOOK · SENDKIT · ZENBREW · FIZZIE |
| Project images | Real screenshots in `public/images/projects/` |
| Dates on project cards | **None** — cards lead with tech and outcomes, not timelines |
| Contact email | `rishikeshx1006@gmail.com` |

## Milestones

1. ✅ Design system defined — tokens, type scale, motion (`02-design-spec.md`)
2. ✅ Content gathered — resume, GitHub, prior portfolio (`03-content-map.md`)
3. ✅ Documentation set created and maintained
4. ✅ Project scaffolded (Vite + React 19 + TS + Tailwind v4)
5. ✅ Design tokens + base styles implemented
6. ✅ All sections built: Preloader → Hero → Tech band → 01 Work → 02 Projects → 03 Lab → 04 About → 05 Contact
7. ✅ Case-study pages for all 9 projects (routing, per-page SEO titles)
8. ✅ SEO layer — meta, OG, JSON-LD (Person + WebSite), sitemap with all routes, robots, per-route titles, Vercel SPA rewrites
9. ✅ Real project data + screenshots (work + more projects)
10. ✅ Quality gates — ESLint (flat config, TS + react-hooks), typecheck, production build all green
11. ⬜ Experiment Lab real data (3 slots — owner to pick)
12. ⬜ Release v1.0.0 (`develop` → `main` PR #9, tag) and deploy to Vercel
13. ⬜ Custom domain + Google Search Console submission

## Open items (waiting on owner)

- [ ] Experiment Lab picks (3 open-source repos)
- [ ] Merge release PR #9 → tag v1.0.0 → deploy
- [ ] Buy custom domain (canonical currently `rushikeshpalande.com` — update `index.html`, `sitemap.xml`, `robots.txt`, `src/data/site.ts` if the domain differs)
- [ ] After deploy: submit sitemap in Google Search Console; set site URL on GitHub + LinkedIn profiles
