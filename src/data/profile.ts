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
    "Software engineer working across financial technology, full-stack SaaS, real-time systems, and embedded hardware. Currently in Risk, Finance & Treasury at Barclays — before that, shipping production systems end to end: browser to backend to firmware.",
  resumeHref: "/resume.pdf",
} as const;
