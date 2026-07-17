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
  image?: string; // screenshot in /public/images/projects/; PlaceholderCover used when absent
  href?: string; // live demo / repo
  detail: {
    role: string;
    timeline: string;
    scope: string[];
    summary: string;
    pullquote: string;
    body: string[];
  };
}

const placeholderDetail = (n: string): FeaturedProject["detail"] => ({
  role: "FULL-STACK ENGINEER",
  timeline: "AWAITING DETAILS",
  scope: ["Architecture", "Frontend", "Backend", "Deployment"],
  summary: `Placeholder case study for project ${n} — the full write-up lands once the owner picks the project.`,
  pullquote: "Real outcome, real constraints — the write-up follows the pick.",
  body: [
    "This detail page is fully built and waiting for content. When the project is chosen, this section carries the problem, the constraints, and what shipping it actually took.",
    "Architecture decisions, trade-offs, and the production story go here — written from the repository and the owner's notes.",
  ],
});

// PLACEHOLDER — awaiting user's project list.
// User explicitly said NOT to use night-code, Flowbrowse, or resume projects here.
export const featuredWork: FeaturedProject[] = [
  {
    number: "01",
    slug: "project-one",
    title: "PROJECT ONE",
    category: "Placeholder",
    description:
      "Awaiting your pick — tell me which project goes here and I'll write the copy",
    tags: ["Tech", "Stack", "Here"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
    detail: placeholderDetail("01"),
  },
  {
    number: "02",
    slug: "project-two",
    title: "PROJECT TWO",
    category: "Placeholder",
    description: "Awaiting your pick",
    tags: ["Tech", "Stack"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
    detail: placeholderDetail("02"),
  },
  {
    number: "03",
    slug: "project-three",
    title: "PROJECT THREE",
    category: "Placeholder",
    description: "Awaiting your pick",
    tags: ["Tech", "Stack"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
    detail: placeholderDetail("03"),
  },
  {
    number: "04",
    slug: "project-four",
    title: "PROJECT FOUR",
    category: "Placeholder",
    description: "Awaiting your pick",
    tags: ["Tech", "Stack"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
    detail: placeholderDetail("04"),
  },
];
