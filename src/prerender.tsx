import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { featuredWork } from "./data/featuredWork";
import { moreProjects } from "./data/moreProjects";

// vite-prerender-plugin defines these shapes internally but only re-exports
// PrerenderArguments/PrerenderResult from its public entry point — mirrored
// here to match what PrerenderResult['head'] expects.
interface HeadElement {
  type: string;
  props: Record<string, string>;
  children?: string;
}

interface Head {
  lang: string;
  title: string;
  elements: Set<HeadElement>;
}

const SITE_URL = "https://rishii-two.vercel.app";
const DEFAULT_TITLE = "Rushikesh Palande — Software Engineer · Full-Stack & AI Systems";
const DEFAULT_DESCRIPTION =
  "Rushikesh Palande is a Software Engineer in Pune/Noida, India building full-stack SaaS, real-time systems, and AI-powered applications. 2 years shipping SaaS. Open to remote work.";
const DEFAULT_OG_DESCRIPTION =
  "Software Engineer building full-stack SaaS, real-time systems, and AI-powered applications. 2 years shipping SaaS. Based in Pune/Noida, India — open to remote work.";
const DEFAULT_IMAGE = `${SITE_URL}/og.jpg`;
const DEFAULT_IMAGE_ALT =
  "Rushikesh Palande — Software Engineer portfolio hero showing name and specializations";

function meta(props: Record<string, string>): HeadElement {
  return { type: "meta", props };
}

/** Per-route head: title, description, canonical, OG and Twitter tags. */
function headFor(url: string): Partial<Head> {
  const path = url.split("?")[0].split("#")[0];

  const workMatch = path.match(/^\/work\/([^/]+)/);
  const projectMatch = path.match(/^\/projects\/([^/]+)/);
  const project = workMatch
    ? featuredWork.find((p) => p.slug === workMatch[1])
    : projectMatch
      ? moreProjects.find((p) => p.slug === projectMatch[1])
      : undefined;

  const canonical = project
    ? `${SITE_URL}/${workMatch ? "work" : "projects"}/${project.slug}`
    : `${SITE_URL}/`;

  const title = project
    ? `${project.title} — ${project.category} case study · Rushikesh Palande`
    : DEFAULT_TITLE;
  const description = project ? project.description : DEFAULT_DESCRIPTION;
  const ogDescription = project ? project.description : DEFAULT_OG_DESCRIPTION;
  const imageUrl = project?.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE;
  const imageAlt = project ? `${project.title} — screenshot` : DEFAULT_IMAGE_ALT;

  const elements = new Set<HeadElement>([
    meta({ name: "description", content: description }),
    { type: "link", props: { rel: "canonical", href: canonical } },
    meta({ property: "og:url", content: canonical }),
    meta({ property: "og:title", content: title }),
    meta({ property: "og:description", content: ogDescription }),
    meta({ property: "og:image", content: imageUrl }),
    meta({ property: "og:image:alt", content: imageAlt }),
    meta({ name: "twitter:title", content: title }),
    meta({ name: "twitter:description", content: ogDescription }),
    meta({ name: "twitter:image", content: imageUrl }),
    meta({ name: "twitter:image:alt", content: imageAlt }),
  ]);

  // Only the default og.jpg has known, fixed dimensions — declaring the
  // wrong width/height for a project screenshot can cause bad crops.
  if (!project) {
    elements.add(meta({ property: "og:image:width", content: "1200" }));
    elements.add(meta({ property: "og:image:height", content: "630" }));
    elements.add(meta({ property: "og:image:type", content: "image/jpeg" }));
  }

  return { lang: "en", title, elements };
}

/**
 * Pre-render entry point.
 * Called at build time by vite-prerender-plugin to generate static HTML
 * (and per-route <head> tags) for each route so search-engine crawlers and
 * social-media link-unfurl bots see real, route-correct content instead of
 * an empty <div id="root"></div> with generic homepage metadata.
 */
export async function prerender(data: { url: string }) {
  const html = renderToString(
    <StaticRouter location={data.url}>
      <App />
    </StaticRouter>,
  );

  return {
    html,
    head: headFor(data.url),
    // Let the crawler discover linked routes automatically
    links: new Set<string>(),
  };
}
