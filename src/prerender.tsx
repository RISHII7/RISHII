import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

/**
 * Pre-render entry point.
 * Called at build time by vite-prerender-plugin to generate static HTML
 * for each route so search-engine crawlers see real content instead of
 * an empty <div id="root"></div>.
 */
export async function prerender(data: { url: string }) {
  const html = renderToString(
    <StaticRouter location={data.url}>
      <App />
    </StaticRouter>,
  );

  // Return the HTML and any links the crawler should follow
  return {
    html,
    // Let the crawler discover linked routes automatically
    links: new Set<string>(),
  };
}
