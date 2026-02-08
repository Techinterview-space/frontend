# Website Audit: techinterview.space

**Date:** 2026-02-07
**Tool:** squirrelscan v0.0.32
**Coverage:** Surface (100 pages)
**Overall Score: 50/100 (Grade F)**
**Summary:** 8658 passed | 1291 warnings | 333 errors

---

## Category Scores

| Category | Score | Grade |
|----------|-------|-------|
| URL Structure | 100 | A+ |
| Analytics | 100 | A+ |
| Internationalization | 100 | A+ |
| Legal Compliance | 100 | A+ |
| Local SEO | 100 | A+ |
| Mobile | 100 | A+ |
| Structured Data | 100 | A+ |
| Social Media | 100 | A+ |
| Crawlability | 92 | A |
| Images | 86 | B |
| Accessibility | 84 | B |
| Links | 84 | B |
| Content | 74 | C |
| Core SEO | 73 | C |
| Security | 70 | C |
| Performance | 66 | D |
| E-E-A-T | 59 | F |

---

## Errors (333 total)

### Core SEO (90 errors)

#### core/h1 - Missing H1 tag (90 pages)

No H1 tag found on 90 pages including homepage, /companies, /companies/recent-reviews, and most company detail pages.

**Affected pages:** /, /companies, /companies/recent-reviews, and 87 company detail pages.

**Fix:** Add `<h1>` tags to homepage component, companies list component, and company detail component templates.

---

#### core/meta-title - Title length issues (7 pages)

- **Too short (19 chars, min 30):** /
- **Too long (>60 chars):** /companies/onay-2050db74 (65), /companies/cef-c6ce557b (68), /companies/alma-plus-a12796b9 (79), /companies/ekt-kz-999ce499 (62), /companies/tsarka-9c759a37 (80), /companies/ticketon-kz-69397a57 (64)

**Fix:** Update homepage title to be 30-60 characters. Review meta title generation for company pages to truncate at 60 chars.

---

#### core/meta-description - Description too short (99 pages)

Meta descriptions are below 120 characters on nearly all pages. Lengths range from 35 to 106 characters.

**Affected pages:** /, /companies, /companies/recent-reviews, and 96 company detail pages.

**Fix:** Improve meta description generation in `meta-tags.service.ts` to produce descriptions of 120-160 characters.

---

### Accessibility (205 errors)

#### a11y/duplicate-id-aria - Duplicate ARIA IDs (100 pages)

Rule error: CSS is not defined. Affects all 100 crawled pages. Likely a scanner issue, but worth investigating.

---

#### a11y/duplicate-id-active - Duplicate focusable element IDs (100 pages)

`"navbarDropdown"` ID appears 3 times on every page. This breaks accessibility for screen readers and keyboard navigation.

**Fix:** Make navbar dropdown IDs unique (e.g., `navbarDropdown-1`, `navbarDropdown-2`, `navbarDropdown-3`).

---

#### a11y/select-name - Select without accessible name (1 page)

`select[name="withRating"]` on /companies has no accessible name.

**Fix:** Add `aria-label` or associate a `<label>` with the select element.

---

#### a11y/aria-command-name - Command element without name (1 page)

`a[href=""]` on /companies/ip-gasanov-da5db8ec has no accessible name.

**Fix:** Add text content or `aria-label` to the empty link element.

---

#### a11y/aria-input-field-name - Input without accessible name (1 page)

`select[name="withRating"]` on /companies page. Same element as select-name issue.

**Fix:** Same as a11y/select-name above.

---

#### a11y/form-labels - Form inputs without labels (1 page)

On /companies page: `searchQuery` and `withRating` inputs lack associated labels.

**Fix:** Add `<label>` elements or `aria-label` attributes to the search input and rating filter select.

---

### Crawlability (1 error)

#### crawl/sitemap-valid - Invalid sitemap format (8 sitemaps)

The following sitemap URLs return invalid/unknown format:
- /sitemap.xml
- /sitemap_index.xml
- /sitemap-index.xml
- /sitemaps.xml
- /sitemap1.xml
- /post-sitemap.xml
- /page-sitemap.xml
- /news-sitemap.xml

**Fix:** Ensure the SSR server returns proper XML sitemap format. Only /sitemap.xml needs to exist; the others are common paths crawlers check. Ensure /sitemap.xml returns valid XML with proper `Content-Type: application/xml` header.

---

## Warnings (1291 total)

### Performance (560 warnings)

#### perf/ttfb - Slow server response (93 pages)

Time to First Byte ranges from 601ms to 2664ms across 93 pages. Values above 600ms are flagged as slow, above 1000ms as very slow.

**Fix:** Server-side optimization needed - SSR rendering time, API response caching, CDN configuration.

---

#### perf/lcp-hints - LCP images without preload (100 pages)

