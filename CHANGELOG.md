# Changelog

## 2026-03-19

### Summary

UI, performance, and layout fixes across the application — focused on mobile responsiveness, font loading, image optimization, and navbar refactoring.

### Fonts

- Replaced Google Fonts (Lora, Nunito) with self-hosted `@fontsource/lora` and `@fontsource/nunito` packages to fix production build failure caused by font inlining errors and eliminate external font dependency.
- Removed Google Fonts `<link>` preconnect and stylesheet tags from `index.html`.

### Image Optimization

- Added `ipx` Express middleware at `/img` route for on-the-fly WebP conversion of images served from DigitalOcean Spaces CDN.
- Replaced all hardcoded CDN image URLs in templates with `/img/` proxy paths. Preserved original CDN URLs only for `og:image` and `twitter:image` meta tags required for social sharing.
- GIF images are excluded from WebP conversion.
- Added `Cache-Control: public, max-age=86400, s-maxage=604800` headers on image responses.

### Navbar

- Decomposed `navbar.component.html` into two sub-components: `NavbarListComponent` (dropdown menus) and `NavbarActionsComponent` (theme toggle + login/logout).
- Applied `position: sticky; top: 0` to navbar host element for sticky header behavior.
- Added body scroll lock when burger menu is open via Bootstrap collapse events (`show.bs.collapse` / `hide.bs.collapse`).
- Added automatic burger menu close on Angular router navigation.
- On mobile (below xl breakpoint): `app-navbar-actions` is displayed first (above nav links) in a full-width row with `justify-content: space-between`.

### Footer

- Moved footer from static HTML in `index.html` into the Angular app as `FooterComponent` to fix sticky navbar losing visibility when scrolling into the footer area.
- `app-root` is now a flex column container, ensuring the footer is always pushed to the bottom of the page.

### Home Page

- Removed hardcoded `mt-5` from the Wednesday frog component.
- Last feature block bottom margin is removed when the Wednesday frog is visible, eliminating excess whitespace.

### Pagination

- On mobile (below md breakpoint), pagination shows at most 3 page buttons: previous, current, and next page. Full pagination is shown on desktop.

### Misc

- Fixed duplicate section titles on the Historical Data page.
- Fixed currencies chart layout on narrow screens.

---

## 2026-02-12

### Public Surveys Page
- Added new page "Публичные опросы" at `/surveys/public` showing all published and closed surveys with pagination
- Created `PublicSurveysPageComponent` with responsive card grid layout
- Each survey card is a clickable link navigating to the survey page
- Added `getAllPublic()` method to `PublicSurveysService` calling `GET /api/public-surveys/all`
- Registered route `surveys/public` in `SurveysRoutingModule` (no auth required)
- Added SSR support (`RenderMode.Server`) for `/surveys/public` in `app.routes.server.ts`

### My Surveys Page
- Wrapped filter toolbar and search field in a card on "Мои опросы" page
- Moved survey item cards outside the toolbar card for cleaner visual separation

### Survey Results Page
- Added "Все публичные опросы" link at the bottom of the results page, navigating to `/surveys/public`

---

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
