# Domain

What this app is, who uses it, and the workflows it supports. Implementation lives in `src/app/modules/`; backend logic and persistence are in the sibling `web-api/` repository — this doc describes only what the frontend mediates.

The product is **techinterview.space** — a Russian-language platform aimed at IT workers in Kazakhstan and the surrounding region. The frontend mediates four user-visible feature areas plus an admin console.

The audience and tone of the site are reflected in the static meta tags (`src/index.html`) and the default meta-tag content set by `MetaTagService.returnDefaultMetaTags()` in `src/app/services/meta-tags.service.ts`: salary statistics and company reviews in IT, in Russian.

## Feature areas

Each area is a lazy-loaded NgModule under `src/app/modules/<area>/`, with its leaf components in `<area>/components/` and its routes in `<area>-routing.module.ts`.

### Salaries (`/salaries`)

User-submitted salary surveys aggregated into charts and statistics.

Module: `src/app/modules/salaries/`. Top-level service: `src/app/services/user-salaries.service.ts`. Survey form service: `salaries-survey.service.ts`. Historical data: `historical-charts.service.ts`.

Two coexisting entry points:

- `/salaries` — interactive Chart.js dashboards, requires the user to have submitted a salary themselves (gating done backend-side).
- `/salaries/overview` — public, server-rendered, plain-HTML alternative for crawlers and AI bots. Same chart data exposed via `?allowReadonly=true`. See [geo.md](geo.md) for why this exists.

### Companies (`/companies`)

User-written reviews of employers, with rating, ratings breakdown, and moderation.

Module: `src/app/modules/companies/`. Top-level service: `companies.service.ts`. Resolvers in `companies/resolvers/` fetch company data before route activation so SSR meta tags can be set in time.

Public pages (`/companies`, `/companies/:id`, `/companies/recent-reviews`) are server-rendered. `MetaTagService.setCompanyMetaTags()` writes per-company `og:*`, `twitter:*`, and canonical URL on each request.

### Interviews (`/interviews`)

Interview templates (question banks) and recorded interview sessions.

Module: `src/app/modules/interviews/`. Services: `interview-templates.service.ts`, `interviews.service.ts`. Public listing at `/interviews/templates/public` is server-rendered for SEO; everything else is authenticated SPA.

### Surveys (`/surveys`)

Public, slug-addressable survey pages. Authors create surveys; respondents submit replies anonymously.

Module: `src/app/modules/surveys/`. Service: `public-surveys.service.ts`. Slug pages (`/surveys/:slug`) are server-rendered for social-share previews; `/surveys/new` and `/surveys/my-surveys` are SPA.

### Users / Account (`/users`, `/me`)

Public user profiles and authenticated account self-service.

Module: `src/app/modules/users/`. Account-relevant pieces under the `home` module's `me/` component (account dashboard) and `unsubscribe-me/` (one-click email-unsubscribe via tokenised URL).

### Home (`/`)

Composite landing module that also owns auth-adjacent and standalone pages: login, registration, password reset, email verification, OAuth callbacks, privacy policy, about pages, the design-system showcase, and the various error views (`not-found`, `not-authorized`, `no-permission`, `server-unavailable`).

Module: `src/app/modules/home/`.

### Admin

Internal console for moderation, content management, and integrations.

Module: `src/app/modules/admin/`, gated by `AuthGuard` + `AdminGuard` at the root router. Areas inside admin:

- Users, companies, company-review approval, surveys
- Salary admin, "not-in-stats" salaries, sourced/imported salaries, historical-data templates
- Interview-template moderation
- OpenAI prompt management
- Telegram integrations: user settings, bot configurations, stat-data subscriptions, review-stat subscriptions, job-posting subscriptions
- GitHub integrations: profiles, chats, processing jobs
- M2M (machine-to-machine) clients: list, create, detail
- Channel stats, label entities (skills, work industries, professions)
- Tools: background jobs, currencies, QR-code generation, send-email

The exact route table is in `src/app/modules/admin/admin-routing.module.ts` — keep it as the source of truth, not this doc.

## Cross-cutting domain concepts

### Authentication identity

`ApplicationUser` (`src/app/models/application-user.ts`) is the canonical user shape returned from `GET /api/account/me`. It is wrapped in `ApplicationUserExtended` (`src/app/models/extended/`) which adds derived helpers (e.g., `hasRole(UserRole)`).

`UserRole` is defined in `src/app/models/enums/`. Role-gated behaviour goes through `RoleGuardBase` (route-level) or the `appHasRole` directive (template-level).

For the auth flow itself, see [authentication.md](authentication.md).

### Maintenance mode

`environment.isUnderMaintenance` flips the root router (`src/app/app-routing.module.ts`) so every URL redirects to `/maintenance`. To enable, set the flag in the relevant `environment*.ts` and rebuild.

### Anti-bot signals on auth forms

Login and registration forms send two anti-bot signals to the backend:

- `website` — a honeypot input hidden via the global `.form-field-extra` class. Real users never see it; bots auto-fill it.
- `formDurationSeconds` — elapsed time since the form mounted, recorded in `ngOnInit` (browser only — guarded with `isPlatformBrowser` because `Date.now()` is measured for human-vs-bot heuristics).

See `LoginPageComponent` and `RegisterPageComponent` in `src/app/modules/home/components/`.

### Content language

The app is Russian-facing. UI strings in components and meta tags are in Russian; identifier names, code comments, and these docs are in English. When adding user-facing copy, match the surrounding component.

### Static SEO scaffolding

`src/index.html` carries baseline `og:*`, `twitter:*`, and JSON-LD blocks. Page-specific overrides come from `MetaTagService` (run during SSR via resolvers) and `JsonLdService`. Server-rendered routes are the only ones that benefit; for SPA routes the static fallback in `index.html` is what crawlers see.

For the full SEO/GEO strategy, see [geo.md](geo.md).
