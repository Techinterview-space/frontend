import { RenderMode, ServerRoute } from "@angular/ssr";

/**
 * Server routes configuration for hybrid SSR/SPA.
 *
 * - RenderMode.Server: Page rendered on server (SSR) - good for SEO/meta tags
 * - RenderMode.Client: Page rendered on client (SPA) - default behavior
 *
 * Only pages that need meta tags for social sharing should use Server mode.
 */
export const serverRoutes: ServerRoute[] = [
  // ===== SSR Pages (for meta tags/SEO) =====
  // Company pages - need meta tags for social sharing
  { path: "companies", renderMode: RenderMode.Server },
  { path: "companies/:id", renderMode: RenderMode.Server },

  { path: "about-us", renderMode: RenderMode.Server },
  { path: "about-telegram-bot", renderMode: RenderMode.Server },
  { path: "agreements/privacy-policy", renderMode: RenderMode.Server },
  { path: "about-telegram-bot", renderMode: RenderMode.Server },

  // Home page - for SEO
  { path: "", renderMode: RenderMode.Server },

  // ===== SPA Pages (client-side rendering) =====
  // Auth pages - no SSR needed, use browser APIs
  { path: "auth-callback", renderMode: RenderMode.Client },
  { path: "logout-callback", renderMode: RenderMode.Client },

  // Admin pages - authenticated, no SEO needed
  { path: "admin/**", renderMode: RenderMode.Client },

  // User pages - authenticated
  { path: "salaries", renderMode: RenderMode.Client },
  { path: "salaries/**", renderMode: RenderMode.Client },
  { path: "me", renderMode: RenderMode.Client },
  { path: "me/**", renderMode: RenderMode.Client },
  { path: "users/**", renderMode: RenderMode.Client },

  // Interview pages - authenticated
  { path: "interviews/**", renderMode: RenderMode.Client },

  // Default: all other pages as SPA
  { path: "**", renderMode: RenderMode.Client },
];
