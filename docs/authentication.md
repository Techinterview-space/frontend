# Authentication

How sign-in, token refresh, and authorization work on the frontend. The backend (separate `web-api/` repository) issues and validates tokens; this doc only covers the frontend's responsibilities.

## Overview

| Identity source | Endpoint kind | Result |
|---|---|---|
| Email + password | `POST /api/auth/login` | `AuthTokenResponse` |
| Google OAuth | Browser redirect to `/api/auth/google?frontendReturnUrl=…` | Tokens delivered in callback URL |
| GitHub OAuth | Browser redirect to `/api/auth/github?frontendReturnUrl=…` | Tokens delivered in callback URL |
| Refresh | `POST /api/auth/refresh` | New `AuthTokenResponse` |
| Logout | `POST /api/auth/logout` | Backend invalidates refresh token |

The backend issues short-lived JWT access tokens plus refresh tokens. The frontend stores both client-side and rotates them automatically.

## Components

```
                       ┌────────────────────────────┐
                       │ AuthService (orchestrator) │
                       └────────────┬───────────────┘
                                    │ uses
                ┌───────────────────┼─────────────────────────────────┐
                │                   │                                  │
   ┌────────────▼──────┐   ┌────────▼────────────┐         ┌──────────▼────────────┐
   │ AuthApiService    │   │ TokenStorageService │         │ AuthSessionService    │
   │ (auth endpoints)  │   │ (localStorage)      │         │ (sessionStorage)      │
   └───────────────────┘   └─────────────────────┘         └───────────────────────┘
                                    ▲
                                    │ reads / refreshes
                       ┌────────────┴───────────────┐
                       │ AuthInterceptor            │
                       │ (HTTP_INTERCEPTORS, first) │
                       └────────────────────────────┘
```

| Symbol | File |
|---|---|
| `AuthService` | `src/app/shared/services/auth/auth.service.ts` |
| `AuthApiService` | `src/app/services/auth-api.service.ts` |
| `TokenStorageService` | `src/app/shared/services/auth/token-storage.service.ts` |
| `AuthSessionService` | `src/app/shared/services/auth/auth.session.service.ts` |
| `AuthInterceptor` | `src/app/shared/interceptors/auth-interceptor.ts` |
| `AuthorizationService` | `src/app/services/authorization.service.ts` (calls `/api/account/*`) |
| `AuthGuard`, `RoleGuardBase`, `AdminGuard`, `ActiveUserGuard` | `src/app/shared/guards/` |

## Storage layout

Tokens are kept in `localStorage` (browser only — the storage service guards every access with `isPlatformBrowser`):

| Key | Meaning |
|---|---|
| `ti_access_token` | JWT access token |
| `ti_refresh_token` | Opaque refresh token |
| `ti_expires_at` | Absolute expiry (ms epoch), set as `Date.now() + expires_in * 1000` |

Cached user data is kept in `sessionStorage` via `AuthSessionService` (keys `CurrentUser_AuthInfo`, `CurrentUser_AppUserInfo`, `CurrentUser_Timestamp`) so a page reload does not require an immediate `GET /api/account/me`.

`TokenStorageService.isTokenExpired()` reports expiry **60 seconds before** the recorded `expiresAt` (clock-skew safety margin). `isTokenExpiringSoon()` reports it **5 minutes before**, which is what `ensureValidToken()` uses to trigger a proactive refresh.

## Flow: email + password sign-in

