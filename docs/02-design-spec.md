# 02 — Design Spec (extracted from mauriciojuba.com)

Extracted 2026-07-16 from the live site's compiled CSS/JS. This is the source of truth for visual fidelity.

## Color tokens

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#c3fffc` | Cyan accent — links, highlights, theme chip |
| `--dark` / `--color-ink` | `#0e0e0e` | Page background (near-black) |
| `--color-muted` | `#ece9e4` | Primary text (off-white) |
| `--color-white` | `#fff` | Pure white highlights |

## Typography

- **Font:** `"Rubik Variable", system-ui, sans-serif` — variable woff2, weights 300–900, self-hosted
- **Mono:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` — microlabels (SCRL, CRSR, section eyebrows, tags)

| Scale | Size | Line-height |
|---|---|---|
| display-xl | `clamp(4.5rem, 1rem + 19vw, 19rem)` | `.84` |
| display-sm | `clamp(1.1rem, 5.4vw, 4.75rem)` | `1` |
| lead | `clamp(1.05rem, .82rem + 1.05vw, 1.75rem)` | `1.3` |
| body | `clamp(.875rem, .85rem + .12vw, 1rem)` | `1.55` |
| caption | `clamp(.8125rem, .79rem + .16vw, .875rem)` | `1.45` |
| field | `clamp(1rem, 2vw, 1.25rem)` | `1.4` |

Tracking: tight `-.025em`, wide `.025em`. Font weights: light 300, medium 500, bold 700, black 900.

## Layout & spacing

- Gutter: `clamp(1.5rem, 8.33vw, 7.5rem)`
- Card radius: `24px`; inner radius: `12px`
- Single-page, full-bleed sections, numbered 01–05

## Motion

- Hover duration: `.3s`; ease: `cubic-bezier(.16, 1, .3, 1)` (soft out-expo)
- Effects seen: `brightness(110%)` on image hover, `blur(8px)` (header backdrop), smooth anchor scroll
- Live readouts: **SCRL** (scroll progress 0.00→1.00) and **CRSR** (cursor x/y) in mono microtext

## Page structure

1. **Sticky header** — logo/name · nav `01/WORK 02/PROJECTS 03/LAB 04/ABOUT 05/CONTACT` · GET IN TOUCH CTA · theme toggle showing accent hex
2. **Hero** — display-xl name, role line, specialization line, stat line, location, availability; SCRL/CRSR readouts
3. **01 Featured Work** — 4 large cards: number, title, category, description, tags[], hero image, 3 metrics, notched corner, ↗ hover
4. **02 More Projects** — grid of 6 cards (reference had Articles here; same card language)
5. **03 Experiment Lab** — "PROOF OF BUILD" — 3 OSS cards with tech tags + GitHub links; center link `ALL CODE · GITHUB.COM/RISHII7`
6. **04 About/Career** — location coords line, experience list, education, Core Foundations (4 numbered), Core Competencies (5), My Toolkit icon grid, photo, resume download
7. **05 Contact "LET'S TALK"** — EMAIL/LINKEDIN/GITHUB rows, mailto form (Name/Email/Message, SEND ↗, "OPENS YOUR MAIL CLIENT — OR WRITE DIRECT"), © line, BACK TO TOP ↑

## Reference assets pattern

Project heroes: `.webp` ~1600px wide. OG image: `og.jpg` 1200×630. Location coords format: `PUNE — 18°31′N 73°51′E`.
