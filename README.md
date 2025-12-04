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
├── astro.config.ts
├── package.json
└── tsconfig.json
```

## ✨ Features

- **Tailwind CSS v4** - Utility-first styling
- **Zero JavaScript** by default - ships only what you need
- **Design System Tokens** - HSL colors, consistent spacing, radius, and shadows
- **Modern design** with DM Sans & Instrument Serif typography
- **Fully responsive** - looks great on all devices
- **SEO ready** - semantic HTML and meta tags included
- **TypeScript** support out of the box
- **Component-based** - Reusable Header, Footer, Layout

## 🎨 Customization

### Design System

Edit the theme in `src/styles/global.css`. The system uses HSL-based semantic tokens for easy theming and dark mode support.

```css
@theme {
  /* Colors */
  --color-ink: #1a1a1a;
  --color-paper: #ffffff;
  --color-accent: #ff3c00;
  --color-border: #e5e5e5;
  
  /* Typography */
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-serif: 'Instrument Serif', Georgia, serif;
  
  /* UI Properties */
  --radius: 0; /* 0 for sharp/brutalist, 0.5rem for rounded */
}
```

### Adding Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="My Page">
  <section class="container py-12">
    <div class="card p-8">
      <h1 class="section-title">Hello!</h1>
    </div>
  </section>
</Layout>
```

Then add it to the nav in `src/components/Header.astro`.

### Fonts

Modify the Google Fonts `<link>` in `src/layouts/Layout.astro`.

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)
