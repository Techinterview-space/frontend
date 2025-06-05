import { Component, Input } from "@angular/core";
import { ItemsPerDayChartData } from "@shared/value-objects/items-per-day-chart-data";
import { ItemsPerDayChart } from "./items-per-day-chart";

@Component({
  selector: "app-items-per-day-chart",
  templateUrl: "./items-per-day-chart.component.html",
  styleUrl: "./items-per-day-chart.component.scss",
  standalone: false,
})
export class ItemsPerDayChartComponent {
  @Input()
  title: string | null = null;

  @Input()
  datasetTitle: string | null = null;

  @Input()
  source: ItemsPerDayChartData | null = null;

  chartData: ItemsPerDayChart | null = null;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy(): void {}

  private initChart(): void {
    if (this.source == null) {
      return;
    }

    this.chartData = new ItemsPerDayChart(
      this.canvasId,
      this.datasetTitle ?? "Тренд данных",
      this.source,
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
