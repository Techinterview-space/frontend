import {
  canonicalSitemapUrl,
  redirectToCanonicalSitemap,
} from "./sitemap-redirect.util";

describe("sitemap redirect", () => {
  it("redirects to canonical sitemap endpoint", () => {
    const res = jasmine.createSpyObj("res", ["redirect"]);

    redirectToCanonicalSitemap(res);

    expect(res.redirect).toHaveBeenCalledWith(301, canonicalSitemapUrl);
  });
});
