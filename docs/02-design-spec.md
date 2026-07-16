# 02 — Design System

The visual language of the site. Every component is built from these tokens — no ad-hoc values in components.

## Direction

Dark, editorial, engineered. One accent color against near-black. Typography does the heavy lifting: an oversized variable-font display scale for identity, a monospace microlabel layer for system chrome (section numbers, tags, live readouts). Motion is restrained — soft-out easing, subtle brightness shifts, live scroll/cursor telemetry that makes the page feel instrumented.

## Color tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--color-ink` | `#0e0e0e` | Page background (near-black) |
| `--color-muted-ink` | `#ece9e4` | Primary text (warm off-white) |
| `--color-accent` | `#c3fffc` | Ice-cyan accent — links, highlights, theme chip |
| white | `#fff` | Pure white highlights |

## Typography

- **Display/body:** `"Rubik Variable", system-ui, sans-serif` — variable woff2, weights 300–900, self-hosted
- **Microlabels:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` — SCRL/CRSR readouts, eyebrows, tags

| Scale | Size | Line-height |
| --- | --- | --- |
| display-xl | `clamp(4.5rem, 1rem + 19vw, 19rem)` | `.84` |
| display-sm | `clamp(1.1rem, 5.4vw, 4.75rem)` | `1` |
| lead | `clamp(1.05rem, .82rem + 1.05vw, 1.75rem)` | `1.3` |
| body | `clamp(.875rem, .85rem + .12vw, 1rem)` | `1.55` |
| caption | `clamp(.8125rem, .79rem + .16vw, .875rem)` | `1.45` |
| field | `clamp(1rem, 2vw, 1.25rem)` | `1.4` |

Tracking: tight `-.025em`, wide `.025em`. Weights: light 300, medium 500, bold 700, black 900.

## Layout & spacing

- Gutter: `clamp(1.5rem, 8.33vw, 7.5rem)` — one fluid horizontal rhythm everywhere
- Card radius: `24px`; inner elements: `12px`
- Single page, full-bleed sections, numbered 01–05

## Motion

- Hover duration `.3s`, ease `cubic-bezier(.16, 1, .3, 1)` (soft out-expo)
- Image hover: `brightness(110%)`; header backdrop: `blur(8px)`; smooth anchor scroll
- Live readouts: **SCRL** (scroll progress 0.00→1.00) and **CRSR** (cursor x/y) rendered as mono microtext

## Page structure

1. **Sticky header** — wordmark · nav `01/WORK 02/PROJECTS 03/LAB 04/ABOUT 05/CONTACT` · GET IN TOUCH CTA · accent chip showing the theme hex
2. **Hero** — display-xl name, role line, specialization, stat, location, availability; SCRL/CRSR readouts
3. **01 Featured Work** — 4 large cards: number, title, category, one-liner, tech tags, screenshot, 3 outcome metrics, ↗ hover
4. **02 More Projects** — 6-card grid, compact variant of the work card
5. **03 Experiment Lab** — "PROOF OF BUILD" — 3 open-source cards with tech tags + repo links; center link `ALL CODE · GITHUB.COM/RISHII7`
6. **04 About/Career** — location coords microline, experience, education, Core Foundations (4 numbered), Core Competencies (5), toolkit grid, photo, resume download
7. **05 Contact "LET'S TALK"** — EMAIL/LINKEDIN/GITHUB rows, mailto form (Name/Email/Message, SEND ↗, "OPENS YOUR MAIL CLIENT — OR WRITE DIRECT"), © line, BACK TO TOP ↑

## Asset specs

Project screenshots: `.webp`/`.png` ~1600px wide (≈16:10). OG image: `og.jpg` 1200×630. Coords format: `PUNE — 18°31′N 73°51′E`.
