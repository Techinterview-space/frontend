import { Component, Input } from "@angular/core";
import { UserSalary } from "@models/salaries/salary.model";
import { GradesMinMaxSalariesChartObject } from "./grades-min-max-chart-object";
import { SalariesChart } from "../salaries-chart/salaries-chart";

@Component({
  selector: "app-grades-min-max-chart",
  templateUrl: "./grades-min-max-chart.component.html",
  styleUrl: "./grades-min-max-chart.component.scss",
})
export class GradesMinMaxChartComponent {
  @Input()
  source: SalariesChart | null = null;

  salaries: Array<UserSalary> | null = null;
  chartDataLocal: GradesMinMaxSalariesChartObject | null = null;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart(): void {
    if (this.source == null) {
      return;
    }

    this.salaries = this.source.salaries;
    if (this.salaries == null || this.salaries.length == 0) {
      return;
    }

    this.chartDataLocal = new GradesMinMaxSalariesChartObject(
      this.canvasId,
      this.salaries
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
