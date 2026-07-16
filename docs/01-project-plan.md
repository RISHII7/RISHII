# 01 — Project Plan

> Portfolio website for **Rushikesh Palande** — Software Engineer, Full-Stack & AI-Powered Systems.

## Vision

A dark, editorial, type-driven single-page portfolio that feels engineered rather than templated: oversized display headlines, monospace microlabels, live scroll/cursor readouts, numbered sections, and project cards that lead with real outcomes. The design system is defined first (`02-design-spec.md`) and every component is built from its tokens.

## Confirmed decisions

| Decision | Choice |
| --- | --- |
| Tech stack | React 19 + Vite 7 + Tailwind CSS v4 + TypeScript |
| Font | Rubik Variable (self-hosted via @fontsource-variable) |
| Page shape | Single page, five numbered sections: Work · Projects · Lab · About · Contact |
| Project images | Real screenshots (owner-provided); styled placeholder covers until then |
| Dates on project cards | **None** — cards lead with tech and outcomes, not timelines |
| Contact email | `rishikeshx1006@gmail.com` |
| Featured projects | Owner curates the list — placeholders in `src/data/` until provided |

## Milestones

1. ✅ Design system defined — tokens, type scale, motion (`02-design-spec.md`)
2. ✅ Content gathered — resume, GitHub, prior portfolio (`03-content-map.md`)
3. ✅ Documentation set created
4. ✅ Project scaffolded (Vite + React 19 + TS + Tailwind v4)
5. ⬜ Design tokens + base styles implemented
6. ⬜ Sections: Header/Hero → 01 Work → 02 Projects → 03 Lab → 04 About → 05 Contact
7. ⬜ SEO layer (meta, OG, JSON-LD, sitemap, robots) → `05-seo-strategy.md`
8. ⬜ Real project data + screenshots
9. ⬜ Browser verification & polish
10. ⬜ Release v1.0.0 (`develop` → `main`, tag) and deploy (Vercel; custom domain recommended)

## Open items (waiting on owner)

- [ ] Project lists: Featured Work (4), More Projects (6), Experiment Lab (3)
- [ ] Screenshots for the 4 featured projects (~1600×1000, PNG/WebP → `public/images/projects/`)
- [ ] Custom domain decision (e.g. rushikeshpalande.com) — strongly recommended for name-search SEO
