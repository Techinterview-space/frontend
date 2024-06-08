import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { HealthCheckService } from "@shared/health-check/health-check.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { HealthCheckItem } from "../health-check-table/health-check-item";
import { JobItem } from "../jobs-table/job-item";
import { AdminToolsService, Currency } from "@services/admin-tools.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CurrencyItem } from "./currency-item";

@Component({
  selector: "app-background-jobs",
  templateUrl: "./background-jobs.component.html",
  styleUrls: ["./background-jobs.component.scss"],
})
export class BackgroundJobsComponent implements OnInit, OnDestroy {
  authorizationToken: string | null = null;
  configs: string | null = null;
  healthCheckItems: Array<HealthCheckItem> = [];
  currencies: Array<CurrencyItem> = [];

  constructor(
    private readonly authService: AuthService,
    private readonly titleService: TitleService,
    private readonly healthCheckService: HealthCheckService,
    private readonly adminToolsService: AdminToolsService
  ) {
    this.titleService.setTitle("Инструменты");
  }

  ngOnInit(): void {
    this.authorizationToken = this.authService.getAuthorizationHeaderValue();

    this.healthCheckItems = [
      new HealthCheckItem("API", "API для запросов", () =>
        this.healthCheckService.backend()
      ),
    ];

    this.checkHealth();

    this.adminToolsService
      .getCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe((currencies) => {
        this.currencies = currencies.map((x) => new CurrencyItem(x));
      });

    this.adminToolsService
      .getConfigs()
      .pipe(untilDestroyed(this))
      .subscribe((configs) => {
        this.configs = JSON.stringify(configs, null, 4);
      });
  }

  checkHealth(): void {
    this.healthCheckItems.forEach((x) => x.execute());
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