Up to 3 potential LCP images per page lack `<link rel="preload">` hints:
- cat_logo.png
- main_transparent_1000.png
- main_charts_transparent_1000.png
- cat_reviewing_transparent_1000.png

**Fix:** Add `<link rel="preload" as="image">` tags in `<head>` for above-fold images, or use Angular's `NgOptimizedImage` with `priority` attribute.

---

#### perf/cls-hints - Images without width/height causing CLS (100 pages)

8 images missing explicit dimensions:
- cat_logo.png
- main_transparent_1000.png
- main_charts_transparent_1000.png
- company_reviews_1000.png
- main_interview_transparent_1000.png
- cat_reviewing_transparent_1000.png

**Fix:** Add `width` and `height` attributes to all `<img>` tags.

---

#### perf/css-file-size - Large CSS file (all pages)

`styles-DAMJU4DQ.css` is 343.4 KB, exceeding the 100 KB recommendation.

**Fix:** Audit unused CSS. Consider PurgeCSS or tree-shaking unused Bootstrap styles. Split critical CSS.

---

#### perf/dom-size - Large DOM (2 pages)

- /salaries/overview: Element with 66 children
- /companies/kaspi-kz-ed1cf120: Large DOM (1690 nodes)

**Fix:** Consider virtual scrolling for large lists, lazy rendering for off-screen content.

---

#### perf/total-byte-weight - Heavy page weight (site-wide)

Total tracked resources: 7828 KB (very heavy).

**Fix:** Optimize images (WebP/AVIF), lazy load non-critical JS, tree-shake unused code.

---

#### perf/critical-request-chains - Render-blocking resources (100 pages)

1 critical request chain: `styles-DAMJU4DQ.css`

**Fix:** Inline critical CSS, defer non-critical stylesheets, or use `media` attribute for conditional loading.

---

#### perf/unminified-js - Unminified JavaScript (100 pages)

`scripts-4XNZKFXB.js` (105.1 KB) appears unminified with 11 comments. Potential savings: ~44.5 KB.

**Fix:** Ensure production build strips comments. Check Angular build configuration for `optimization` settings.

---

#### perf/cache-headers - No caching headers (100 pages)

HTML pages have no caching headers.

**Fix:** Configure the Express SSR server or reverse proxy to set `Cache-Control` headers for HTML responses (e.g., `public, max-age=300, s-maxage=3600`).

---

### Accessibility (129 warnings)

#### a11y/color-contrast - Low contrast text (100 pages)

Multiple color contrast issues across all pages:
- CSS variable `:root` defines light RGB text colors
- `.bg-white` uses silver/gainsboro text
- `.text-muted` elements have low contrast
- White text instances that may lack sufficient background contrast
- Specific elements: `div.small.text-muted`, `span.text-muted`, `button.text-muted`

**Fix:** Review CSS custom properties for text-muted colors. Ensure WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text). Update `--warm-text-muted` and Bootstrap's `.text-muted` override.

---

#### a11y/identical-links-same-purpose - Same link text, different URLs (1 page)

On /salaries/overview: "techinterview.space" links to 2 different URLs.

**Fix:** Differentiate link text or ensure same text leads to the same destination.

---

#### a11y/image-redundant-alt - Redundant alt text (27 pages)

`cat_reviewing_transparent_1000.png` has alt text "logo" on 27 company detail pages. Alt text repeats surrounding context.

**Fix:** Use more descriptive alt text (e.g., "techinterview.space mascot") or set `alt=""` if purely decorative.

---

#### a11y/link-text - Link with no accessible text (1 page)

Empty link on /companies/ip-gasanov-da5db8ec.

**Fix:** Add text content, `aria-label`, or remove the empty link.

---

#### a11y/table-duplicate-name - Tables without accessible names (1 page)

11 tables on /salaries/overview lack accessible names.

**Fix:** Add `aria-label` or `<caption>` to each salary data table.

---

### Core SEO (205 warnings)

#### core/canonical - Missing canonical URL (1 page)

Homepage (/) has no canonical URL.

**Fix:** Add `<link rel="canonical" href="https://techinterview.space/">` to the homepage `<head>`.

---

#### core/og-tags - Missing og:image (96 pages)

96 company detail pages lack `og:image` meta tag. Social media shares will have no preview image.

**Fix:** Add a default `og:image` in `meta-tags.service.ts` for company pages. Use company logo if available, or a default site image.

---

#### core/title-unique - Duplicate titles (2 pages)

/companies and /companies/recent-reviews share the same title: "отзывы об it компаниях - techinterview.space"

**Fix:** Give /companies/recent-reviews a unique title (e.g., "Последние отзывы об IT компаниях - techinterview.space").

---

#### core/twitter-cards - Invalid Twitter card type (1 page)

