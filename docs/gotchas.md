# Gotchas

Non-obvious traps. Skim before debugging — most of these have already cost time.

## `npm start` hits the production API

`environment.ts` (the default for the `development` build configuration) sets `resourceApiURI: 'https://api.techinterview.space'`. Running `npm start` against your dev server will write into production data unless you use:

```sh
npm run start:local        # uses environment.local.ts → https://localhost:5001
# or
ng serve --configuration=local
```

`angular.json` controls which `environment.ts` the bundler swaps in via `architect.build.configurations.<config>.fileReplacements`.

## NgModule architecture — no standalone components

This app has not migrated to standalone. Generators in your IDE / Angular CLI may try to scaffold `standalone: true`. **Don't.** Every new component, directive, and pipe must be declared in:

- its owning feature module (under `src/app/modules/<area>/`), or
- `SharedModule` (`src/app/shared/shared.module.ts`) when reused.

ESLint rule `@angular-eslint/prefer-standalone` is **off** in `.eslintrc.js` to make the convention explicit.

## Custom `untilDestroyed(this)`

Defined in `src/app/shared/subscriptions/until-destroyed.ts`. It is **not** `@ngneat/until-destroy`, even though the API looks identical. The implementation patches the component's `ngOnDestroy` at runtime:

```ts
const originalDestroy = componentInstance.ngOnDestroy;
if (!isFunction(originalDestroy)) {
  throw new Error("...is using untilDestroyed but doesn't implement 'ngOnDestroy'");
}
```

So any component that uses `untilDestroyed(this)` **must** declare `ngOnDestroy()`, even if it is empty:

```ts
ngOnDestroy(): void {}
```

Forget this and you get a runtime error the first time the component subscribes.

## SSR-unsafe browser globals

Code that runs during SSR (anything reachable from a `RenderMode.Server` route, plus all module top-level code) cannot use:

- `window`, `document`, `navigator`, `localStorage`, `sessionStorage`
- `Date.now()` if the value is meaningful (it differs server vs. client)
- `crypto.subtle` (mocked but minimal)

Two ways to handle it:

1. **Preferred — guard at the call site.** Inject `PLATFORM_ID` and use `isPlatformBrowser(...)`. See `AuthService`, `TokenStorageService`, `LoginPageComponent`.
2. **Last resort — extend `src/ssr-polyfills.ts`.** Only needed when an imported library reaches for a global at module-evaluation time.

If you see a "location is not defined" or "localStorage is not defined" error from `node dist/interviewer/server/server.mjs`, this is what's wrong.

## SSR + auth = use `RenderMode.Client`

`TokenStorageService` returns `null` for every getter on the server. That means:

- A guard that runs on the server always sees the user as logged out.
- A page that renders authenticated content during SSR will render a logged-out shell, then re-render after hydration. The user sees a flash.

Authenticated routes are configured `RenderMode.Client` in `src/app/app.routes.server.ts` for this reason. When adding a new authenticated route, follow the existing pattern.

## Refresh-token deduplication invariant

`AuthInterceptor` and `AuthService.refreshToken()` together guarantee that a 401 burst causes **exactly one** refresh. Refresh tokens rotate on use; if two refreshes race, one wins and the loser logs the user out spuriously.

Don't break this without reading [authentication.md](authentication.md). Specifically don't:

- Add a `retry()` operator inside the interceptor.
- Replace the `BehaviorSubject<string | null>` with a plain `Subject` (early subscribers would miss the result).
- Bypass `getOrCreateRefresh()` from a new code path.

## Dialogs must close on load error

`<app-dialog>` instances that load data on open (via a service call inside `openDialog()`) need an `error` handler that closes the dialog. Otherwise users see an empty modal body with no feedback and no way to know the request failed.

## Bootstrap dropdowns — use `<button>`, not `<a>`

In Bootstrap 5 dropdown menus, prefer:

```html
<button type="button" class="dropdown-item" [disabled]="..."> Action </button>
```

Buttons are natively keyboard-accessible and don't need `$event.preventDefault()`. Use `[disabled]` to disable — `[class.disabled]` only applies CSS and clicks still fire.

## SCSS imports without `../../`

`angular.json` sets `stylePreprocessorOptions.includePaths: ["src"]`. Component SCSS can therefore use:

```scss
@use 'warm-theme' as *;
```

with no relative path. Don't switch to relative imports — they break component reorganisation.

## Theme tokens are not optional

The design system enforces:

- Colours via CSS custom properties (`var(--warm-bg-primary)`, …).
- Spacing/radius/shadows via SCSS variables (`$space-*`, `$radius-*`, `$shadow-*`).
- Both light and dark themes work out of the box.

A hardcoded hex colour or pixel value in a component will pass review only by mistake. See [DESIGN_GUIDELINE.md](DESIGN_GUIDELINE.md).

## Production bundle budgets fail the build

`angular.json` sets hard error thresholds for the production build:

- `initial: 3 mb error` (warning at 2 mb)
- `anyComponentStyle: 6 kb error` (warning at 4 kb)

If you add a heavyweight dependency or an oversize component stylesheet, the build fails. `npm run bundle:analyze` opens `webpack-bundle-analyzer` against the latest build's `stats.json`.

## Path aliases vs. relative imports

`tsconfig.json` defines `@app/*`, `@components/*`, `@environments/*`, `@shared/*`, `@models/*`, `@modules/*`, `@services/*`. Use them. Long relative chains (`../../../../shared/...`) survive but rot during refactors.

## Maintenance mode is build-time, not runtime

Setting `environment.isUnderMaintenance = true` swaps the entire route table for a single `MaintenanceComponent` route. There is no runtime toggle — you have to rebuild. Don't expect a feature flag.

## OAuth uses `sessionStorage.auth_return_url`

`loginWithGoogle()` and `loginWithGithub()` write the current path to `sessionStorage` before redirecting. The auth-callback page reads it back to bounce the user to where they came from. If you change keys, change both ends.

## The CI test job pins Node 23

`.github/workflows/test.yml` uses `actions/setup-node@v2` with `node-version: 23`. The Dockerfile uses `node:24-alpine3.22`. Nothing currently breaks on this mismatch but it is worth knowing if you hit a Node-version-sensitive issue.
