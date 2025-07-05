import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { SalariesByCityChart } from "@services/user-salaries.service";
import { SalariesByCityChartObject } from "./salaries-by-city-chart-object";

@Component({
  selector: "app-salaries-by-city-chart",
  templateUrl: "./salaries-by-city-chart.component.html",
  styleUrl: "./salaries-by-city-chart.component.scss",
  standalone: false,
})
export class SalariesByCityChartComponent {
  @Input()
  chart: SalariesChart | null = null;

  chartDataLocal: SalariesByCityChartObject | null = null;
  chartDataRemote: SalariesByCityChartObject | null = null;

  readonly canvasIdLocal = "canvas_" + Math.random().toString(36);
  readonly canvasIdRemote = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart(): void {
    if (this.chart == null) {
      return;
    }

    if (
      this.chart.salariesByCityChartForLocal != null &&
      this.chart.salariesByCityChartForLocal.medianSalaries.length > 0
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdLocal,
        this.chart.salariesByCityChartForLocal,
      );
    }

    if (
      this.chart.salariesByCityChartForRemote != null &&
      this.chart.salariesByCityChartForRemote.medianSalaries.length > 0
    ) {
      this.chartDataRemote = this.initChartWithParams(
        this.canvasIdRemote,
        this.chart.salariesByCityChartForRemote,
      );
    }
  }

  private initChartWithParams(
    canvasId: string,
    data: SalariesByCityChart,
  ): SalariesByCityChartObject {
    const chart = new SalariesByCityChartObject(canvasId, data);

    var chartEl = document.getElementById(canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }

    return chart;
  }
}
