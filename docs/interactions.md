# Interactions

External systems this frontend talks to at runtime, plus the configuration surfaces that control them.

## Backend API

The single most important external dependency. Configured by `environment.resourceApiURI` and consumed via `ApiService` (`src/app/services/api.service.ts`), which prepends the base URL to every request.

| Configuration | Base URL |
|---|---|
| `production` | `https://api.techinterview.space` |
| `staging` | (`environment.staging.ts`) |
| `development` (default `npm start`) | `https://api.techinterview.space` — **production**, by design or by accident; treat as production. |
| `local` (`npm run start:local`) | `https://localhost:5001` |

Endpoints used by the frontend follow the convention `/api/<area>/<action>`. Examples grounded in source:

- `/api/account/me`, `/api/account/my-salaries`, `/api/account/check-totp`, `/api/account/unsubscribe-me/:token` — `AuthorizationService`.
- `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/forgot-password`, `/api/auth/reset-password`, `/api/auth/resend-verification`, `/api/auth/google`, `/api/auth/github` — `AuthApiService`.
- Feature-area services under `src/app/services/` follow the same pattern (companies, surveys, salaries, interviews, telegram, github, m2m clients, etc.).

For exact paths, read the relevant service. We do **not** maintain an endpoint inventory in docs because the source is authoritative and routes change.

### Error contract

The backend returns JSON-shaped errors documented by the zod schema in `AuthInterceptor`:

```ts
{ Status, ExceptionType, InnerExceptionMessage, Message, RequestId, StackTrace }
```

The interceptor surfaces `Message` via `AlertService` for `400`s. `403` redirects to `/no-permission`. `401` triggers token refresh (see [authentication.md](authentication.md)). `0` (network) redirects to `/server-unavailable`.

### Date handling

`DateParserInterceptor` (registered third in `AppModule`) walks every JSON response body and converts ISO-8601 strings to `Date` instances. Don't re-parse dates in feature code; the interceptor already did it.

## OAuth providers

Google and GitHub OAuth do not run in the browser directly — the frontend only redirects to the backend, which mediates the OAuth flow and returns to `/auth-callback` with tokens.

- Initiation: `AuthApiService.getGoogleAuthUrl(returnUrl)` and `getGitHubAuthUrl(returnUrl)` build the URL with `frontendReturnUrl` query string.
- Callback: `/auth-callback` (SPA route) reads tokens from the URL and hands them to `AuthService.handleOAuthCallback(...)`.

## Static asset CDN

User-uploaded and shared imagery is served from DigitalOcean Spaces:

- `https://techinterview.fra1.cdn.digitaloceanspaces.com`

Referenced by `MetaTagService.DEFAULT_IMAGE_URL` and allowed in the SSR Content-Security-Policy `img-src` directive (`src/server.ts`). When introducing new image hosts, update both places.

## Google Analytics

Wired via `ngx-google-analytics`. The provider is **per-environment**:

- `production` — `NgxGoogleAnalyticsModule.forRoot('G-6GS9Y7GJD3')` plus `NgxGoogleAnalyticsRouterModule` (`src/environments/environment.prod.ts`).
- `development`, `local`, `staging` — `googleAnalytics.imports: []`. No analytics in dev/local.

`AppModule` spreads `environment.googleAnalytics.imports` into its `imports` array, so a non-prod build registers nothing.

The CSP in `src/server.ts` allows `googletagmanager.com`, `google-analytics.com`, and `*.analytics.google.com` for `script-src`, `connect-src`, and `img-src`.

## Express SSR server (`src/server.ts`)

In production the Angular app is served from this Node process. It is also an external surface in its own right, since it sets the headers that ship to browsers:

- **Security headers (every response):**
  - `X-Frame-Options: SAMEORIGIN`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `Content-Security-Policy` — see below.
