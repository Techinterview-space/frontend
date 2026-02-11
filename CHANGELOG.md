# Changelog

## 2026-02-11 (Loader Follow-up)

- Branch: `codex/loader-fix-lighthouse-followup`
- Date: `2026-02-11`

### Summary

Follow-up fix for the new shared loader behavior and a production Lighthouse snapshot after the latest merged PR.

### Maintainer Notes

- Changed shared loading spinner defaults:
  - `app-loading-spinner` now uses spinner-only mode by default.
  - GIF loading is opt-in via `[showGif]="true"`.
  - On GIF load failure, component now keeps spinner visible instead of hiding it.
- Updated unit tests to cover:
  - default non-GIF behavior
  - delayed GIF behavior when enabled
- Production Lighthouse snapshot (captured on `2026-02-11`):
  - `/salaries` mobile: Performance `47`, Accessibility `100`, Best Practices `93`, SEO `93`
  - `/salaries` desktop: Performance `99`, Accessibility `100`, Best Practices `100`, SEO `90`
  - `/` mobile: Performance `60`, Accessibility `97`, Best Practices `93`, SEO `100`
  - `/` desktop: Performance `74`, Accessibility `98`, Best Practices `93`, SEO `100`
- Key perf observation:
  - delayed loader GIF still shows ~4.25 MiB potential savings on `/salaries` mobile when enabled
  - moving shared loaders to spinner-only by default avoids this regression for route loading states

### Validation Performed

- `npx ng test --no-watch --browsers ChromiumNoSandbox --include=src/app/shared/components/loading-spinner/loading-spinner.component.spec.ts`
- `npm run build-prod`

## 2026-02-11

- PR: [Techinterview-space/frontend#118](https://github.com/Techinterview-space/frontend/pull/118)
- Branch: `codex/seo-performance-phase1`
- Date: `2026-02-11`
- Commits:
  - `d9f3527` `perf(seo): optimize crawlability and payload`
  - `52538ea` `fix(seo): address unresolved review threads`
  - `3580beb` `style(prism): satisfy callback return lint rule`

### Summary

This PR delivers Phase 1 SEO and performance improvements for `techinterview.space` and `/salaries`, plus follow-up fixes from PR review threads.

Primary outcomes:
- Better crawlability and sitemap behavior
- Lower eager JS/CSS payload via lazy Prism strategy
- Improved media loading and reduced CLS risk
- SSR response compression support
- All PR review threads resolved

### User-Facing Changes

#### SEO and Crawlability

- Replaced non-crawlable login anchor with semantic button in navbar.
- Kept `/salaries` blocked in `robots.txt` while preserving `/salaries/overview` allowance.
- Added server behavior for `GET /sitemap.xml` to redirect to API sitemap endpoint.
- Stabilized `/salaries` page metadata behavior.

#### Performance and Payload

- Removed eager imports of lazy modules from root app module.
- Removed global Prism assets from `angular.json`.
- Added lazy Prism loading where code highlighting is needed.
- Added lazy-loaded Prism theme CSS (`prism-okaidia`) at runtime.
- Added retry-safe Prism loader behavior for failed dynamic imports.

#### Media and Layout Stability

- Added responsive image variants (`480`/`800`) for home feature visuals.
- Added/adjusted `srcset`, `sizes`, and decoding/loading hints.
- Set first home feature image to eager loading to avoid in-viewport lazy-load/LCP warning risk.
- Improved loading spinner behavior:
  - Reserved layout frame
  - Delayed GIF load
  - Correct dynamic alt text for cat/dog GIF variant
- Added reserved loading shell/min-height on salaries route to reduce footer jump/CLS.

#### SSR and Delivery

- Added compression middleware to SSR server for text responses.
- Preserved existing caching and CSP strategy.

### Internal / Test Changes

- Added or updated tests for:
  - Navbar crawl-safe login markup
  - Loading spinner delay/timer lifecycle
  - Sitemap redirect utility
- Added utility and test files for sitemap redirect handling.
- Addressed PR review suggestions for:
  - Prism error handling and fallback behavior
  - Promise rejection safety in Prism call sites
  - Test reliability improvements
  - Style-only callback lint warning (`forEach` block body)

### File Areas Touched

- Build/config: `angular.json`, `package.json`, `package-lock.json`
- SSR/server: `src/server.ts`, `src/server/sitemap-redirect.util.ts`, `src/server/sitemap-redirect.util.spec.ts`
- SEO/UI: navbar, salaries chart, robots
- Performance/media: home page images, loading spinner, responsive assets
- Highlighting/runtime: `src/app/shared/services/prism-loader.service.ts`, `src/prism-components.d.ts`

### Validation Performed

- Targeted unit tests for modified components/specs
- Full test suite:
  - `npm run test-headless-ci-only`
  - Result: `211 SUCCESS`
- Production build:
  - `npm run build-prod`
  - Result: success (with pre-existing non-blocking warnings)

### Public Interface Notes

- `GET /sitemap.xml` now redirects to `https://api.techinterview.space/api/sitemap.xml`.
- No backend contract/schema changes.
- Frontend routes unchanged (`/salaries` remains accessible but blocked by robots policy).

### Infra Follow-Up (Outside This Repo)

- Enable HTTP/2 or HTTP/3 at edge.
- Ensure Brotli at edge for `JS/CSS/HTML`.
- Increase immutable media cache TTL at CDN/Spaces.
- Fix `www.techinterview.space` TLS/canonical redirect behavior.
