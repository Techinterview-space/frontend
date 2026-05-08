# TechInterview.space

Frontend part of the [Techinterview.space](https://techinterview.space)

See [Documentation](#documentation) below for the full doc index. Also: [Changelog](CHANGELOG.md), [License](LICENSE).

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

Engineering docs (this prompt's set):

- [AGENTS.md](AGENTS.md) - Critical context for AI assistants and contributors
- [CLAUDE.md](CLAUDE.md) - Conventions, build commands, and AI-assistant guardrails
- [docs/architecture.md](docs/architecture.md) - Module layout, SSR boundary, HTTP pipeline
- [docs/domain.md](docs/domain.md) - Feature areas and domain workflows
- [docs/authentication.md](docs/authentication.md) - JWT + refresh-token flow, OAuth, guards, interceptor
- [docs/interactions.md](docs/interactions.md) - Backend API, OAuth providers, CDN, analytics
- [docs/testing.md](docs/testing.md) - Karma + Jasmine setup, test utilities, CI gate
- [docs/gotchas.md](docs/gotchas.md) - Non-obvious traps; check before debugging

Topic guides:

- [docs/DESIGN_GUIDELINE.md](docs/DESIGN_GUIDELINE.md) - Warm-theme design system: colors, typography, components
- [docs/SSR_DEPLOYMENT.md](docs/SSR_DEPLOYMENT.md) - Hybrid SSR/SPA implementation and Docker deployment
- [docs/geo.md](docs/geo.md) - Generative Engine Optimization: JSON-LD, meta tags, sitemap, AI-bot discoverability
