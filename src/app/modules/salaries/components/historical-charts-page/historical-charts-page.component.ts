import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import {
  GetSalariesHistoricalChartResponse,
  HistoricalChartsService,
} from "@services/historical-charts.service";

@Component({
  templateUrl: "./historical-charts-page.component.html",
  styleUrls: ["./historical-charts-page.component.scss"],
  standalone: false,
})
export class HistoricalChartsPageComponent implements OnInit, OnDestroy {
  data: GetSalariesHistoricalChartResponse | null = null;

  constructor(
    private readonly service: HistoricalChartsService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly titleService: TitleService,
    private readonly gtag: GoogleAnalyticsService,
  ) {
    titleService.setTitle("Исторические данные");
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.load();
      return;
    }

    this.cookieService.set("url", this.router.url);
    this.authService.login().pipe(untilDestroyed(this)).subscribe();
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }

  load(): void {
    this.data = null;
    this.gtag.event("historical_charts_load", "historical_data");

    this.service
      .salariesChart()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.data = x;
      });
  }
}
