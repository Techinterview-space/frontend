import { inject, Injectable, Injector, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { environment } from "@environments/environment";

/**
 * Reports a `visitor_hit` event with `visitor_type='human'` on each client-side
 * navigation. A client-side hit means JS executed, i.e. a real human; crawlers
 * and AI agents are counted server-side via the Measurement Protocol. Emitting
 * the same event on both sides yields one comparable `visitor_type` dimension in
 * GA4.
 */
@Injectable({ providedIn: "root" })
export class VisitorAnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);

  init(): void {
    // GA is only configured in production; skip elsewhere so we never resolve
    // GoogleAnalyticsService when its module was not imported.
    if (!isPlatformBrowser(this.platformId)) return;
    if (environment.googleAnalytics.imports.length === 0) return;

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      )
      .subscribe((event) => this.track(event.urlAfterRedirects));
  }

  private track(path: string): void {
    let ga: GoogleAnalyticsService | null = null;
    try {
      ga = this.injector.get(GoogleAnalyticsService, null);
    } catch {
      ga = null;
    }
    ga?.event("visitor_hit", undefined, undefined, undefined, undefined, {
      visitor_type: "human",
      page_location: environment.baseUrl + path,
    });
  }
}
