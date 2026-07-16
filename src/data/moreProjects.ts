export interface MoreProject {
  number: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

// PLACEHOLDER — awaiting user's project list (6 slots).
export const moreProjects: MoreProject[] = Array.from({ length: 6 }, (_, i) => ({
  number: String(i + 1).padStart(3, "0"),
  title: `PROJECT ${["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"][i]}`,
  description: "Awaiting your pick — this card will show one of your builds",
  tags: ["TECH", "STACK"],
}));
