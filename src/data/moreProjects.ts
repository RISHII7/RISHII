import type { FeaturedProject } from "./featuredWork";

/**
 * Section 02 — More Projects. Same shape as featured work so each row
 * opens a full case-study page at /projects/:slug.
 */
export const moreProjects: FeaturedProject[] = [
  {
    number: "001",
    slug: "roomify",
    title: "ROOMIFY",
    category: "AI Visualization",
    description:
      "Upload a 2D floor plan, get a photorealistic 3D render back — an AI visualization SaaS running entirely serverless",
    tags: ["React 19", "React Router 7", "Puter.js", "Gemini", "Docker"],
    metrics: [
      { value: "2D→3D", label: "instant AI architectural renders" },
      { value: "0", label: "servers to manage — fully serverless" },
      { value: "v1.0", label: "LTS release, live on Vercel" },
    ],
    image: "/images/projects/roomify.png",
    href: "https://roomify-virid-six.vercel.app",
    github: "https://github.com/RISHII7/roomify",
    detail: {
      role: "SOLO BUILD — FULL PRODUCT",
      timeline: "SHIPPED · LTS",
      scope: ["AI render pipeline", "Serverless backend", "CDN storage", "Compare UX"],
      summary:
        "Roomify removes the slowest step in architectural presentation: it turns flat blueprints into bright, photorealistic top-down 3D renders in one upload, with a before/after slider to sell the transformation.",
      pullquote: "No backend, no database admin, no DevOps — the whole platform lives at the edge.",
      body: [
        "The pipeline is simple for the user and disciplined underneath: drag-and-drop a floor plan, and a custom-prompted Gemini 2.5 Flash image model cleans the text, extrudes wall geometry, maps layout icons — beds, sofas, tables — to realistic furniture, and returns a lit, top-down 3D render.",
        "Architecture is client-first and fully serverless on Puter: authentication, a distributed key-value store for project metadata, CDN-hosted blueprint storage with auto-generated subdomains, and edge-deployed Cloud Workers exposing the save/list/get API. There is no traditional backend to operate at all.",
        "Built on React 19 with SSR routing via React Router 7, Tailwind v4, and a react-compare-slider driven before/after view; ships as a multi-stage Docker image for self-hosting alongside the Vercel deployment.",
      ],
    },
  },
  {
    number: "002",
    slug: "nimbus",
    title: "NIMBUS",
    category: "3D Product Experience",
    description:
      "Premium mechanical-keyboard showcase — PBR-textured 3D models, scroll-driven cinematography, and a live keycap customizer",
    tags: ["Next.js", "Three.js", "R3F", "GSAP", "Prismic"],
    metrics: [
      { value: "3D", label: "PBR keyboard scenes, dynamic light" },
      { value: "60FPS", label: "scroll-linked GSAP choreography" },
      { value: "98.7%", label: "TypeScript codebase" },
    ],
    image: "/images/projects/nimbus.png",
    href: "https://nimbus-nu-teal.vercel.app",
    github: "https://github.com/RISHII7/Nimbus",
    detail: {
      role: "SOLO BUILD — DESIGN & ENGINEERING",
      timeline: "SHIPPED · v1.0.0",
      scope: ["3D scene engineering", "Scroll choreography", "CMS slices", "Customizer UX"],
      summary:
        "A product page that behaves like a film: realistic 3D keyboards with PBR textures respond to scroll and cursor, while a real-time customizer lets visitors restyle keycaps and play with switch types.",
      pullquote: "Static product pages don't sell hardware — cinematography does.",
      body: [
        "The 3D layer runs on Three.js through React Three Fiber with drei utilities: physically-based keycap materials, dynamic lighting, camera moves eased between scroll positions, and mouse-parallax depth. GSAP ScrollTrigger conducts the timeline — wave cascades across the keys, content reveals, and a bidirectional marquee.",
        "Every section is a Prismic slice — hero, color changer, switch playground, bento grid, purchase CTA — so content is CMS-editable without touching the scene code. Slice Machine keeps the component-driven content schema in sync.",
        "Next.js 15 with Turbopack, React 19, Tailwind 4 and Radix primitives round out the stack, with static generation and code splitting keeping the heavy 3D payload off the critical path. WCAG motion preferences are respected throughout.",
      ],
    },
  },
  {
    number: "003",
    slug: "apple-macbook",
    title: "APPLE MACBOOK",
    category: "3D Web Experience",
    description:
      "Apple-grade MacBook showcase — immersive Three.js scenes with realistic lighting, masking effects and scroll-triggered motion",
    tags: ["React 19", "Three.js", "GSAP", "Vite", "Docker"],
    metrics: [
      { value: "5★", label: "stars, 3 forks on GitHub" },
      { value: "3D", label: "realistic lighting & masking FX" },
      { value: "CI", label: "Husky, Vitest, Docker, Actions" },
    ],
    image: "/images/projects/apple-macbook.png",
    href: "https://apple-macbook-ten.vercel.app",
    github: "https://github.com/RISHII7/Apple-Macbook",
    detail: {
      role: "SOLO BUILD — EXPERIENCE ENGINEERING",
      timeline: "SHIPPED · v1.0.0",
      scope: ["3D scenes", "Scroll animation", "Masking effects", "Container infra"],
      summary:
        "A faithful study of Apple's product-page language: an interactive MacBook scene with realistic lighting, masking transitions and buttery scroll-triggered sequences — engineered, not just animated.",
      pullquote: "Recreating Apple's polish is the hardest UI bar there is — that's why it's worth doing.",
      body: [
        "Three.js renders the MacBook scene with realistic lighting models while GSAP drives scroll-triggered sequences, masking effects and transitions that mirror Apple's product storytelling. React 19 on Vite keeps iteration fast with HMR.",
        "The repository runs like a production codebase: Husky pre-commit hooks with lint-staged, ESLint and Prettier enforcement, Vitest for testing, GitHub Actions workflows, and both dev and production Docker Compose setups with an Nginx config for self-hosted serving.",
        "One of the most starred projects on my GitHub — a compact demonstration that frontend craft and infrastructure discipline belong in the same repo.",
      ],
    },
  },
  {
    number: "004",
    slug: "sendkit",
    title: "SENDKIT",
    category: "Developer Tooling",
    description:
      "One toolkit to message anywhere — unified SDK, CLI and MCP server that lets apps, pipelines and AI agents send Telegram messages today, more providers next",
    tags: ["TypeScript", "Bun", "MCP", "Hono", "Zod"],
    metrics: [
      { value: "3", label: "layers: SDK · CLI · MCP server" },
      { value: "15", label: "releases published to npm" },
      { value: "5+", label: "runtimes: Edge, Workers, Deno, Bun, Node" },
    ],
    image: "/images/projects/sendkit.png",
    href: "https://www.npmjs.com/package/@rishi1006/sendkit",
    github: "https://github.com/RISHII7/sendkit",
    detail: {
      role: "SOLO BUILD — OSS MAINTAINER",
      timeline: "SHIPPED · v1.0.3 ON NPM",
      scope: ["SDK core", "CLI wizard", "Local + remote MCP", "OAuth auth"],
      summary:
        "Messaging integrations are fragmented — every provider has its own API. SendKit wraps them behind one type-safe interface consumable three ways: as an SDK, an interactive CLI, or an MCP server that teaches AI agents to send messages themselves.",
      pullquote: "npx sendkit init — thirty seconds later your agent can message you.",
      body: [
        "The core engine is strict TypeScript with Zod v4 validation over plain fetch, which keeps it zero-config and runnable on Vercel Edge, Cloudflare Workers, Deno, Bun and Node. Telegram ships first; Discord, Slack and SMTP follow the same provider contract.",
        "The CLI (Commander + Clack) gives a guided setup wizard with secure token input, connectivity health checks and a polished terminal UI. The MCP layer runs two ways: a local stdio server for Cursor, Windsurf and Claude Desktop, and a remote Hono deployment on Vercel Edge secured with Clerk OAuth 2.0.",
        "Built as a Bun monorepo with tsdown (Rolldown) builds, oxlint/oxfmt tooling, Conventional Commits, a security policy, and fifteen tagged releases — maintained like a real open-source product, because it is one.",
      ],
    },
  },
  {
    number: "005",
    slug: "zenbrew",
    title: "ZENBREW",
    category: "Brand Experience",
    description:
      "A premium coffee-house brand site — video-backed hero, eight crafted sections, and motion design running on two animation engines",
    tags: ["Next.js", "React", "GSAP", "Framer Motion", "Tailwind"],
    metrics: [
      { value: "8", label: "immersive brand sections" },
      { value: "2", label: "animation engines in concert" },
      { value: "LIVE", label: "deployed on Vercel" },
    ],
    image: "/images/projects/zenbrew.png",
    href: "https://zenbrew-zeta.vercel.app",
    github: "https://github.com/RISHII7/zenbrew",
    detail: {
      role: "SOLO BUILD — DESIGN & FRONTEND",
      timeline: "SHIPPED · LIVE",
      scope: ["Brand narrative", "Motion design", "Section system", "Responsive build"],
      summary:
        "ZenBrew gives a coffee shop the digital presence of a luxury brand: an atmospheric video hero flows into menu, story, hours and testimonials — every transition choreographed.",
      pullquote: "Ambience is the product — the website has to pour it.",
      body: [
        "Eight sections tell one continuous story: a video-background hero sets the atmosphere, explore and about sections carry the brand narrative, and menu, opening hours, testimonials and footer close the loop from mood to visit.",
        "Motion is the craft here — GSAP handles scroll-driven sequences while Framer Motion covers component-level transitions, layered carefully so they complement rather than compete. Built on Next.js with Tailwind and a constants-driven content structure that keeps copy editable in one place.",
      ],
    },
  },
  {
    number: "006",
    slug: "fizzie",
    title: "FIZZIE",
    category: "Beverage Brand",
    description:
      "“Soda for Gutsy People” — a premium health-soda brand site with a shoppable flavor carousel and gut-health storytelling, all CMS-driven",
    tags: ["Next.js", "TypeScript", "Prismic", "Tailwind"],
    metrics: [
      { value: "5", label: "flavors in a shoppable carousel" },
      { value: "CMS", label: "Prismic slice-driven content" },
      { value: "LIVE", label: "deployed on Vercel" },
    ],
    image: "/images/projects/fizzie.png",
    href: "https://fizzie.vercel.app",
    github: "https://github.com/RISHII7/fizzie",
    detail: {
      role: "SOLO BUILD — DESIGN & FRONTEND",
      timeline: "SHIPPED · LIVE",
      scope: ["Brand narrative", "Product showcase", "Flavor carousel", "CMS content"],
      summary:
        "Fizzi is a wellness-first soda brand — “Live Gutsy.” The site sells the feeling: bright product photography, an interactive flavor carousel, and benefit sections that make prebiotics and 9g of fiber look as good as they taste.",
      pullquote: "Functional health, premium indulgence — the site has to carry both.",
      body: [
        "The experience opens on a bold hero with a shop CTA, flows into the full can lineup, then an interactive flavor carousel where visitors browse the five flavors and pricing. Three benefit sections carry the brand's positioning — gut health, 20 calories a can, real fruit juice with no artificial sweeteners.",
        "Built on Next.js and TypeScript with Tailwind for the vibrant, health-conscious visual system, and Prismic as the headless CMS so every section is a slice the brand can edit without touching code — content flexibility behind a polished storefront.",
      ],
    },
  },
];
