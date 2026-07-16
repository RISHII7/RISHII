# 05 — SEO Strategy

## Objective & honest expectations

**Will rank:** "Rushikesh Palande", "Rushikesh Palande developer/engineer/portfolio", "RISHII7". Low competition — with proper on-page SEO + a custom domain + indexed backlinks (GitHub, LinkedIn), #1 is achievable within weeks.

**Won't rank (be realistic):** generic terms like "IT", "software engineer", "web developer" — those are dominated by global platforms. No portfolio site ranks for them.

## On-page implementation

1. **Title:** `Rushikesh Palande — Software Engineer · Full-Stack & AI Systems`
2. **Meta description:** ~155 chars, name + role + specialties + location.
3. **Canonical URL** + `lang="en"`.
4. **Open Graph + Twitter cards** — og.jpg 1200×630, so shares on LinkedIn/X look professional.
5. **JSON-LD structured data** (`Person` schema): name, jobTitle, worksFor (Barclays), alumniOf, sameAs (GitHub/LinkedIn URLs), knowsAbout (skills). This powers Google's knowledge panel understanding.
6. **Semantic HTML:** single `<h1>` (name), `<h2>` per section, `<nav>`, `<main>`, `<section>`, `<footer>`; descriptive `alt` on all images.
7. **robots.txt + sitemap.xml** — submitted to Google Search Console after deploy.
8. **Performance:** static Vite build, self-hosted font with `font-display: swap`, lazy-loaded images, preloaded critical assets → strong Core Web Vitals (ranking signal).

## Post-deploy checklist (user actions)

- [ ] Buy custom domain (recommended: rushikeshpalande.com / rushikesh.dev) — biggest single SEO lever for name queries
- [ ] Add site to Google Search Console, submit sitemap
- [ ] Set the site URL on GitHub profile and LinkedIn (authoritative backlinks)
- [ ] Keep resume PDF filename as `resume.pdf` (crawlable)
