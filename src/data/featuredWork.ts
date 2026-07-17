export interface Metric {
  value: string;
  label: string;
}

export interface FeaturedProject {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: Metric[];
  image?: string; // screenshot in /public/images/projects/
  href?: string; // live demo
  github?: string;
  detail: {
    role: string;
    timeline: string;
    scope: string[];
    summary: string;
    pullquote: string;
    body: string[];
  };
}

export const featuredWork: FeaturedProject[] = [
  {
    number: "01",
    slug: "ghost-ai",
    title: "GHOST-AI",
    category: "AI System Design",
    description:
      "Real-time multiplayer whiteboard where an autonomous AI architect turns plain-English prompts into living system diagrams",
    tags: ["Next.js", "TypeScript", "Liveblocks", "Gemini", "Trigger.dev"],
    metrics: [
      { value: "8", label: "agent tools driving the canvas" },
      { value: "CRDT", label: "conflict-free multiplayer editing" },
      { value: "17", label: "releases shipped" },
    ],
    image: "/images/projects/ghost-ai.png",
    href: "https://ghost-ai-ruby.vercel.app",
    github: "https://github.com/RISHII7/ghost-ai",
    detail: {
      role: "SOLO BUILD — DESIGN TO PRODUCTION",
      timeline: "SHIPPED · ACTIVELY MAINTAINED",
      scope: ["Realtime architecture", "Agent tool-calling", "Canvas engine", "Spec generation"],
      summary:
        "Describe a system in natural language and watch an autonomous AI architect draw it — nodes, edges, labels — on a canvas your whole team is editing live.",
      pullquote: "The diagram isn't documentation of the design. The diagram is the design.",
      body: [
        "Ghost-AI is an enterprise-grade collaborative whiteboard built on CRDTs: every shape, edge and label lives in Liveblocks LiveMaps, so simultaneous edits from multiple collaborators merge without conflicts. Live cursors, presence avatars and an in-workspace chat feed make it feel like one shared room.",
        "The AI architect is a Gemini 2.5 Flash agent wielding eight discrete tools — addNode, moveNode, resizeNode, updateNodeData, deleteNode, addEdge, deleteEdge, finalizeDesign — executed serverlessly through Trigger.dev so long-running generations never hit timeouts. Canvas state auto-saves on a two-second debounce to Vercel Blob, indexed in PostgreSQL via Prisma.",
        "Finished designs compile into multi-page Markdown specifications — overview, architecture, data flow, technology choices — turning a sketch session into technical documentation automatically. Auth and multi-tenant workspaces run on Clerk with room-level isolation.",
      ],
    },
  },
  {
    number: "02",
    slug: "echo",
    title: "ECHO",
    category: "AI Support Platform",
    description:
      "Drop one script tag on any website and give customers a 24/7 AI support agent — chat and voice — grounded in your own docs",
    tags: ["Next.js", "Convex", "Gemini RAG", "Vapi Voice", "Turborepo"],
    metrics: [
      { value: "3", label: "deployable apps, one monorepo" },
      { value: "24/7", label: "AI answers over chat & voice" },
      { value: "RAG", label: "grounded in your knowledge base" },
    ],
    image: "/images/projects/echo.png",
    href: "https://echo-red-kappa.vercel.app",
    github: "https://github.com/RISHII7/echo",
    detail: {
      role: "SOLO BUILD — FULL PLATFORM",
      timeline: "SHIPPED · ACTIVELY MAINTAINED",
      scope: ["Embeddable widget", "RAG pipeline", "Voice AI", "Operator dashboard", "Billing"],
      summary:
        "A multi-tenant SaaS: companies embed an AI support widget with a single script tag, upload their docs, and Echo answers customers around the clock — escalating to humans the moment it should.",
      pullquote: "No hallucinations: if the answer isn't in your knowledge base, a human gets the ticket.",
      body: [
        "Echo is three independently deployed apps in one Turborepo — the operator dashboard, the visitor widget, and a zero-dependency Vite loader that injects an organization-scoped iframe from a single script tag with a window.EchoWidget API.",
        "The support agent runs Gemini 2.5 Flash through Convex's agent framework with three autonomous tools: semantic search over the org's namespaced RAG embeddings, escalation on detected frustration, and resolution on confirmed satisfaction. Knowledge bases ingest PDF, CSV and TXT with content-hash deduplication — and answers are grounded exclusively in those documents.",
        "Voice support runs on Vapi with live transcripts and call controls, keys encrypted in AWS Secrets Manager. Operators get a realtime inbox with AI-drafted replies, full visitor context (device, browser, country, session history), and one-click human takeover. Multi-tenancy, billing and plan gating run on Clerk organizations; Sentry covers client, server and edge.",
      ],
    },
  },
  {
    number: "03",
    slug: "nodebase",
    title: "NODEBASE",
    category: "Automation Platform",
    description:
      "Visual drag-and-drop workflow automation — AI models, webhooks and integrations wired on an infinite canvas, no infrastructure to manage",
    tags: ["Next.js", "tRPC", "Inngest", "React Flow", "Prisma"],
    metrics: [
      { value: "10", label: "workflow node types" },
      { value: "16", label: "end-to-end type-safe endpoints" },
      { value: "18", label: "tagged releases via semver CI" },
    ],
    image: "/images/projects/nodebase.png",
    href: "https://nodebase-rho.vercel.app",
    github: "https://github.com/RISHII7/nodebase",
    detail: {
      role: "SOLO BUILD — FULL STACK",
      timeline: "SHIPPED · ACTIVELY MAINTAINED",
      scope: ["Visual editor", "Execution engine", "Credential security", "Billing", "Observability"],
      summary:
        "Design automation pipelines on a React Flow canvas — Stripe and Google Forms triggers, GPT/Claude/Gemini processors, Discord and Slack outputs — and watch every node light up live as Inngest executes the run.",
      pullquote: "Reliable, observable, secure automation — without owning a single server.",
      body: [
        "Nodebase's editor composes workflows from ten node types: manual and webhook triggers (Stripe, Google Forms), HTTP actions, three AI processors (OpenAI GPT-4, Anthropic Claude, Google Gemini), and messaging outputs to Discord and Slack. Execution streams node state transitions — loading, success, error — back to the canvas in real time over Inngest Realtime.",
        "The API layer is sixteen tRPC procedures with Zod validation for end-to-end type safety, backed by Prisma on Neon Postgres across nine data models. API credentials are AES-encrypted at rest and decrypted only at runtime; auth supports email plus GitHub and Google OAuth via Better Auth, with premium features gated through Polar.sh subscriptions.",
        "The repo runs like a product: 15 documentation files including architecture diagrams and ADRs, OWASP-mapped security notes, Sentry monitoring, Biome linting, and semantic-release CI that has cut eighteen tagged versions.",
      ],
    },
  },
];
