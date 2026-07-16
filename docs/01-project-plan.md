# 01 — Project Plan

> Portfolio website for **Rushikesh Palande** — an exact visual clone of [mauriciojuba.com](https://mauriciojuba.com/), rebuilt with Rushikesh's own data and photo.

## Goal

Pixel-faithful recreation of the reference site's design, layout, typography, motion, and interactions. Only the *content* differs (Rushikesh's identity, projects, career, contact). No design deviations.

## Confirmed decisions

| Decision | Choice |
|---|---|
| Tech stack | React 19 + Vite + Tailwind CSS v4 + TypeScript (same as reference) |
| Font | Rubik Variable (self-hosted via @fontsource-variable) |
| Section 02 | "More Projects" grid replaces reference's Articles section (Rushikesh doesn't write) |
| Project images | User provides screenshots; styled placeholders until then |
| Dates on project cards | **None** — user explicitly requested no dates |
| Email | rishikeshx1006@gmail.com |
| Featured projects | **TBD by user** — do NOT use night-code, Flowbrowse, or resume projects (Solar/Voidchron/CAN Analyzer) unless user says so. Placeholders until user provides lists. |

## Milestones

1. ✅ Research reference site (HTML/CSS/JS bundle analyzed, tokens extracted → `02-design-spec.md`)
2. ✅ Extract user content (resume PDF, GitHub, old portfolio → `03-content-map.md`)
3. ✅ Documentation set created
4. ⬜ Scaffold project (Vite + React + TS + Tailwind v4)
5. ⬜ Design system: tokens, font, base styles
6. ⬜ Sections: Header/Hero → 01 Work → 02 Projects → 03 Lab → 04 About → 05 Contact
7. ⬜ SEO layer (meta, OG, JSON-LD, sitemap, robots) → `05-seo-strategy.md`
8. ⬜ Real project data from user + screenshots
9. ⬜ Browser verification & pixel polish vs reference
10. ⬜ Deployment (Vercel recommended; custom domain advised for SEO)

## Open items (waiting on user)

- [ ] List of projects for Featured Work (4), More Projects (6), Experiment Lab (3)
- [ ] Screenshots for the 4 featured projects (~1600×1000, PNG/WebP, drop into `public/images/projects/`)
- [ ] Custom domain decision (e.g. rushikeshpalande.com) — strongly recommended for name-search SEO
