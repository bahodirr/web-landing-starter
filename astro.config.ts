import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // site: "https://example.com",
  output: "static",
  outDir: "./dist/client",
  // integrations: [sitemap()],
  server: {
    host: true,
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss() as any],
    server: {
      host: true,
    },
  },
});

