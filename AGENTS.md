# AGENTS.md

> **CRITICAL CONTEXT ANCHOR**
>
> This is the **frontend** of techinterview.space — an Angular 20 SPA with hybrid SSR served by Express. It calls a separate .NET backend over HTTPS; this repo does **not** contain backend code.
>
> Before changing anything, you must know:
>
> 1. **NgModule architecture, not standalone.** Components, directives, and pipes are declared in feature modules or `SharedModule`. Do not generate standalone components.
> 2. **`npm start` hits production.** It points at `https://api.techinterview.space`. Use `npm run start:local` to develop against `https://localhost:5001`.
> 3. **Two render boundaries.** Some routes are SSR (`RenderMode.Server`), some are SPA (`RenderMode.Client`). See `src/app/app.routes.server.ts`. Code that touches `window`/`document`/`localStorage` must guard with `isPlatformBrowser` or use the mocks in `src/ssr-polyfills.ts`.
> 4. **Custom `untilDestroyed`.** It is homegrown (`src/app/shared/subscriptions/until-destroyed.ts`), not `@ngneat/until-destroy`. Any component using it **must** declare `ngOnDestroy()`, even if empty, or it throws at runtime.
> 5. **Theme is mandatory.** Hardcoded colors are forbidden. Use CSS variables from `src/_warm-theme.scss` and SCSS variables for spacing/radius/shadows. Components must work in both light and dark modes.

This file is the source of truth for contributor and AI-assistant guidance. `CLAUDE.md` is a pointer that loads this file.

## What this repo is

