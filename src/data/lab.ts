export interface LabProject {
  name: string;
  tags: string[];
  description: string;
  href: string;
}

// PLACEHOLDER — awaiting user's project list (3 slots).
export const lab: LabProject[] = [
  {
    name: "EXPERIMENT-ONE",
    tags: ["TypeScript"],
    description: "Awaiting your pick — an open-source build goes here",
    href: "https://github.com/RISHII7",
  },
  {
    name: "EXPERIMENT-TWO",
    tags: ["TypeScript"],
    description: "Awaiting your pick",
    href: "https://github.com/RISHII7",
  },
  {
    name: "EXPERIMENT-THREE",
    tags: ["Python"],
    description: "Awaiting your pick",
    href: "https://github.com/RISHII7",
  },
];

export const labFooterLink = {
  label: "ALL CODE · GITHUB.COM/RISHII7",
  href: "https://github.com/RISHII7?tab=repositories",
} as const;
