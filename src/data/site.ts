export const site = {
  name: "Rushikesh Palande",
  handle: "RISHII7",
  url: "https://rushikeshpalande.com",
  email: "rishikeshx1006@gmail.com",
  linkedin: "https://www.linkedin.com/in/rushikesh07",
  github: "https://github.com/RISHII7",
  accentHex: "#c3fffc",
  year: 2026,
} as const;

export interface NavItem {
  number: string;
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { number: "01", label: "WORK", href: "#work" },
  { number: "02", label: "PROJECTS", href: "#projects" },
  { number: "03", label: "LAB", href: "#lab" },
  { number: "04", label: "ABOUT", href: "#about" },
  { number: "05", label: "CONTACT", href: "#contact" },
];
