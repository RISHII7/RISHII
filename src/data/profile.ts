export const hero = {
  firstName: "RUSHIKESH",
  lastName: "PALANDE",
  role: "SOFTWARE ENGINEER",
  specialization: "FULL-STACK & AI-POWERED SYSTEMS",
  stat: "2 YEARS SHIPPING SAAS",
  location: "BASED IN PUNE / NOIDA, INDIA",
  availability: "OPEN TO REMOTE WORK",
  /**
   * Crops of the portrait photo (fractions of the source image).
   * photoCrop: face-focused — used on mobile.
   * photoCropFull: the whole subject head-to-waist — used on desktop.
   */
  photoCrop: { x: 0.16, y: 0.03, w: 0.4, h: 0.42 },
  photoCropFull: { x: 0.16, y: 0.03, w: 0.4, h: 0.42 },
} as const;

export const preloader = {
  lines: [
    "RUSHIKESH PALANDE",
    "SOFTWARE ENGINEER",
    "FULL-STACK · AI · SAAS",
    "PUNE / NOIDA → REMOTE",
  ],
  skipHint: "PRESS ANY KEY TO SKIP",
} as const;

export const about = {
  coords: "PUNE — 18°31′N 73°51′E",
  photo: "/images/rushikesh.jpg",
  photoAlt: "Rushikesh Palande",
  intro:
    "I engineer high-performance systems that scale without compromise. Currently architecting mission-critical Risk, Finance & Treasury platforms at Barclays. My expertise spans the absolute extremes of the technical stack—from ultra-fluid browser interfaces and highly concurrent cloud backends, all the way down to bare-metal embedded firmware. If it needs to be fast, scalable, and bulletproof, I build it.",
  resumeHref: "/resume.pdf",
} as const;
