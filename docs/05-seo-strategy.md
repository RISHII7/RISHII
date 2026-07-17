# 05 — SEO Strategy

## Objective & honest expectations

**Will rank:** "Rushikesh Palande", "Rushikesh Palande developer/engineer/portfolio", "RISHII7", and project-name queries (ghost-ai, sendkit, etc. combined with the author's name). Low competition — with the implementation below plus a custom domain and indexed backlinks (GitHub, LinkedIn), #1 for name queries is achievable within weeks of indexing.

**Won't rank (be realistic):** generic head terms like "IT", "software engineer", "web developer". Those are dominated by global platforms with millions of backlinks; no personal site ranks for them. The strategy is to own every query that contains the name and let the case-study pages catch long-tail project queries.

## Implemented (in the codebase now)

1. **Title/description** — keyword-complete title tag; ~155-char meta description with name, role, specialties, location.
2. **Per-route SEO** — case-study pages set their own `document.title` (`PROJECT — Category case study · Rushikesh Palande`) and meta description, restored on navigation.
3. **Canonical URL**, `lang="en"`, `robots: index, follow, max-image-preview:large`, `theme-color`.
4. **Open Graph + Twitter cards** — og.jpg 1200×630, `og:site_name`, `og:locale`; shares on LinkedIn/X render as rich cards.
5. **JSON-LD structured data** — `Person` (name, alternateName RISHII7, jobTitle, worksFor Barclays, alumniOf, address, email, image, sameAs GitHub/LinkedIn, knowsAbout skills) **and** `WebSite` schema.
6. **Semantic HTML** — single `<h1>` (name), `<h2>` per section via sr-only headings on marquees, `<nav>/<main>/<section>/<footer>`, descriptive `alt` text, skip link, ARIA labeling.
7. **sitemap.xml** — home + all 9 case-study routes with priorities; **robots.txt** pointing at it.
8. **Vercel SPA rewrites** (`vercel.json`) — deep links like `/work/echo` resolve to the app instead of 404, so crawlers can reach every route; long-cache headers for hashed assets.
9. **Performance (Core Web Vitals)** — static Vite build (155 KB gzip JS), self-hosted subset font with `font-display: swap`, hero photo preloaded, lazy-loaded screenshots, `prefers-reduced-motion` support.

## Post-deploy checklist (owner actions — these move the needle most)

- [ ] Buy the custom domain (e.g. `rushikeshpalande.com`); if different, update canonical/OG URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/data/site.ts`
- [ ] Vercel: add domain, confirm HTTPS
- [ ] Google Search Console: verify property, submit `sitemap.xml`, request indexing of `/`
- [ ] Bing Webmaster Tools: same (free Bing/DuckDuckGo coverage)
- [ ] Set the site URL on the GitHub profile and LinkedIn — the two strongest backlinks a personal site can get
- [ ] Link the portfolio from each featured repo's README ("Case study → …") — turns 9 repos into 9 backlinks
- [ ] Keep `resume.pdf` filename stable (it gets indexed for "Rushikesh Palande resume")

## Why this is as strong as a portfolio SEO gets

Every ranking signal a static personal site can control is present: unique indexable URLs per project, structured data for the knowledge graph, fast paint times, mobile-friendly responsive layout, crawlable sitemap, and authoritative backlinks queued up. What remains (domain age, backlink accrual, engagement) accumulates over time — no further code changes required.
