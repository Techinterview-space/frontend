# Generative Engine Optimization (GEO) & SEO

This document describes the SEO and GEO techniques applied to Techinterview.space to make salary data and company reviews visible to search engines and AI systems, and to ensure "Techinterview.space" is cited as the source.

## What is GEO?

Generative Engine Optimization (GEO) is the practice of making website content discoverable and correctly attributed by AI-powered search engines and large language models (ChatGPT, Claude, Perplexity, Google AI Overviews, etc.). Unlike traditional SEO which targets search engine result pages, GEO targets AI systems that synthesize answers from web content.

AI bots crawl HTML pages similarly to search engine crawlers. They rely on:
- Visible text content in the DOM (not client-rendered JavaScript)
- Structured data (JSON-LD / Schema.org)
- Semantic HTML elements (`<article>`, `<figure>`, `<cite>`, `<table>`)
- Meta tags and canonical URLs for source attribution

## Problem

The main salary page (`/salaries`) requires client-side authentication and renders interactive Chart.js visualizations. This means:
- Bots see an empty shell (no salary data in HTML)
- No structured data tells AI systems where the data came from
- No consistent brand signal for attribution

Company pages had SSR but lacked structured data for ratings and reviews.

## Applied Techniques

### 1. Bot-Friendly Salary Overview Page

**Route:** `/salaries/overview`
**Files:** `modules/salaries/components/salaries-overview/`

A lightweight, server-side rendered page that presents all salary data as plain HTML tables. This page exists alongside the interactive `/salaries` page.

**Why it helps:**
- SSR (`RenderMode.Server` in `app.routes.server.ts`) means bots receive fully rendered HTML with all data visible in the DOM on first request
- Plain `<table>` elements are the most reliable format for AI systems to parse tabular data
- No authentication required — the page calls the backend API with `allowReadonly=true` to bypass the salary-form-filled check

**Backend change:** The `GET /api/salaries/chart` endpoint accepts an `allowReadonly` query parameter. When `true`, the handler skips the authentication and salary-filled checks and returns full aggregated chart data. The existing `/salaries` page continues to enforce these checks as before.

**Data sections rendered:**
- Summary (total count, average/median for local and remote)
- Salaries by grade (local and remote)
- Salary distribution by grade (min, Q1, median, mean, Q3, max)
- Salaries by city, experience, age
- Profession distribution, skills, work industries
- Gender distribution

### 2. JSON-LD Structured Data (Schema.org)

JSON-LD is the primary mechanism for AI systems to identify what a page contains and who published it.

#### 2.1 Global Schemas (index.html)

Two static schemas in `<head>` on every page:

**Organization** — Tells AI systems the publisher identity:
```json
{
  "@type": "Organization",
  "name": "Techinterview.space",
  "url": "https://techinterview.space"
}
```

**WebSite** — Identifies the site as a whole:
```json
{
  "@type": "WebSite",
  "name": "Techinterview.space",
  "url": "https://techinterview.space",
  "publisher": { "@type": "Organization", "name": "Techinterview.space" }
}
```

#### 2.2 Dataset Schema (Salary Overview)

**File:** `services/json-ld.service.ts` (`setDatasetSchema()`)

Injected dynamically on `/salaries/overview`:
```json
{
  "@type": "Dataset",
  "name": "IT Salaries in Kazakhstan — Techinterview.space",
  "creator": { "@type": "Organization", "name": "Techinterview.space" },
  "publisher": { "@type": "Organization", "name": "Techinterview.space" },
  "spatialCoverage": { "@type": "Place", "name": "Kazakhstan" }
}
```

**Why it helps:** The `Dataset` type is specifically designed for statistical/research data. The `creator` and `publisher` fields with `"name": "Techinterview.space"` are the strongest signal for AI attribution.

#### 2.3 EmployerAggregateRating Schema (Company Pages)

**File:** `services/json-ld.service.ts` (`setEmployerAggregateRating()`)

Injected on each `/companies/:slug` page when the company has reviews:
```json
{
  "@type": "EmployerAggregateRating",
  "itemReviewed": { "@type": "Organization", "name": "<company>" },
  "ratingValue": 4.2,
  "reviewCount": 15,
  "bestRating": 5,
  "worstRating": 1
}
```

**Why it helps:** Google and AI systems use this to show star ratings in search results and to cite the rating source.

#### 2.4 Review Schema (Company Pages)

**File:** `services/json-ld.service.ts` (`setReviews()`)

Individual review schemas injected for each visible review on company pages.

**Why it helps:** Enables rich snippets in search results and gives AI systems structured access to review data with dates and ratings.

#### 2.5 BreadcrumbList Schema

**File:** `services/json-ld.service.ts` (`setBreadcrumbList()`)

Injected on nested pages:
- Company page: Home > Companies > {CompanyName}
- Salary overview: Home > Salaries > Overview

**Why it helps:** Breadcrumb schemas help search engines understand site hierarchy and display breadcrumb trails in search results. AI systems use them to understand page context within the site.

### 3. Canonical Tags

