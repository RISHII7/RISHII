# Rushikesh Palande — Portfolio

Personal portfolio of **Rushikesh Palande**, Software Engineer (Full-Stack & AI-Powered Systems).

A dark, editorial single-page site: oversized display typography, mono microlabels, live scroll/cursor readouts, and numbered sections — built as a design system first, then composed into a page.

**Live:** _pending deployment_

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · Rubik Variable

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Project documentation

Full docs live in [docs/](docs/):

| Doc | Purpose |
| --- | --- |
| [01-project-plan.md](docs/01-project-plan.md) | Goals, decisions, milestones, open items |
| [02-design-spec.md](docs/02-design-spec.md) | Design system — tokens, type scale, motion, structure |
| [03-content-map.md](docs/03-content-map.md) | All site copy and its sources |
| [04-architecture.md](docs/04-architecture.md) | Stack, folder structure, conventions |
| [05-seo-strategy.md](docs/05-seo-strategy.md) | SEO implementation & post-deploy checklist |
| [06-changelog.md](docs/06-changelog.md) | Chronological project log |

## Git workflow

- `main` — production releases only (tagged)
- `develop` — integration branch
- `feature/*` — one branch per feature, merged into `develop` via PR
- Releases: `develop` → `main` PR + version tag
