# Web Landing Starter

A minimal, fast, and elegant Astro + Tailwind CSS starter template for landing pages.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## ✨ Features

- **Tailwind CSS v4** - Utility-first styling
- **Zero JavaScript** by default - ships only what you need
- **Modern design** with DM Sans & Instrument Serif typography
- **Fully responsive** - looks great on all devices
- **SEO ready** - semantic HTML and meta tags included
- **TypeScript** support out of the box
- **Component-based** - Reusable Header, Footer, Layout

## 🎨 Customization

### Theme Colors

Edit the theme in `src/styles/global.css`:

```css
@theme {
  --color-ink: #0f0f0f;
  --color-paper: #fafaf8;
  --color-accent: #e63946;
  --color-muted: #6b6b6b;
}
```

### Adding Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="My Page">
  <h1 class="text-4xl font-bold">Hello!</h1>
</Layout>
```

Then add it to the nav in `src/components/Header.astro`.

### Fonts

Modify the Google Fonts `<link>` in `src/layouts/Layout.astro`.

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)

