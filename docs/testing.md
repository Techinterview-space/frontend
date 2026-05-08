# Testing

How tests are wired, what helpers exist, and what the CI gate enforces.

## Stack

- **Test framework:** Jasmine
- **Runner:** Karma (`karma.conf.js`)
- **Browser:** headless Chromium driven by Puppeteer. The custom launcher `ChromiumNoSandbox` (`base: 'ChromeHeadless'` plus `--no-sandbox`, `--disable-gpu`, etc.) is what `npm test` and CI use.
- **Builder:** `@angular/build:karma` configured in `angular.json` under the `interviewer.architect.test` target. `tsConfig: tsconfig.spec.json`.

`karma.conf.js` sets `process.env.CHROME_BIN = require('puppeteer').executablePath()` so a Puppeteer-bundled Chromium is always used — no system Chrome required.

## Commands

```sh
npm test                     # ng test --browsers ChromiumNoSandbox (watch mode)
npm run test-headless-ci-only  # ng test --no-watch --browsers ChromiumNoSandbox (CI gate)
```

You can scope a run to a single spec the usual Angular CLI way:

```sh
ng test --browsers ChromiumNoSandbox --include='**/auth-interceptor.spec.ts'
```

## Layout

- Specs are colocated with their subject as `<file>.spec.ts`.
- Shared utilities live in `src/app/shared/test-utils/` and `src/app/shared/tests/`.
- Value-object tests live alongside their value object in `src/app/shared/value-objects/`.

## Test utilities (`src/app/shared/test-utils/`)

Three reusable bundles exported from `index.ts`:

- **`testUtilStubs`** — DI stubs for `HttpClient`, `Router`, `ActivatedRoute`, `Location`. Use these instead of letting the real services run during unit tests.
- **`mostUsedServices`** — pre-wired session storage, `AuthSessionService`, `MockAuthService`, `AlertService`, `CheckDeviceService`, `ApiService`, `TitleService`, `CookieService`, and a `MockGoogleAnalyticsService`. Drop into `providers` for components that depend on the common infrastructure.
- **`mostUsedImports`** — `BrowserModule`, `BrowserAnimationsModule`, `RouterTestingModule`, the form modules, `CommonModule`, `SharedModule`, `NgSelectModule`. Drop into `imports` for component tests.

Two helpers for "given a logged-in user" setup:

- `spyOnCurrentUserServiceWithUser(user, spyOnFn)` — overrides `AuthService.getCurrentUser` to return a specific `ApplicationUserExtended`.
- `spyOnCurrentUserServiceWithUserId(spyOnFn, userId?, role?)` — convenience wrapper that builds a `TestApplicationUser` and forwards.

`MockAuthService` (`src/app/shared/test-utils/mock-auth.service.ts`) is the default substitute for `AuthService`; `TestApplicationUser` (`src/app/shared/test-utils/models/`) is a builder for fixture users.

## Patterns

### Service tests

Provide `HttpClient` real (or stubbed via `testUtilStubs`) and `TestBed.inject(MyService)`. Example: `src/app/services/api.service.spec.ts` uses `provideHttpClient(withInterceptorsFromDi())` so the service can be exercised against an interceptor stack if needed.

### Interceptor tests

Use `HttpClientTestingModule`-style fixtures (Angular's standard pattern). Examples: `src/app/shared/interceptors/auth-interceptor.spec.ts`, `date-parser-interceptor.spec.ts`. When changing the auth interceptor, the refresh-deduplication invariant (see [authentication.md](authentication.md)) must remain covered.

### Guard tests

Examples: `src/app/shared/guards/auth.guard.spec.ts`, `active-user.guard.spec.ts`, `is-desktop.guard.spec.ts`. They typically inject `MockAuthService` and assert routing side-effects via `RouterStub`.

### Value-object tests

Pure-function style, no `TestBed`. Examples: `src/app/shared/value-objects/date-extended.spec.ts`, `enum-helper.spec.ts`, `convert-object-to-http.spec.ts`.

### SSR-specific tests

The Express sitemap redirect is unit-tested in `src/server/sitemap-redirect.util.spec.ts`. There is no end-to-end SSR rendering test in the suite; verify SSR behaviour manually with `npm run serve:ssr:interviewer` plus `curl`.

## CI gate (`.github/workflows/test.yml`)

Triggered on pull requests targeting `main`:

1. Cache `~/.npm`.
2. `actions/setup-node@v2` with `node-version: 23`.
3. `npm install --include=optional` (the `optionalDependencies` block in `package.json` includes Nx prebuilt binaries used elsewhere).
4. `npm run build-prod` — must succeed (catches budget violations and SSR build failures).
5. `npm run test-headless-ci-only` — must succeed.

`npm run lint` is currently commented out in CI; locally you can still run it. Lint locally before pushing if you've edited templates or selectors — the rules in `.eslintrc.js` are enforced strictly for `@angular-eslint/component-selector` and `@angular-eslint/directive-selector`.

## SSR safety in tests

Karma runs in a real headless browser, so `window`, `document`, and `localStorage` exist. SSR safety is **not** verified by the unit-test suite. To check that a change is SSR-safe, run:

```sh
npm run build
npm run serve:ssr:interviewer
curl -s http://localhost:4000/ | head
```

A crash in the server bundle usually surfaces as a 500 from the SSR engine and a stack trace on stderr.

## When you change tested code

The project rule (CLAUDE.md):

> After modifying any code that has existing tests, always run the full test suite before reporting completion.

That means `npm run test-headless-ci-only`, not a single spec.
