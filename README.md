# TechInterview.space

Frontend part of the [Techinterview.space](https://techinterview.space)

## Subdocs

- [Changelog](CHANGELOG.md)
- [License](LICENSE)
- [Design Guideline](docs/DESIGN_GUIDELINE.md)
- [SSR & Deployment Guide](docs/SSR_DEPLOYMENT.md)
- [SEO & GEO](docs/geo.md)

## Tech stack

- Angular 20
- Angular SSR (Server-Side Rendering)
- Express.js (SSR server)
- Docker

## How to run locally

### Development (SPA mode)

```sh
npm install
npm start
```

Opens at `http://localhost:4200`

### With SSR

```sh
npm install
npm run build
npm run serve:ssr:interviewer
```

Opens at `http://localhost:4000`

## Docker

```sh
# Build
docker build -t techinterview-frontend .

# Run
docker run -p 8080:4000 techinterview-frontend
```

Opens at `http://localhost:8080`

## Design System

This project uses the **Warm & Friendly** design theme - a carefully crafted visual system optimized for readability and comfort during extended reading sessions.

### Key Features

- **Warm color palette**: Paper-like backgrounds (`#fffbf7`) with terracotta (`#e07a5f`) and sage (`#81b29a`) accents
- **Dark mode support**: Full light/dark theme switching with system preference detection
- **Typography**: Lora (serif) for headings, Nunito (sans-serif) for body text
- **Soft shadows**: Warm-tinted layered shadows for natural depth
- **Accessibility**: WCAG AA compliant color contrasts

### Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Terracotta | `#e07a5f` | Primary accent, buttons, links |
| Sage | `#81b29a` | Secondary accent, success states |
| Gold | `#f2cc8f` | Highlights, warnings |
| Orange | `#f4a261` | CTAs, attention elements |

For complete design documentation, see [DESIGN_GUIDELINE.md](docs/DESIGN_GUIDELINE.md).

## Documentation

- [Design Guideline](docs/DESIGN_GUIDELINE.md) - Complete design system documentation (colors, typography, components)
- [SSR & Deployment Guide](docs/SSR_DEPLOYMENT.md) - Detailed SSR implementation and deployment documentation
- [SEO & GEO](docs/geo.md) - Generative Engine Optimization: JSON-LD structured data, meta tags, canonical URLs, dynamic sitemap, and AI bot discoverability
