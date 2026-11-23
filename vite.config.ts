import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    contentCollections(),
    tailwindcss(),
    tanstackStart({
      // Static site: every route is prerendered to HTML at build time.
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        // Only crawl pages. Files like /resume.pdf are copied from public/
        // as-is; prerendering them would re-save the bytes as text.
        filter: ({ path }) => !/\.[a-z0-9]+$/i.test(path),
      },
    }),
    // React's plugin must come after TanStack Start's plugin.
    viteReact(),
  ],
});
