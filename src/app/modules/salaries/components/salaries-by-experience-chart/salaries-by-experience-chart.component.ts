import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { SalariesByAgeOrExperienceChartObject } from "../salaries-by-age-or-experience-chart-object";
import { SalariesByAgeOrExperienceChart } from "@services/user-salaries.service";

@Component({
  selector: "app-salaries-by-experience-chart",
  templateUrl: "./salaries-by-experience-chart.component.html",
  styleUrl: "./salaries-by-experience-chart.component.scss",
  standalone: false,
})
export class SalariesByExperienceChartComponent {
  @Input()
  chart: SalariesChart | null = null;

  chartDataLocal: SalariesByAgeOrExperienceChartObject | null = null;
  chartDataRemote: SalariesByAgeOrExperienceChartObject | null = null;

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
      this.chart.salariesByExperienceChartForLocalSalaries != null &&
      this.chart.salariesByExperienceChartForLocalSalaries.medianSalaries
        .length > 0
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdLocal,
        this.chart.salariesByExperienceChartForLocalSalaries,
      );
    }

    if (
      this.chart.salariesByExperienceChartForRemoteSalaries != null &&
      this.chart.salariesByExperienceChartForRemoteSalaries.medianSalaries
        .length > 0
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdRemote,
        this.chart.salariesByExperienceChartForRemoteSalaries,
      );
    }
  }

  private initChartWithParams(
    canvasId: string,
    data: SalariesByAgeOrExperienceChart,
  ): SalariesByAgeOrExperienceChartObject {
    const chart = new SalariesByAgeOrExperienceChartObject(canvasId, data);

    var chartEl = document.getElementById(canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }

    return chart;
  }
}
