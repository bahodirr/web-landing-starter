import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // site: "https://example.com",
  output: "static",
  // integrations: [sitemap()],
  server: {
    port: 3000, // Change this to your desired port
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
});

