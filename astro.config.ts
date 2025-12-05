import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  outDir: "./dist/client",
  // site: "https://example.com",
  // integrations: [sitemap()],
  server: {
    port: 3000, // Change this to your desired port
  },
  vite: {
    plugins: [tailwindcss() as any],
    server: {
      watch: {
        usePolling: true,
        interval: 100, // Check every 100ms
      },
    },
  },
});

