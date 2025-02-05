import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { SalariesByGenderChart } from "@services/user-salaries.service";
import { SalariesByGenderChartObject } from "./salaries-by-gender-chart-object";

@Component({
  selector: "app-salaries-by-gender-chart",
  templateUrl: "./salaries-by-gender-chart.component.html",
  styleUrl: "./salaries-by-gender-chart.component.scss",
})
export class SalariesByGenderChartComponent {
  @Input()
  chart: SalariesChart | null = null;

  chartDataLocal: SalariesByGenderChartObject | null = null;
  chartDataRemote: SalariesByGenderChartObject | null = null;

  readonly canvasIdLocal = "canvas_" + Math.random().toString(36);
  readonly canvasIdRemote = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart(): void {
    if (this.chart == null || this.chart.salaries.length == 0) {
      return;
    }

    if (
      this.chart.salariesByGenderChartForLocal != null &&
      this.chart.salariesByGenderChartForLocal.datasetByGender.some(
        (x) => x.medianSalaries.length > 0
      )
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdLocal,
        this.chart.salariesByGenderChartForLocal
      );
    }

    if (
      this.chart.salariesByGenderChartForRemote != null &&
      this.chart.salariesByGenderChartForRemote.datasetByGender.some(
        (x) => x.medianSalaries.length > 0
      )
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdRemote,
        this.chart.salariesByGenderChartForRemote
      );
    }
  }

  private initChartWithParams(
    canvasId: string,
    data: SalariesByGenderChart
  ): SalariesByGenderChartObject {
    const chart = new SalariesByGenderChartObject(canvasId, data);

    var chartEl = document.getElementById(canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }

    return chart;
  }
}