- **`Content-Security-Policy`** allows: self for everything; inline scripts/styles (Angular hydration), Google Tag Manager, Google Analytics, Google Fonts, jsDelivr (icons), DigitalOcean Spaces CDN, Google user-content avatars, `data:` images, and `connect-src` to the production API. When adding a third-party script/style/host, update this header and verify the prod build still loads.
- **`Link` header (RFC 8288)** — every response advertises `</.well-known/api-catalog>; rel="api-catalog"` and `</.well-known/agent-skills/index.json>; rel="agent-skills"` so AI agents can discover the API surface and skill index without scraping HTML. If you add a new agent-relevant well-known resource, add it here too.
- **Compression** — `compression()` middleware on text responses.
- **Static assets** — served from `dist/interviewer/browser` with `maxAge: '1y'` and no fallback index. Hashing in production builds (`outputHashing: 'all'`) makes long caching safe.
- **`/sitemap.xml`** — redirected to the canonical sitemap by `redirectToCanonicalSitemap` (`src/server/sitemap-redirect.util.ts`).
- **`/.well-known/api-catalog`** — RFC 9727 linkset pointing at the backend OpenAPI spec (`/swagger/v1/swagger.json`), Swagger UI (`/`), and `/health`. Content lives in `src/server/well-known.ts`. Served as `application/linkset+json` with a 1-day s-maxage.
- **`/.well-known/agent-skills/index.json`** — Agent Skills Discovery RFC v0.2.0 index. Currently exposes one `site-overview` skill. The skill markdown is hashed at startup; bumping the markdown will change the `sha256` automatically.
- **`/.well-known/agent-skills/site-overview/SKILL.md`** — plain markdown describing site surfaces, served as `text/markdown`.
- **Markdown content negotiation** — when a client sends `Accept: text/markdown`, the SSR handler converts the rendered HTML to markdown via `turndown` and returns `Content-Type: text/markdown; charset=utf-8` with an `X-Markdown-Tokens` header (byte length, used as a coarse token proxy). Browsers without an explicit markdown accept still get HTML. The handler also sets `Vary: Accept` so caches keep the two representations separate.
- **All other routes** — `Cache-Control: public, max-age=300, s-maxage=3600` and the Angular SSR engine.
- **Port** — `process.env.PORT || 4000`.

## Build-time / deploy-time integrations

- **Docker registry** — DigitalOcean container registry. Image is built and pushed on every push to `main` (`.github/workflows/deploy.yml`).
- **Deploy host** — a single VM accessed over SSH (`appleboy/ssh-action`). The workflow `scp`s `docker-compose.frontend.yml`, runs `docker compose pull`, then `docker compose up -d`. Secrets used: `DO_TOKEN`, `CR`, `IP`, `PORT`, `SSH_KEY_PRIVATE`.

No CDN or edge proxy is configured at the application layer.

## Browser-side libraries that reach for globals

Several runtime dependencies inspect `window`, `document`, or `navigator` at module evaluation time. They are why `src/ssr-polyfills.ts` exists. When adding a dependency, run a server-side build (`npm run build && npm run serve:ssr:interviewer`) and load an SSR route to confirm the server can boot.

## Configuration surface — full map

| Setting | Where it lives | What changes |
|---|---|---|
| Backend API URL | `environment*.ts` → `resourceApiURI` | All HTTP calls |
| OAuth callback | `environment*.ts` → `auth.redirectUri` | OAuth callback URL |
| Logout callback | `environment*.ts` → `auth.postLogoutRedirectUri` | Backend logout redirect |
| Google Analytics tag | `environment*.ts` → `googleAnalytics.imports` | GA wiring |
| Maintenance mode | `environment*.ts` → `isUnderMaintenance` | Hijacks router to `/maintenance` |
| Active environment | `angular.json` → `architect.build.configurations.<config>.fileReplacements` | Which `environment.ts` is bundled |
| SSR port | `process.env.PORT` (default `4000`) | Listening port |
| CSP / security headers | `src/server.ts` | Allowed third-party origins |
| Production bundle budgets | `angular.json` → `configurations.production.budgets` | Build fails if exceeded |
