# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 20 frontend for [techinterview.space](https://techinterview.space) - a platform for interview management, salary data analysis, and company reviews. Uses Server-Side Rendering (SSR) for SEO and social sharing.

## Build & Test Commands

```bash
npm install                          # Install dependencies
npm start                            # Dev server at http://localhost:4200
npm run build                        # Production build with SSR
npm run serve:ssr:interviewer        # Build + run SSR server at http://localhost:4000
npm test                             # Run tests (uses ChromiumNoSandbox via Puppeteer)
npm run lint                         # ESLint
npm run pretty-all                   # Prettier on all files
npm run bundle:analyze               # Webpack bundle analyzer
```

Docker:
```bash
docker build -t techinterview-frontend .
docker run -p 8080:4000 techinterview-frontend
```

## Architecture

### Directory Structure
```
src/app/
├── components/     # Global components (navbar, admin-navbar, maintenance)
├── models/         # TypeScript interfaces and enums
├── modules/        # Feature modules (lazy-loaded)
│   ├── admin/      # Admin panel
│   ├── companies/  # Company reviews
│   ├── home/       # Landing, auth callbacks, about pages
│   ├── interviews/ # Interview templates and sessions
│   ├── salaries/   # Salary charts and surveys
│   └── users/      # User profiles
├── services/       # API clients (exported via index.ts barrel)
└── shared/         # Reusable components, directives, guards, interceptors
```

### Path Aliases (tsconfig.json)
- `@app/*` → `app/*`
- `@components/*` → `src/app/components/*`
- `@environments/*` → `src/environments/*`
- `@shared/*` → `src/app/shared/*`
- `@models/*` → `src/app/models/*`
- `@modules/*` → `src/app/modules/*`
- `@services/*` → `src/app/services/*`

### SSR Configuration
Hybrid SSR/SPA approach configured in `src/app/app.routes.server.ts`:
- **SSR (RenderMode.Server)**: Home, companies, about pages - for SEO/meta tags
- **SPA (RenderMode.Client)**: Admin, salaries, interviews, auth callbacks - no SSR needed

Key SSR files:
- `src/server.ts` - Express.js SSR server
- `src/main.server.ts` - Server-side Angular bootstrap
- `src/app/app.module.server.ts` - Server-specific module with Auth0 mock
- `src/app/services/meta-tags.service.ts` - Dynamic meta tag management

### HTTP Interceptors (order matters)
1. `AuthInterceptor` - Adds Auth0 bearer token
2. `SpinnerInterceptor` - Shows loading spinner
3. `DateParserInterceptor` - Parses date strings from API

### Guards
- `AuthGuard` - Requires authenticated user
- `AdminGuard` - Requires admin role
- `ActiveUserGuard` - Requires active (non-banned) user

## Code Style

Follow `.eslintrc.js`:
- Component selectors: `app-kebab-case`
- Directive selectors: `appCamelCase`
- Unused variables: prefix with `_`

## Design System

**IMPORTANT:** When developing UI components, blocks, or pages, follow the design guidelines in `/docs/DESIGN_GUIDELINE.md`.

Key requirements:
- **Always use CSS variables** for colors (e.g., `var(--warm-bg-primary)`, `var(--warm-text-primary)`)
- **Never hardcode colors** - all colors must come from the warm theme system
- **Use SCSS variables** for spacing (`$space-*`), border-radius (`$radius-*`), and shadows (`$shadow-*`)
- **Use theme fonts**: Lora for headings, Nunito for body text, JetBrains Mono for code
- **Support dark mode** - components must work in both light and dark modes
- **Follow component SCSS structure** with section dividers and `:host { display: block; }`

Reference files:
- `src/_warm-theme.scss` - All CSS custom properties and SCSS variables
- `src/styles.scss` - Global styles and utility classes
- `docs/DESIGN_GUIDELINE.md` - Complete design system documentation

## Testing

Jasmine/Karma with ChromiumNoSandbox (Puppeteer). Test files colocated with components (`*.spec.ts`).

Test utilities in `src/app/shared/test-utils/`.

## Key Patterns

### Services
All application services are registered in `src/app/services/index.ts` and provided in `AppModule`.

### Shared Module
Reusable components, directives, and pipes are declared/exported in `src/app/shared/shared.module.ts`.

### Environment Configuration
- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production
- `src/environments/environment.staging.ts` - Staging

## Dependencies

- Auth: Auth0 (`@auth0/auth0-angular`)
- UI: Bootstrap 5, Bootstrap Icons
- Charts: Chart.js, `@sgratzl/chartjs-chart-boxplot`
- Markdown: `ngx-markdown` with Prism.js syntax highlighting
- Analytics: `ngx-google-analytics`
- Forms: `@ng-select/ng-select` for dropdowns
