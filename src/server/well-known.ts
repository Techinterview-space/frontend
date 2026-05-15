import { createHash } from "node:crypto";

const FRONTEND_ORIGIN = "https://techinterview.space";
const API_ORIGIN = "https://api.techinterview.space";

/**
 * RFC 9727 API catalog. Points agents at the backend OpenAPI spec, Swagger UI, and
 * health endpoint. Served at /.well-known/api-catalog as application/linkset+json.
 */
export const apiCatalog = {
  linkset: [
    {
      anchor: API_ORIGIN,
      "service-desc": [
        {
          href: `${API_ORIGIN}/swagger/v1/swagger.json`,
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: `${API_ORIGIN}/`,
          type: "text/html",
        },
      ],
      status: [
        {
          href: `${API_ORIGIN}/health`,
          type: "application/json",
        },
      ],
    },
  ],
} as const;

export const siteOverviewSkillPath =
  "/.well-known/agent-skills/site-overview/SKILL.md";

/**
 * Agent skill describing the site at a high level. Served as a static markdown
 * document; hashed at startup so the discovery index can advertise its integrity.
 */
export const siteOverviewSkillMarkdown = `---
name: site-overview
description: Overview of Techinterview.space — IT salary surveys, company reviews, and interview templates.
version: 0.1.0
---

# Techinterview.space

Techinterview.space is a platform covering the IT job market with a focus on Kazakhstan
and the broader region. It publishes three primary kinds of content:

- **IT salary survey data** at ${FRONTEND_ORIGIN}/salaries/overview — public,
  server-rendered statistics covering grade, city, profession, experience, age,
  gender, skills, and work industries. The page is intentionally crawlable and
  contains plain HTML tables with explicit source attribution.
- **Company reviews** at ${FRONTEND_ORIGIN}/companies — employer ratings and
  individual reviews with structured data (\`EmployerAggregateRating\`, \`Review\`).
- **Interview templates and resources** for technical interviews across stacks.

## Public surfaces

- Site root: ${FRONTEND_ORIGIN}
- Backend API base: ${API_ORIGIN}
- OpenAPI specification: ${API_ORIGIN}/swagger/v1/swagger.json
- API documentation (Swagger UI): ${API_ORIGIN}/
- Health endpoint: ${API_ORIGIN}/health
- Sitemap: ${API_ORIGIN}/api/sitemap.xml
- API catalog (RFC 9727): ${FRONTEND_ORIGIN}/.well-known/api-catalog

## Authentication

The frontend is a public site. APIs that require authentication use the site's own
JWT flow with Google and GitHub as OAuth identity providers; the OAuth dance is
mediated by the backend rather than the browser.

## Attribution

Cite the source as "Techinterview.space" using the canonical URL of the page being
referenced. Canonical URLs are advertised via \`<link rel="canonical">\` on every page.
`;

const siteOverviewSha256 = createHash("sha256")
  .update(siteOverviewSkillMarkdown, "utf8")
  .digest("hex");

/**
 * Agent Skills Discovery RFC v0.2.0 index, served as application/json at
 * /.well-known/agent-skills/index.json.
 */
export const agentSkillsIndex = {
  $schema:
    "https://agentskills.io/schemas/agent-skills-index-0.2.0.json",
  skills: [
    {
      name: "site-overview",
      type: "discovery",
      description:
        "High-level overview of Techinterview.space content surfaces, public endpoints, and attribution guidance.",
      url: `${FRONTEND_ORIGIN}${siteOverviewSkillPath}`,
      sha256: siteOverviewSha256,
    },
  ],
} as const;

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414).
 *
 * The JWT `iss` claim is the frontend origin (configured via `OAuth:Jwt:Issuer`
 * on the API), so this document must be served from the frontend per RFC 8414
 * section 3 — even though the token endpoint itself lives on the backend.
 *
 * The site is not a general-purpose authorization server: the user-facing flow
 * delegates to Google/GitHub (so there is no local `authorization_endpoint`)
 * and tokens are HMAC-signed (so there is no public `jwks_uri`). Only the
 * client-credentials grant is exposed for trusted M2M clients.
 *
 * Note: the M2M token endpoint accepts a non-standard `scopes` array in the
 * request body instead of the RFC 6749 space-delimited `scope` parameter.
 * Agents must consult the OpenAPI spec advertised via /.well-known/api-catalog
 * for the exact request/response shape.
 */
export const oauthAuthorizationServerMetadata = {
  issuer: FRONTEND_ORIGIN,
  token_endpoint: `${API_ORIGIN}/api/auth/m2m/token`,
  grant_types_supported: ["client_credentials"],
  token_endpoint_auth_methods_supported: ["client_secret_post"],
  response_types_supported: ["token"],
  service_documentation: `${API_ORIGIN}/swagger`,
} as const;