**File:** `services/meta-tags.service.ts` (`setCanonicalUrl()` / `removeCanonicalUrl()`)

A `<link rel="canonical">` tag is set on every page:
- Company pages: `https://techinterview.space/companies/{slug}`
- Salary overview: `https://techinterview.space/salaries/overview`
- Static pages: full URL via `setPageMetaTags()`
- Default: `https://techinterview.space`

**Why it helps:**
- Prevents duplicate content issues (e.g., query parameters creating multiple URLs for the same content)
- Tells AI systems the authoritative URL for each page, which they use as the source link when citing data
- The domain in the canonical URL reinforces brand attribution

### 4. HTML-Level Source Attribution

Every data table on the salary overview page uses semantic HTML:

```html
<figure>
  <table><!-- salary data --></table>
  <figcaption>
    Source: <cite><a href="https://techinterview.space/salaries">Techinterview.space</a></cite>
  </figcaption>
</figure>
```

**Why it helps:**
- `<figure>` + `<figcaption>` semantically associates the attribution text with the data table
- `<cite>` explicitly marks the source name
- AI systems that extract tabular data will see the attribution text directly adjacent to the data
- This is a fallback attribution signal when structured data is not parsed

### 5. robots.txt Configuration

**File:** `src/robots.txt`

```
# AI content usage signals (https://contentsignals.org/)
User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
Disallow: /admin
Disallow: /me
Disallow: /auth-callback
Disallow: /logout-callback
Allow: /salaries/overview
Disallow: /salaries

User-agent: GPTBot
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /salaries/overview
Disallow: /salaries
Allow: /companies
Allow: /

User-agent: ClaudeBot
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /salaries/overview
Disallow: /salaries
Allow: /companies
Allow: /
...

Sitemap: https://api.techinterview.space/api/sitemap.xml
```

