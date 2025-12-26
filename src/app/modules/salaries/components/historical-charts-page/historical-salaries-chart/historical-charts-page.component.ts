import { Component, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { HistoricalDataByTemplate } from "@services/historical-charts.service";
import { HistoricalSalariesChartObject } from "./historical-salaries-chart-object";

@Component({
  selector: "app-historical-salaries-chart",
  templateUrl: "./historical-salaries-chart.component.html",
  styleUrls: ["./historical-salaries-chart.component.scss"],
  standalone: false,
})
export class HistoricalSalariesChartComponent implements AfterViewInit, OnDestroy {
  @Input()
  template: HistoricalDataByTemplate | null = null;

  chart: HistoricalSalariesChartObject | null = null;
  readonly canvasId = "canvas_" + Math.random().toString(36);

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  initChart(): void {
    if (this.template == null) {
      return;
    }

    this.chart = new HistoricalSalariesChartObject(this.canvasId, this.template);

    const chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
