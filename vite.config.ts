import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
      additionalPrerenderRoutes: [
        "/",
        "/work/ghost-ai",
        "/work/echo",
        "/work/nodebase",
        "/projects/roomify",
        "/projects/nimbus",
        "/projects/apple-macbook",
        "/projects/sendkit",
        "/projects/zenbrew",
        "/projects/fizzie",
      ],
    }),
  ],
});
