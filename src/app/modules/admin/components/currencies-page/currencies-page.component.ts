import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { HealthCheckItem } from "../health-check-table/health-check-item";
import { AdminToolsService } from "@services/admin-tools.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CurrencyItem } from "./currency-item";

@Component({
    templateUrl: "./currencies-page.component.html",
    styleUrls: ["./currencies-page.component.scss"],
    standalone: false
})
export class CurrenciesPageComponent implements OnInit, OnDestroy {
  authorizationToken: string | null = null;
  configs: string | null = null;
  healthCheckItems: Array<HealthCheckItem> = [];
  currencies: Array<CurrencyItem> = [];

  constructor(
    private readonly titleService: TitleService,
    private readonly adminToolsService: AdminToolsService
  ) {
    this.titleService.setTitle("Курсы валют");
  }

  ngOnInit(): void {
    this.adminToolsService
      .getCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe((currencies) => {
        this.currencies = currencies.map((x) => new CurrencyItem(x));
      });
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