Homepage has twitter:card set to an image URL instead of a valid card type.

**Fix:** Set `twitter:card` to `summary_large_image` and use a separate `twitter:image` tag for the image URL.

---

### Security (204 warnings)

#### security/csp - No Content-Security-Policy header (all pages)

**Fix:** Configure CSP header on the server/reverse proxy. Example: `Content-Security-Policy: default-src 'self'; script-src 'self' www.googletagmanager.com; img-src 'self' techinterview.fra1.cdn.digitaloceanspaces.com; style-src 'self' 'unsafe-inline'`

---

#### security/hsts - Missing Strict-Transport-Security header (all pages)

**Fix:** Add `Strict-Transport-Security: max-age=31536000; includeSubDomains` header on the server/reverse proxy.

---

#### security/x-frame-options - No clickjacking protection (all pages)

**Fix:** Add `X-Frame-Options: SAMEORIGIN` header on the server/reverse proxy.

---

#### security/new-tab - External links missing rel="noopener" (100 pages)

97 external links across all pages lack `rel="noopener"` attribute. These are mostly company website URLs in the footer and company detail pages.

**Fix:** Add `rel="noopener noreferrer"` to all external `<a target="_blank">` links. Add a global directive or update templates.

---

#### security/http-to-https - HTTP to HTTPS redirects (20 URLs)

20 HTTP URLs on the site properly redirect to HTTPS via 301. This is informational - the redirects are correct.

---

### Images (102 warnings)

#### images/offscreen-lazy - Missing lazy loading (1 page)

On homepage (/), 2 below-fold images lack lazy loading:
- company_reviews_1000.png
- main_interview_transparent_1000.png

**Fix:** Add `loading="lazy"` attribute to below-fold images on the homepage.

---

#### images/dimensions - Missing width/height (100 pages)

Same as perf/cls-hints. 5-8 images per page lack explicit dimensions.

**Fix:** Add `width` and `height` attributes to all `<img>` tags.

---

### Content (74 warnings)

#### content/duplicate-title - Duplicate titles (2 pages)

/companies and /companies/recent-reviews share the same title.

**Fix:** Same as core/title-unique above.

---

#### content/duplicate-description - Duplicate descriptions (2 pages)

/companies and /companies/recent-reviews share the same meta description: "отзывы об it компаниях в казахстане"

**Fix:** Give /companies/recent-reviews a unique, longer description.

---

#### content/keyword-stuffing - Overused words (2 pages)

- /salaries/overview: "kzt" (4.9%), "techinterview" (3.8%), "developer" (3.6%), "source" (3.0%)
- /companies/snoonu-2b4e380d: "snoonu" (3.6%)

**Fix:** Varies the wording. Add more contextual content to dilute keyword density.

---

#### content/word-count - Thin content (70 pages)

70 pages have fewer than 300 words. Word counts range from 123 to 287. Primarily company detail pages with limited reviews.

**Fix:** This is partially data-driven (companies with few reviews). Consider adding more static informational content to company page templates (e.g., "About this company", FAQ sections, related companies).

---

### Links (7 warnings)

#### links/broken-external-links - 10 broken external links

| URL | Error | Source Page |
|-----|-------|-------------|
| https://astana-motors.kz/ | unable to verify the first certificate | /companies/astana-motors-07ff34a1 |
| http://ozon.kz/ | timeout | /companies/ozon-35ea03dc |
| https://wildberries.ru/ | 498 | /companies/wildberries-d7b1d6a3 |
| https://www.alma.plus/ | unable to verify the first certificate | /companies/alma-plus-a12796b9 |
| https://www.kassa24.kz/ | timeout | /companies/kassa24-kz-11f649ff |
| https://akvelon.com/ | unable to verify the first certificate | /companies/akvelon-df835fc8 |
| https://www.onevision.kz/ | DNS/connection error | /companies/one-vision-b97e4d5e |
| https://ekt.kz/ | unable to verify the first certificate | /companies/ekt-kz-999ce499 |
| https://qmed.kz/ | 404 | /companies/q-med-qbots-9e00a6b8 |
| https://targetai.kz/ | timeout | /companies/target-ai-09c100ee |

**Fix:** These are company website URLs stored in the backend database. Review and update in the admin panel. Consider adding link health monitoring.

---

#### links/https-downgrade - HTTP links (4 pages)

4 company pages link to HTTP instead of HTTPS:
- http://jusan.kz (from /companies/jusan-bank-4b41097f)
- http://ozon.kz (from /companies/ozon-35ea03dc)
- http://aviasales.kz (from /companies/aviasales-1f91044d)
- http://ticketon.kz (from /companies/ticketon-kz-69397a57)

**Fix:** Update these URLs in the backend database to use HTTPS. Consider adding a frontend safeguard that upgrades HTTP links to HTTPS.

