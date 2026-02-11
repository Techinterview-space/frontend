export const canonicalSitemapUrl = "https://api.techinterview.space/api/sitemap.xml";

interface RedirectLike {
  redirect(status: number, target: string): unknown;
}

export function redirectToCanonicalSitemap(res: RedirectLike): void {
  res.redirect(301, canonicalSitemapUrl);
}
