# Architecture

How this Angular app is organised, where the runtime boundaries are, and what depends on what.

## Runtime topology

```
Browser  ──HTTPS──▶  Express SSR (src/server.ts, port 4000)  ──HTTPS──▶  Backend API (.NET)
                              │                                              (separate repo)
                              └─ on first request: renders Angular server-side
                                 for routes flagged RenderMode.Server
                              └─ for everything else: serves the SPA shell
```

There are three distinct runtimes in this codebase:

| Runtime | Entry | What it does |
|---|---|---|
| Browser SPA | `src/main.ts` → `AppModule` | Normal Angular app after hydration. |
| Server renderer | `src/main.server.ts` → `AppServerModule` | Renders SSR routes during a request. |
| Express SSR host | `src/server.ts` | Receives HTTP requests, decides static vs. SSR, sets security headers, gzip. |

The build (`@angular/build:application`) produces `dist/interviewer/browser` and `dist/interviewer/server` from a single `npm run build`. The Dockerfile copies both into the production image and starts `node dist/interviewer/server/server.mjs`.

## Module layout

```
src/app/
├── components/     Top-level components mounted in AppModule (navbar, admin-navbar, maintenance)
├── models/         TypeScript interfaces, enums, DTOs
├── modules/        Feature modules (lazy-loaded)
├── services/       Application HTTP services (registered in services/index.ts → AppModule)
└── shared/         Reusable components, directives, guards, interceptors, value objects
```

Feature modules under `src/app/modules/`: `admin`, `companies`, `home`, `interviews`, `salaries`, `surveys`, `users`. Each has its own `*.module.ts` and `*-routing.module.ts` and is lazy-loaded from `src/app/app-routing.module.ts`.

For what each feature does, see [domain.md](domain.md).

## NgModules — and why this matters

This app is **NgModule-based**. There is no migration to standalone components. New components/directives/pipes must be declared in:

- their owning feature module, or
- `SharedModule` (`src/app/shared/shared.module.ts`) if reused across features.

`SharedModule` exports a single set of declarations and providers (`AuthGuard`, `AdminGuard`, `ActiveUserGuard`). Feature modules import `SharedModule` to get those declarations.

Top-level wiring lives in `src/app/app.module.ts`:

- declarations: `AppComponent`, `NavbarComponent`, `AdminNavbarComponent`, `MaintenanceComponent`
- imports: `BrowserModule`, `AppRoutingModule`, `SharedModule`, plus Google Analytics modules pulled from the active environment
- providers: the three HTTP interceptors, then `applicationServices` from `services/index.ts`, then `provideHttpClient(withInterceptorsFromDi())` and `provideClientHydration(withEventReplay(), withHttpTransferCacheOptions(...))`.

## SSR / SPA boundary

`src/app/app.routes.server.ts` declares per-route render modes. Pattern:

- `RenderMode.Server` — public, SEO-relevant pages: home, companies, public surveys/interviews, salary overview, about/privacy, design-system showcase.
- `RenderMode.Client` — anything authenticated (admin, `me/**`, `users/**`), interactive (`salaries/**`), or browser-API-dependent (auth callbacks).

Hydration is enabled in `AppModule` via `provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({ includePostRequests: false }))`. GET responses fetched during SSR are transferred to the client, so the browser does not refetch them.

The server-only module `src/app/app.module.server.ts` adds `provideServerRendering(withRoutes(serverRoutes))` on top of `AppModule`.

For the full SSR rationale, deployment, and meta-tag patterns, see [SSR_DEPLOYMENT.md](SSR_DEPLOYMENT.md). For SEO/JSON-LD details, see [geo.md](geo.md).

### Browser-API safety

Code that runs during SSR cannot touch `window`, `document`, `localStorage`, `navigator`, or DOM APIs without protection. The codebase uses two strategies:

1. **Platform check at the call site:** inject `PLATFORM_ID` and guard with `isPlatformBrowser(...)`. Used by `AuthService`, `TokenStorageService`, the auth pages, etc.
2. **Last-resort polyfills:** `src/ssr-polyfills.ts` defines mock `window`, `document`, `localStorage`, `sessionStorage`, `navigator`, and minimal `crypto`. Imported only when a third-party dependency reaches for a global on import.

Strategy 1 is preferred. Add to `ssr-polyfills.ts` only when you cannot reach the offending code.

## HTTP pipeline

`AppModule` registers three interceptors via `HTTP_INTERCEPTORS` (registration order is execution order):

1. `AuthInterceptor` — adds `Authorization: Bearer <token>` from `TokenStorageService`, handles `401` with refresh-token deduplication, redirects to `server-unavailable` on network errors, and routes `400`/`403` to `AlertService` / `no-permission` respectively.
2. `SpinnerInterceptor` — toggles the global loading spinner.
3. `DateParserInterceptor` — walks response bodies and parses ISO date strings into `Date` instances.

The full auth flow (refresh-deduplication invariant, OAuth, storage layout) is documented in [authentication.md](authentication.md).

`ApiService` (`src/app/services/api.service.ts`) is a thin typed wrapper over `HttpClient` that prepends `environment.resourceApiURI`. Most feature services compose on top of it.

## Application services

All cross-feature singletons live in `src/app/services/` and are aggregated by `services/index.ts`:

- `applicationServices` array — explicit list of services to register in `AppModule.providers`.
- Re-exports a curated subset for type imports.

When you add a new top-level service, append it to `applicationServices` so it is provided at the root.

## Routing

- Root routes: `src/app/app-routing.module.ts` lazy-loads each feature module under its top-level path. The fallback is `redirectTo: 'not-found'`. When `environment.isUnderMaintenance === true`, the routes table degrades to a single `/maintenance` page.
- Each feature module contributes a `*-routing.module.ts` that wires its leaf components.
- `scrollPositionRestoration: 'enabled'` is set at the root.

## Guards

In `src/app/shared/guards/`:

- `AuthGuard` — requires a valid token via `AuthService.ensureValidToken()`. Stores the attempted URL in a cookie and redirects to `/login`.
- `AdminGuard`, `ActiveUserGuard` — extend `RoleGuardBase`, which fetches the current user and redirects to `no-permission` on a role miss.
- `IsDesktopGuard` — desktop-only routes.

Guards are wired to feature routes in their respective routing modules. `AuthGuard` + `AdminGuard` gate `/admin/**` from the root router.

## Build configurations (`angular.json`)

The `interviewer` project defines four build configurations:

- `production` — `outputHashing: 'all'`, hard budgets (`initial: 3 mb error`, `anyComponentStyle: 6 kb error`), uses `environment.prod.ts`.
- `staging` — same shape as production, uses `environment.staging.ts`.
- `development` — sourcemaps + named chunks, optimization on (default for `ng serve`).
- `local` — same as `development`, but `fileReplacements` swap in `environment.local.ts` so the API points at `https://localhost:5001`.

`outputMode: 'server'` and `ssr.entry: 'src/server.ts'` make every build emit both browser and server bundles.

## Testing

Karma + Jasmine, headless Chromium driven by Puppeteer (`karma.conf.js`). Custom launcher `ChromiumNoSandbox` is what `npm test` and CI use. Detailed setup, helpers, and patterns: [testing.md](testing.md).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) on push to `main` builds the Docker image, pushes it to a DigitalOcean container registry, then `scp`s `docker-compose.frontend.yml` to a server and runs `docker compose pull && docker compose up -d`. The container exposes the SSR server on port `4000` (mapped to `8080` in `docker-compose.frontend.yml`).