Angular 20 frontend for [techinterview.space](https://techinterview.space) — a platform for IT salary surveys, company reviews, interview templates, and admin tooling. Renders some routes server-side (Express + `@angular/ssr`) for SEO and social-share previews, and the rest client-side as a normal SPA.

The `web-api/` sibling directory in the parent workspace is the backend. This repo only consumes its HTTP API.

## Where to start

| You want to… | Read first |
|---|---|
| Understand the module layout | [docs/architecture.md](docs/architecture.md) |
| Know what the app actually does (features, workflows) | [docs/domain.md](docs/domain.md) |
| Touch login, tokens, guards, OAuth | [docs/authentication.md](docs/authentication.md) |
| Add a third-party call or change CSP | [docs/interactions.md](docs/interactions.md) |
| Write or run tests | [docs/testing.md](docs/testing.md) |
| Get unstuck on a weird bug | [docs/gotchas.md](docs/gotchas.md) |
| Style anything visible | [docs/DESIGN_GUIDELINE.md](docs/DESIGN_GUIDELINE.md) |
| Add an SSR-rendered route or fix a hydration error | [docs/SSR_DEPLOYMENT.md](docs/SSR_DEPLOYMENT.md) |
| Add structured data, meta tags, or AI-bot discoverability | [docs/geo.md](docs/geo.md) |

## Build & test commands

```sh
npm install
npm run start:local              # dev against local backend (https://localhost:5001)
npm start                        # dev against PRODUCTION backend (use deliberately)
npm run build                    # production build (browser + server bundles)
npm run serve:ssr:interviewer    # build + run SSR server on http://localhost:4000
npm test                         # tests in watch mode (ChromiumNoSandbox via Puppeteer)
npm run test-headless-ci-only    # full test run, no watch (CI gate)
npm run lint
npm run pretty-all
npm run bundle:analyze
```

Docker:

```sh
docker build -t techinterview-frontend .
docker run -p 8080:4000 techinterview-frontend
```

Husky runs `pretty-quick --staged` on commit.

## Conventions

- **Path aliases** (`tsconfig.json`): `@app/*`, `@components/*`, `@environments/*`, `@shared/*`, `@models/*`, `@modules/*`, `@services/*`. Prefer aliases over relative `../../` chains.
- **Selector style** (ESLint enforced via `.eslintrc.js`): components `app-kebab-case`, attribute directives `appCamelCase`. Unused identifiers prefixed with `_`.
- **SCSS imports** can use `@use 'warm-theme'` because `angular.json` sets `stylePreprocessorOptions.includePaths: ["src"]`.
- **HTTP pipeline** is DI-registered in `AppModule` (`AuthInterceptor` → `SpinnerInterceptor` → `DateParserInterceptor`). Order matters; see [docs/architecture.md](docs/architecture.md).
- **Application services** live in `src/app/services/`, are exported through `services/index.ts`, and are provided by the `applicationServices` array in `AppModule`. Add new top-level services there.

## Hard rules

- **Plan before editing.** Before writing any code, summarize in 3-5 bullet points exactly what you will change and what you will NOT change. Wait for confirmation before proceeding.
- **Confirm UI references.** When the user names a button, view, or screen, ask which component before editing.
- **Run the full test suite** after touching code that has tests: `npm run test-headless-ci-only`. Don't run a single spec and report done.
- **Grep on renames.** For renames or signature changes, grep for ALL references across `src/` (including `*.spec.ts`) before reporting the change is complete.
- **No new dependencies** without explicit approval. Production has hard size budgets in `angular.json` (`initial: 3 mb error`, `anyComponentStyle: 6 kb error`).
- **Conventional commits** (`feat:`, `fix:`, `chore:`, …). Do not co-author yourself in commit messages.
- **macOS / zsh.** Don't suggest Linux-only commands.

## Documentation maintenance (mandatory)

When you add a feature, change architecture, add/remove a third-party integration, change auth or routes, add a new module, or introduce a new feature area, update the relevant docs in the **same change**:

| Change | Update |
|---|---|
| New/changed third-party API call, analytics or CDN script, or any change to CSP / outbound endpoint allowlist | [`docs/interactions.md`](docs/interactions.md) |
| New feature module, top-level route, HTTP interceptor, application service in `src/app/services/`, or change to `AppModule` DI wiring | [`docs/architecture.md`](docs/architecture.md) |
| New user-visible feature area or workflow, renamed feature module | [`docs/domain.md`](docs/domain.md) |
| New OAuth provider, change to the JWT / refresh-token flow, `AuthInterceptor`, route guard, or login/logout UX | [`docs/authentication.md`](docs/authentication.md) |
| New shared test helper, fake, or fixture under `src/app/shared/test-utils/`, or change to the Karma / Puppeteer setup | [`docs/testing.md`](docs/testing.md) |
| New non-obvious constraint, SSR trap, hydration pitfall, or `untilDestroyed` requirement worth warning about | [`docs/gotchas.md`](docs/gotchas.md) |
| New SSR-rendered route, change to `src/app/app.routes.server.ts`, or change to the Express / `@angular/ssr` bootstrap | [`docs/SSR_DEPLOYMENT.md`](docs/SSR_DEPLOYMENT.md) |
| New theme token, color / spacing / typography rule, or change to `src/_warm-theme.scss` | [`docs/DESIGN_GUIDELINE.md`](docs/DESIGN_GUIDELINE.md) |
| New structured-data schema, meta-tag rule, sitemap entry, or AI-bot discoverability change | [`docs/geo.md`](docs/geo.md) |
| New env var, environment file under `src/environments/`, or change to an `npm` script / quickstart | [`README.md`](README.md) |

If you are unsure whether a doc update is needed, re-read the relevant section of [`docs/architecture.md`](docs/architecture.md) and the CRITICAL CONTEXT ANCHOR at the top of this file. Do not leave `docs/` in a stale state after a feature PR.

## Design system

Follow the design guidelines in [docs/DESIGN_GUIDELINE.md](docs/DESIGN_GUIDELINE.md). Hard requirements:

- **Always use CSS variables** for colors (e.g., `var(--warm-bg-primary)`, `var(--warm-text-primary)`).
- **Never hardcode colors** — they must come from the warm-theme system in `src/_warm-theme.scss`.
- **Use SCSS variables** for spacing (`$space-*`), border-radius (`$radius-*`), and shadows (`$shadow-*`).
- **Use theme fonts**: Lora for headings, Nunito for body text, JetBrains Mono for code.
- **Support dark mode** — components must work in both light and dark modes.
- **Component SCSS** uses section dividers and `:host { display: block; }`.

Reference files: `src/_warm-theme.scss`, `src/styles.scss`.

## Authentication

Custom JWT + refresh-token flow with Google and GitHub OAuth. The pipeline depends on a refresh-deduplication invariant in `AuthInterceptor`. Read [docs/authentication.md](docs/authentication.md) before editing anything in `src/app/shared/services/auth/` or `src/app/shared/interceptors/auth-interceptor.ts`.

## Testing

Karma + Jasmine running in headless Chromium via Puppeteer. Test files colocated with their subject as `*.spec.ts`. Shared helpers in `src/app/shared/test-utils/`. Full setup, patterns, and CI gate in [docs/testing.md](docs/testing.md).

## Environments

Per-environment files in `src/environments/`. The `local` configuration replaces `environment.ts` with `environment.local.ts` to point at `https://localhost:5001` (see `angular.json` → `architect.build.configurations.local.fileReplacements`).

## Gotchas

The full list lives in [docs/gotchas.md](docs/gotchas.md). The two that bite most often:

- **`npm start` hits the live API.** Use `npm run start:local` (or `ng serve --configuration=local`) for the local backend.
- **NgModule, not standalone.** All new components must be declared in a feature module or `SharedModule`.

## Dependencies

Listed in `package.json`. Notable runtime: Angular 20, Bootstrap 5, Chart.js + boxplot plugin, ngx-markdown + Prism.js, ngx-google-analytics, ng-select, zod, Express + compression (SSR). Don't add new dependencies without explicit approval.

## Definition of done for an AI agent

Before reporting a task complete:

1. The code typechecks (`ng build` succeeds, or at minimum the affected file compiles).
2. Tests pass — `npm run test-headless-ci-only` for any change that touches tested code.
3. SSR safety preserved — no unguarded `window`, `document`, `localStorage`, or `navigator` access in code that can run on the server.
4. No hardcoded colors, spacings, or shadows. Theme tokens only.
5. New components are declared in a module (never standalone). New top-level services are wired in `services/index.ts`.
6. If the change touches auth, tokens, or interceptors, re-read [docs/authentication.md](docs/authentication.md) and verify the refresh-deduplication invariant still holds.
