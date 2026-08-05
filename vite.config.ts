import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { featuredWork } from "./src/data/featuredWork";
import { moreProjects } from "./src/data/moreProjects";
import { dataEngineering } from "./src/data/dataEngineering";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Derived from the data files so every case-study page is always
// statically prerendered — adding a project here never needs a second edit.
const prerenderRoutes = [
  "/",
  ...featuredWork.map((p) => `/work/${p.slug}`),
  ...moreProjects.map((p) => `/projects/${p.slug}`),
  ...dataEngineering.map((p) => `/data/${p.slug}`),
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
      additionalPrerenderRoutes: prerenderRoutes,
    }),
    {
      name: "force-exit-plugin",
      closeBundle() {
        // vite-prerender-plugin hangs the process after completion
        // Force exit to prevent CI/CD pipelines from timing out
        setTimeout(() => process.exit(0), 100);
      }
    }
  ],
});
