import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import {
  CurrenciesCollectionService,
  CurrencyChartResponse,
  WeeklyCurrencyChartData,
} from "@services/currencies-collection.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CurrenciesChartObject } from "./currencies-chart-object";

@Component({
  selector: "app-currencies-chart-page",
  templateUrl: "./currencies-chart-page.component.html",
  styleUrls: ["./currencies-chart-page.component.scss"],
  standalone: false,
})
export class CurrenciesChartPageComponent implements OnInit, OnDestroy {
  chartData: WeeklyCurrencyChartData[] | null = null;
  chart: CurrenciesChartObject | null = null;
  readonly canvasId = "currencies_chart_" + Math.random().toString(36);
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly currenciesService: CurrenciesCollectionService,
  ) {
    this.titleService.setTitle("График курсов валют");
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
    this.chart?.destroy();
  }

  private loadChartData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.currenciesService
      .getChartData()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response: CurrencyChartResponse) => {
          // API returns { weeklyData: [...], fromDate, toDate }
          this.chartData = response.weeklyData ?? [];
          this.isLoading = false;

          // Initialize chart after data is loaded and view is ready
          setTimeout(() => this.initChart(), 0);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            "Не удалось загрузить данные графика. Попробуйте позже.";
          console.error("Failed to load currency chart data:", err);
        },
      });
  }

  private initChart(): void {
    if (!this.chartData || this.chartData.length === 0) {
      return;
    }

    this.chart?.destroy();
    this.chart = new CurrenciesChartObject(this.canvasId, this.chartData);

    const chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }

  refresh(): void {
    this.loadChartData();
  }
}
