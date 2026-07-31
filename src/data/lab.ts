export interface LabProject {
  name: string;
  tags: string[];
  description: string;
  href: string;
}

export const lab: LabProject[] = [
  {
    name: "NIGHT-CODE",
    tags: ["TypeScript", "Bun", "AI Agent", "CLI"],
    description:
      "Terminal-native AI coding agent running on NVIDIA's free models — PLAN/BUILD modes, sandboxed file ops, persistent sessions. Zero API cost for students and solo builders.",
    href: "https://github.com/RISHII7/night-code",
  },
];

export const labFooterLink = {
  label: "ALL CODE · GITHUB.COM/RISHII7",
  href: "https://github.com/RISHII7?tab=repositories",
} as const;
