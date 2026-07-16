export interface Metric {
  value: string;
  label: string;
}

export interface FeaturedProject {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: Metric[];
  image?: string; // screenshot in /public/images/projects/; PlaceholderCover used when absent
  href?: string;
}

// PLACEHOLDER — awaiting user's project list.
// User explicitly said NOT to use night-code, Flowbrowse, or resume projects here.
export const featuredWork: FeaturedProject[] = [
  {
    number: "01",
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
  },
  {
    number: "02",
    title: "PROJECT TWO",
    category: "Placeholder",
    description: "Awaiting your pick",
    tags: ["Tech", "Stack"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
  },
  {
    number: "03",
    title: "PROJECT THREE",
    category: "Placeholder",
    description: "Awaiting your pick",
    tags: ["Tech", "Stack"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
  },
  {
    number: "04",
    title: "PROJECT FOUR",
    category: "Placeholder",
    description: "Awaiting your pick",
    tags: ["Tech", "Stack"],
    metrics: [
      { value: "—", label: "metric one" },
      { value: "—", label: "metric two" },
      { value: "—", label: "metric three" },
    ],
  },
];
