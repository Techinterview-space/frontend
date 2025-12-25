import { Component, Input, AfterViewInit } from "@angular/core";
import { SalariesByGenderChart } from "@services/user-salaries.service";
import { SalariesByGenderChartObject } from "./salaries-by-gender-chart-object";

@Component({
  selector: "app-salaries-by-gender-chart",
  templateUrl: "./salaries-by-gender-chart.component.html",
  styleUrl: "./salaries-by-gender-chart.component.scss",
  standalone: false,
})
export class SalariesByGenderChartComponent implements AfterViewInit {
  @Input()
  source: SalariesByGenderChart | null = null;

  chartData: SalariesByGenderChartObject | null = null;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart(): void {
    if (this.source == null) {
      return;
    }

    this.chartData = this.initChartWithParams(this.canvasId, this.source);
  }

  private initChartWithParams(
    canvasId: string,
    data: SalariesByGenderChart,
  ): SalariesByGenderChartObject {
    const chart = new SalariesByGenderChartObject(canvasId, data);

    const chartEl = document.getElementById(canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }

    return chart;
  }
}