1. User submits the login form. `AuthService.loginWithEmail(email, password, website?, formDurationSeconds?)` calls `AuthApiService.login()` which posts to `POST /api/auth/login` with `deviceInfo: navigator.userAgent` and the anti-bot fields (see [domain.md](domain.md#anti-bot-signals-on-auth-forms)).
2. On success, `handleAuthResponse()` writes tokens to `TokenStorageService` and the in-memory `authInfo` cache, and mirrors `authInfo` to `AuthSessionService`.
3. The current user is **not** loaded automatically here. The next call to `getCurrentUser()` (typically by a guard) will fetch `/api/account/me`.

## Flow: OAuth (Google / GitHub)

`loginWithGoogle()` and `loginWithGithub()`:

1. Stash the current path in `sessionStorage.auth_return_url`.
2. Redirect the browser to `${apiBaseUrl}/api/auth/google?frontendReturnUrl=<origin>/auth-callback` (or `/api/auth/github`).
3. The backend completes the OAuth dance and redirects back to `/auth-callback` with `accessToken`, `refreshToken`, and `expiresIn` in the URL.
4. The auth-callback page calls `AuthService.handleOAuthCallback(...)`, which writes tokens via `TokenStorageService.setTokens(...)` and fetches `/api/account/me`.

OAuth pages run on the client only (`RenderMode.Client` in `app.routes.server.ts`) — they touch `window.location` and `sessionStorage`.

## Flow: token refresh and the deduplication invariant

This is the part that is easy to break. **Read this before changing `AuthInterceptor` or `AuthService.refreshToken()`.**

There are two refresh paths:

### Reactive refresh — `AuthInterceptor.handle401Error`

When any request comes back with `401` (and is not itself one of `/api/auth/refresh`, `/api/auth/login`, `/api/auth/logout`):

1. If no refresh is in flight, mark `isRefreshing = true`, reset `refreshTokenSubject`, and call `authService.refreshToken()`.
2. On success, replay the original request with the new bearer.
3. On failure, call `authService.signout()` and redirect to `/`.
4. While a refresh is in flight, every other failing request **waits on `refreshTokenSubject`** instead of starting its own refresh — `BehaviorSubject<string | null>` filtered until non-null, then `take(1)`. This is the deduplication contract: there must be **exactly one in-flight refresh per 401 burst**, and every other 401 must replay using the result.

### Proactive refresh — `AuthService.ensureValidToken`

Called by `AuthGuard` and `AuthService.getCurrentUser()`. If the token is expiring soon, it triggers a refresh before any request actually fails. To avoid duplicating the in-flight call (e.g., two guards hitting it at the same time), `getOrCreateRefresh()` builds a single shared observable using `shareReplay(1)` and clears it via `finalize()` when the refresh settles.

### Why this matters

Refresh tokens rotate on use. If two refreshes race, one wins and the other gets a `401` for a now-revoked refresh token — and the user is signed out spuriously. Both deduplication mechanisms exist to prevent that. Don't:

- Add a "just retry it" RxJS operator inside the interceptor.
- Replace `BehaviorSubject` with `Subject` (early subscribers would never see the refresh result).
- Bypass `getOrCreateRefresh()` and call `refreshToken()` directly from a new code path.

## HTTP error handling

`AuthInterceptor.processHttpErrorResponse()` centralises common error UX:

| Status | Action |
|---|---|
| `401` | `handle401Error` (refresh + replay). Auth endpoints excluded. |
| `403` | Navigate to `/no-permission`. |
| `400` | If body matches `BackendErrorSchema` (zod), surface `Message` via `AlertService`; otherwise generic alert. |
| `0` | Navigate to `/server-unavailable` (network down or backend unreachable). |
| anything else | Surface via `AlertService.error(error.message)`. |

The zod schema is the typed contract for backend `4xx` responses:

```ts
{ Status, ExceptionType, InnerExceptionMessage, Message, RequestId, StackTrace }
```

If the backend ever changes that shape, update the schema, not the interceptor's branching.

## Sign-out

`AuthService.signout()`:

1. Emits `loggedOutInvoked$` (so subscribers can clean up before the user is gone).
2. Fires `POST /api/auth/logout` with the refresh token (errors are swallowed — local sign-out must succeed even if the backend is unavailable).
3. Clears `localStorage` tokens, in-memory user, and the `sessionStorage` cache.
4. Emits `loggedOut$`.

## Authorization

Three guards in `src/app/shared/guards/`:

- **`AuthGuard`** — requires `ensureValidToken()` to resolve `true`. Stashes the attempted URL in a cookie (`url`) so the post-login redirect can return there, then navigates to `/login`.
- **`AdminGuard`** — extends `RoleGuardBase`, checks `user.hasRole(UserRole.Admin)`.
- **`ActiveUserGuard`** — extends `RoleGuardBase`, ensures the user is not banned/inactive.

All three are registered as providers in `SharedModule`.

`RoleGuardBase` calls `getCurrentUser()`, which pipes through `ensureValidToken()` first, so a stale-token user never sees a "permission denied" before getting refreshed.

## SSR considerations

- `TokenStorageService` returns `null` for every getter on the server (no `localStorage`). Guards therefore see `hasValidToken() === false` during SSR, and SSR routes that need auth are configured as `RenderMode.Client` so SSR never tries to render an authenticated view (see [architecture.md](architecture.md#ssr--spa-boundary)).
- `AuthService` is `providedIn: 'root'` and works on the server; it just becomes a no-op for storage-backed methods.
- When you add a route that requires auth, prefer `RenderMode.Client` to avoid an SSR-then-redirect dance.

## Changing anything in this area

If your change touches any of:

- The interceptor's `401` branch
- The `BehaviorSubject` / `shareReplay(1)` deduplication
- Token storage keys or expiry math
- The OAuth callback parameter shape

then run the relevant specs at minimum:

```sh
npm run test-headless-ci-only -- --include='**/auth-interceptor.spec.ts'
npm run test-headless-ci-only -- --include='**/auth.service.spec.ts'
npm run test-headless-ci-only -- --include='**/auth.guard.spec.ts'
```

(or just `npm run test-headless-ci-only` for everything).