---

#### links/orphan-pages - Pages with <2 incoming links (97 pages)

97 pages (mostly company detail pages) have fewer than 2 internal links pointing to them. They're only reachable via sitemap or direct URL.

**Fix:** Improve internal linking. Add "Related companies" sections, breadcrumbs, or sidebar navigation on company pages.

---

#### links/weak-internal-links - Pages with only 1 internal link (6 pages)

6 company pages have only 1 internal link:
- /companies/kaspi-kz-ed1cf120
- /companies/documentolog-ec7cdf35
- /companies/globerce-capital-573c96e5
- /companies/halyk-bank-0b0293e3
- /companies/kolesa-group-081c7566
- /companies/mdlbeast-959fc753

**Fix:** Same as orphan-pages above - improve internal linking structure.

---

### Crawlability (3 warnings)

#### crawl/canonical-chain - Redirect before content (2 pages)

Pages with Cyrillic characters in URLs redirect:
- /companies/%D0%B0%D0%BA-air-astana-ba830aa0
- /companies/home-credit-%D0%B1%D0%B0%D0%BD%D0%BA-d28595a1

**Fix:** Ensure the SSR server serves these URLs directly without redirecting. Or update the sitemap to use the final URL form.

---

#### crawl/sitemap-coverage - Uncrawled sitemap URLs (19 pages)

19 URLs in the sitemap were not reached during the crawl (surface coverage limit). Includes /about-us, /about-telegram-bot, /agreements/privacy-policy, and 16 company pages.

**Fix:** Not an issue per se - these pages exist in the sitemap but weren't reached due to surface crawl limits. A full crawl would cover them.

---

### URL Structure (4 warnings)

#### url/lowercase - Uppercase characters in URLs (2 pages)

- /companies/%D0%B0%D0%BA-air-astana-ba830aa0
- /companies/home-credit-%D0%B1%D0%B0%D0%BD%D0%BA-d28595a1

These contain URL-encoded Cyrillic characters with uppercase hex encoding (%D0%B0 etc.).

**Fix:** This is standard URL encoding behavior. Consider transliterating Cyrillic slugs to Latin characters in the backend.

---

#### url/special-chars - Non-ASCII characters in URLs (2 pages)

Same 2 pages as above contain Cyrillic characters.

**Fix:** Same as url/lowercase - consider Latin transliteration for URL slugs.

---

### E-E-A-T (3 warnings)

#### eeat/about-page - No About page found

The crawler didn't find an About page. Note: /about-us exists in the sitemap but wasn't crawled.

**Fix:** Ensure /about-us is linked from the main navigation or footer so crawlers can discover it.

---

#### eeat/contact-page - No Contact page found

**Fix:** Add a contact page or contact section, or ensure contact information is visible and crawlable.

---

#### eeat/privacy-policy - No Privacy Policy page found

The crawler didn't find a privacy policy. Note: /agreements/privacy-policy exists in the sitemap but wasn't crawled.

**Fix:** Ensure /agreements/privacy-policy is linked from the footer on all pages so crawlers can discover it.

---

## Priority Action Plan

### High Priority (Frontend Code Fixes)

1. **Add H1 tags** to all page templates (90 pages affected)
2. **Fix duplicate `navbarDropdown` IDs** in navbar (100 pages affected)
3. **Add `rel="noopener noreferrer"` to external links** (100 pages affected)
4. **Add image width/height attributes** (100 pages affected)
5. **Add form labels** to search and filter inputs on /companies
6. **Fix homepage meta title** (currently 19 chars, needs 30-60)
7. **Fix Twitter card type** on homepage
8. **Add canonical URL** to homepage
9. **Add og:image** to company pages
10. **Add lazy loading** to below-fold homepage images
11. **Add LCP preload hints** for above-fold images

### Medium Priority (Frontend + Content Fixes)

12. **Improve meta descriptions** to 120-160 characters
13. **Fix duplicate titles/descriptions** for /companies vs /companies/recent-reviews
14. **Improve color contrast** for `.text-muted` elements
15. **Fix redundant alt text** ("logo" -> descriptive text)
16. **Ensure About and Privacy Policy pages are linked in footer**
17. **Add table captions** on /salaries/overview

### Low Priority (Infrastructure/Backend Fixes)

18. **Add security headers** (CSP, HSTS, X-Frame-Options) - server config
19. **Add cache headers** for HTML responses - server config
20. **Fix broken external links** - backend data update
21. **Upgrade HTTP links to HTTPS** - backend data update
22. **Optimize CSS bundle size** (343 KB) - build config
23. **Improve TTFB** - server-side caching/optimization
24. **Add more internal linking** to reduce orphan pages
25. **Transliterate Cyrillic URL slugs** - backend change
