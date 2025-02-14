import { Component, Input } from "@angular/core";
import { UserSalary } from "@models/salaries/salary.model";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { SalariesByAgeOrExperienceChartObject } from "../salaries-by-age-or-experience-chart-object";
import { SalariesByAgeOrExperienceChart } from "@services/user-salaries.service";

@Component({
  selector: "app-salaries-by-age-chart",
  templateUrl: "./salaries-by-age-chart.component.html",
  styleUrl: "./salaries-by-age-chart.component.scss",
  standalone: false,
})
export class SalariesByAgeChartComponent {
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
    if (this.chart == null || this.chart.salaries.length == 0) {
      return;
    }

    if (
      this.chart.salariesByUserAgeChartForLocalSalaries != null &&
      this.chart.salariesByUserAgeChartForLocalSalaries.medianSalaries.length >
        0
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdLocal,
        this.chart.salariesByUserAgeChartForLocalSalaries,
      );
    }

    if (
      this.chart.salariesByUserAgeChartForRemoteSalaries != null &&
      this.chart.salariesByUserAgeChartForRemoteSalaries.medianSalaries.length >
        0
    ) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdRemote,
        this.chart.salariesByUserAgeChartForRemoteSalaries,
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
