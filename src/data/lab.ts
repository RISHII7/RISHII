export interface LabProject {
  name: string;
  tags: string[];
  description: string;
  href: string;
}

export const lab: LabProject[] = [
  {
    name: "ECHO",
    tags: ["TypeScript", "Next.js", "AI Agent", "Convex"],
    description: "AI-powered customer support platform. RAG-grounded agent with real-time dashboard & Vapi voice.",
    href: "https://github.com/RISHII7/echo",
  },
  {
    name: "FLOWBROWSE",
    tags: ["TypeScript", "Automation"],
    description: "Open-source browser automation and workflow engine.",
    href: "https://github.com/RISHII7/Flowbrowse",
  },
  {
    name: "NIGHT-CODE",
    tags: ["TypeScript", "Utilities"],
    description: "A collection of late-night coding experiments and experimental scripts.",
    href: "https://github.com/RISHII7/night-code",
  },
];