**Format notes that matter for agent-discovery scanners:**
- `Content-Signal` is the very first directive after each `User-agent:` line — no comments in between. Several scanners (including isitagentready.com's parser) tokenize a User-agent group as the contiguous lines under it, and an interleaved comment can break the association.
- Value order is `ai-train, search, ai-input` to match the reference format used by isitagentready.com and the IETF draft examples. Order is not semantically meaningful per the spec, but parser fragility makes it cheap insurance.

**Why it helps:**
- Blocks private/authenticated pages from being crawled (`/admin`, `/me`, `/auth-callback`, `/logout-callback`)
- Blocks all `/salaries/*` pages (which require authentication) except `/salaries/overview` (the public bot-friendly page). The `Allow` rule is placed before `Disallow` and uses longest-match-wins semantics
- Explicitly allows AI bot user agents (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Bytespider) to crawl public content
- Points crawlers to the dynamic sitemap for discovery
- **Content-Signal directive** (https://contentsignals.org/) declares per-purpose AI usage preferences: `search=yes` (search indexing allowed), `ai-input=yes` (live grounding for AI assistants allowed), `ai-train=no` (model training disallowed). The signal is repeated under each AI-crawler stanza (`GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `Bytespider`) as well as the global `User-agent: *` group, because some scanners only associate Content-Signal with the stanza it appears in

### 9. Agent-Discovery Endpoints

A set of `.well-known` resources is served by the Express SSR layer (`src/server.ts`) so AI agents can discover the platform without scraping HTML.

| Endpoint | Spec | What it advertises |
|---|---|---|
| `/.well-known/api-catalog` | RFC 9727 | Linkset pointing at backend OpenAPI spec (`https://api.techinterview.space/swagger/v1/swagger.json`), Swagger UI, and `/health` |
| `/.well-known/agent-skills/index.json` | Agent Skills Discovery RFC v0.2.0 | One `site-overview` skill (type `discovery`) with a sha256 hash for integrity |
| `/.well-known/agent-skills/site-overview/SKILL.md` | (skill content) | Plain markdown describing public surfaces and attribution rules |
| `/.well-known/oauth-authorization-server` | RFC 8414 | OAuth 2.0 authorization server metadata — issuer, token endpoint (`api.techinterview.space/api/auth/m2m/token`), and the client-credentials grant. Lives on the frontend because the JWT `iss` claim is the frontend origin |

All payloads are static and live in `src/server/well-known.ts`. The skill markdown is hashed at module load — editing the markdown automatically updates the published sha256.

The protected-resource counterpart (RFC 9728) lives on the backend at `https://api.techinterview.space/.well-known/oauth-protected-resource` because per-spec it must be served at the resource origin (`web-api/src/Web.Api/Features/WellKnown/WellKnownController.cs`).

Every SSR response also carries a `Link` header (RFC 8288) advertising the two well-known JSON endpoints, so agents that don't scrape HTML still discover them from any request.

### 11. WebMCP In-Browser Tools

**File:** `src/app/services/web-mcp.service.ts`

Wired via `AppComponent.ngOnInit()`. Calls `navigator.modelContext.provideContext({ tools: [...] })` on app boot when running in the browser and the API is available (feature-detected). Exposes three read-only tools that return canonical URLs:

- `search-salaries-overview` — optional `profession` filter; returns the public `/salaries/overview` URL
- `search-companies` — optional `query`; returns `/companies` with the query as `?q=…`
- `fetch-site-overview` — returns the URL of the agent-skill markdown

The service is SSR-safe (`isPlatformBrowser` guard) and a no-op when `navigator.modelContext` is not present (most environments today).

### 10. Markdown Content Negotiation

The SSR handler honours `Accept: text/markdown`. When a client (typically an AI agent) sends that header, the rendered HTML is converted to markdown via `turndown` and returned as `Content-Type: text/markdown; charset=utf-8`. Browsers without an explicit markdown accept still receive HTML.

The response also sets:
- `X-Markdown-Tokens` — byte length of the markdown body, useful as a coarse token-budget proxy.
- `Vary: Accept` — so caches do not serve HTML to markdown clients or vice versa.

Implementation: `src/server.ts` (the final `app.use(...)` SSR handler). The turndown instance strips `<script>`, `<style>`, `<noscript>`, and `<iframe>` before conversion.

### 6. Dynamic Sitemap

**Backend endpoint:** `GET /api/sitemap.xml`
**Files:** `web-api/src/Web.Api/Features/Sitemaps/`

Replaced the static `sitemap.xml` (which had only 10 hardcoded companies) with a dynamic backend endpoint that:
- Queries all non-deleted companies from the database
- Includes all static pages (home, companies, salary overview, about, etc.)
- Sets `<lastmod>` from each company's `UpdatedAt` timestamp
- Sets `<changefreq>` and `<priority>` based on review count
- Cached for 1 hour via `[ResponseCache]`

**Why it helps:**
- Search engines and AI crawlers discover all company pages, not just a hardcoded subset
- `<lastmod>` dates tell crawlers which pages have fresh content
- `<priority>` hints help crawlers prioritize high-value pages

### 7. Consistent Branding

All brand references standardized to "Techinterview.space" (capital T):
- `og:site_name`, `og:title`, `twitter:title` in `index.html`
- All JSON-LD `name` fields (`Organization`, `Dataset`, `WebSite`)
- Page `<title>` tags (via `title.service.ts` appending " - Techinterview.space")
- `<cite>` elements in data tables
- Dynamic meta tags in `meta-tags.service.ts`

**Why it helps:** AI systems determine source names from multiple signals. When all signals consistently say "Techinterview.space", the AI is highly likely to cite exactly that string rather than a URL or variation.

### 8. Meta Tags (Open Graph + Twitter)

**File:** `services/meta-tags.service.ts`

Dynamic meta tags set per page:
- `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`
- `twitter:title`, `twitter:description`, `twitter:image`, `twitter:card`
- `description`, `googlebot`

**Why it helps:**
- Social sharing previews (when links are shared on social media or chat)
- AI systems parse `og:site_name` as a strong attribution signal
- `description` meta tag provides a summary for AI context

## How AI Systems Determine Source Name

Signals ranked by strength:

| Signal | Where | Priority |
|--------|-------|----------|
| JSON-LD `creator.name` / `publisher.name` | Structured data in `<head>` | Highest |
| `og:site_name` | Meta tag | High |
| `<title>` tag suffix | Page title | High |
| Canonical URL domain | `<link rel="canonical">` | High |
| `<cite>` elements near data | In-page HTML | Medium |
| Footer / header brand text | Visible page content | Medium |
| Domain name from URL | URL bar | Baseline |

## File Reference

| File | What it does |
|------|-------------|
| `src/app/services/json-ld.service.ts` | Dynamic JSON-LD injection (Dataset, EmployerAggregateRating, Review, BreadcrumbList) |
| `src/app/services/meta-tags.service.ts` | Dynamic meta tags and canonical URL management |
| `src/index.html` | Static Organization + WebSite schemas, default meta tags |
| `src/robots.txt` | Crawler access rules, Content-Signal directive, sitemap reference |
| `src/app/app.routes.server.ts` | SSR configuration (`RenderMode.Server` for `/salaries/overview`) |
| `src/app/modules/salaries/components/salaries-overview/` | Bot-friendly salary page (HTML tables, no auth) |
| `src/server/well-known.ts` | Static payloads for `/.well-known/api-catalog`, agent-skills index, and `site-overview` SKILL.md |
| `src/server.ts` | Link header, `/.well-known/*` route handlers, markdown content negotiation |
| `web-api/src/Web.Api/Features/Sitemaps/` | Dynamic sitemap endpoint (`GET /api/sitemap.xml`) |

## Verification

After deployment, validate with:

1. **curl test** — `curl https://techinterview.space/salaries/overview` should return full HTML with salary data in tables
2. **Google Rich Results Test** — https://search.google.com/test/rich-results
3. **Schema.org Validator** — https://validator.schema.org/
4. **robots.txt check** — `curl https://techinterview.space/robots.txt`
5. **Sitemap check** — `curl https://techinterview.space/api/sitemap.xml`
6. **Google Search Console** — Fetch as Googlebot to verify SSR rendering
