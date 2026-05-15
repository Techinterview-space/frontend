import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from "@angular/ssr/node";
import compression from "compression";
import express from "express";
import { join } from "node:path";
import TurndownService from "turndown";
import { redirectToCanonicalSitemap } from "./server/sitemap-redirect.util";
import {
  agentSkillsIndex,
  apiCatalog,
  siteOverviewSkillMarkdown,
  siteOverviewSkillPath,
} from "./server/well-known";

const browserDistFolder = join(import.meta.dirname, "../browser");

const app = express();
const angularApp = new AngularNodeAppEngine();

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  linkStyle: "inlined",
});
turndown.remove(["script", "style", "noscript", "iframe"]);

function clientAcceptsMarkdown(accept: string | undefined): boolean {
  if (!accept) return false;
  // Only honour explicit text/markdown; ignore wildcard accepts to keep browsers on HTML.
  return /(?:^|,\s*)text\/markdown(?:\s*;|\s*,|\s*$)/i.test(accept);
}

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Security headers and agent-discovery hints (RFC 8288 Link relations).
 */
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
      "img-src 'self' data: https://techinterview.fra1.cdn.digitaloceanspaces.com https://via.placeholder.com https://*.googleusercontent.com https://www.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "connect-src 'self' https://api.techinterview.space https://www.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com",
      "frame-ancestors 'self'",
    ].join("; "),
  );
  res.setHeader(
    "Link",
    [
      '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
      '</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
    ].join(", "),
  );
  next();
});

/**
 * Compress textual responses (HTML/CSS/JS/JSON) to reduce transfer size.
 */
app.use(compression());

/**
 * Canonical sitemap endpoint for crawlers that request /sitemap.xml.
 */
app.get("/sitemap.xml", (_req, res) => {
  redirectToCanonicalSitemap(res);
});

/**
 * Agent-discovery endpoints under /.well-known/.
 *   - /.well-known/api-catalog          — RFC 9727 linkset to backend OpenAPI/Swagger/health
 *   - /.well-known/agent-skills/index.json
 *   - /.well-known/agent-skills/site-overview/SKILL.md
 */
app.get("/.well-known/api-catalog", (_req, res) => {
  res.setHeader("Content-Type", "application/linkset+json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(JSON.stringify(apiCatalog));
});

app.get("/.well-known/agent-skills/index.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(JSON.stringify(agentSkillsIndex));
});

app.get(siteOverviewSkillPath, (_req, res) => {
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(siteOverviewSkillMarkdown);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: "1y",
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 *
 * Supports Markdown content negotiation: when a client sends
 * `Accept: text/markdown`, the rendered HTML is converted to markdown and
 * returned as `text/markdown; charset=utf-8`. HTML remains the default for
 * browsers. `Vary: Accept` is set so intermediary caches keep the two
 * representations distinct.
 */
app.use(async (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=3600");
  res.setHeader("Vary", "Accept");
  try {
    const response = await angularApp.handle(req);
    if (!response) {
      next();
      return;
    }

    const wantsMarkdown = clientAcceptsMarkdown(req.headers.accept);
    const contentType = response.headers.get("content-type") ?? "";

    if (wantsMarkdown && contentType.includes("text/html")) {
      const html = await response.text();
      const markdown = turndown.turndown(html);
      const bytes = Buffer.byteLength(markdown, "utf8");
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader("X-Markdown-Tokens", String(bytes));
      res.status(response.status).send(markdown);
      return;
    }

    await writeResponseToNodeResponse(response, res);
  } catch (err) {
    next(err);
  }
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env["pm_id"]) {
  const port = process.env["PORT"] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
