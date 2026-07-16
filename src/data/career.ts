export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
}

export interface EducationItem {
  title: string;
  school: string;
  period: string;
}

export interface Foundation {
  number: string;
  title: string;
  description: string;
}

export interface Competency {
  icon: "eye" | "layers" | "gauge" | "monitor" | "cpu";
  label: string;
}

export interface Tool {
  slug: string; // simple-icons slug
  name: string;
  role: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "BARCLAYS",
    role: "SOFTWARE ENGINEER — RISK, FINANCE & TREASURY",
    period: "[2026–]",
  },
  {
    company: "EMBED SQUARE",
    role: "SOFTWARE DEVELOPER",
    period: "[2025-2026]",
  },
  {
    company: "HAMSA HITECH",
    role: "FULL-STACK DEVELOPER INTERN",
    period: "[2023-2024]",
  },
];

export const education: EducationItem[] = [
  {
    title: "MCA · COMPUTER APPLICATIONS",
    school: "Jaywantrao Sawant College of Engineering, Pune",
    period: "[2024]",
  },
  {
    title: "BSC · COMPUTER SCIENCE",
    school: "Modern College, Pune",
    period: "[2022]",
  },
];

export const foundations: Foundation[] = [
  {
    number: "01",
    title: "SHIP END-TO-END",
    description: "Browser to backend to firmware — one owner.",
  },
  {
    number: "02",
    title: "REAL-TIME FIRST",
    description: "Live data beats refresh buttons, every time.",
  },
  {
    number: "03",
    title: "SYSTEMS OVER SCREENS",
    description: "Pipelines and contracts, not just pages.",
  },
  {
    number: "04",
    title: "FORGED IN PRODUCTION",
    description: "Built for clients who run it every day.",
  },
];

export const competencies: Competency[] = [
  { icon: "layers", label: "FULL-STACK ENGINEERING" },
  { icon: "gauge", label: "REAL-TIME SYSTEMS" },
  { icon: "eye", label: "AI AGENTS & LLM APPS" },
  { icon: "cpu", label: "IOT & EMBEDDED INTEGRATION" },
  { icon: "monitor", label: "CLOUD & DEVOPS" },
];

export const toolkit: Tool[] = [
  { slug: "react", name: "REACT", role: "FRONTEND" },
  { slug: "nodedotjs", name: "NODE.JS", role: "BACKEND" },
  { slug: "typescript", name: "TYPESCRIPT", role: "LANGUAGE" },
  { slug: "python", name: "PYTHON", role: "LANGUAGE / DATA" },
  { slug: "postgresql", name: "POSTGRESQL", role: "DATABASE" },
  { slug: "docker", name: "DOCKER", role: "DEPLOYMENT" },
  { slug: "claude", name: "CLAUDE", role: "AI DEVELOPMENT" },
  { slug: "linux", name: "LINUX", role: "ENVIRONMENT" },
];

/** Off-white marquee band under the hero. */
export const techBand = {
  caption: "SOME OF THE TECHNOLOGIES I WORK WITH",
  slugs: [
    "react",
    "nextdotjs",
    "typescript",
    "nodedotjs",
    "python",
    "postgresql",
    "mongodb",
    "docker",
    "tailwindcss",
    "linux",
  ],
} as const;
