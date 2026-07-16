export interface MoreProject {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

// PLACEHOLDER — awaiting user's project list (6 slots).
export const moreProjects: MoreProject[] = Array.from({ length: 6 }, (_, i) => ({
  title: `PROJECT ${i + 1}`,
  description: "Awaiting your pick — this card will show a build of yours",
  tags: ["Tech", "Stack"],
}));
