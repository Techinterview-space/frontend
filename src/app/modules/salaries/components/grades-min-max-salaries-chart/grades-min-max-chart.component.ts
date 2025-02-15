import { Component, Input, OnDestroy } from "@angular/core";
import { UserSalary } from "@models/salaries/salary.model";
import { GradesMinMaxSalariesChartObject } from "./grades-min-max-chart-object";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-grades-min-max-chart",
  templateUrl: "./grades-min-max-chart.component.html",
  styleUrl: "./grades-min-max-chart.component.scss",
  standalone: false,
})
export class GradesMinMaxChartComponent implements OnDestroy {
  @Input()
  source: SalariesChart | null = null;

  salaries: Array<UserSalary> | null = null;
  chartDataLocal: GradesMinMaxSalariesChartObject | null = null;

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

    this.salaries = this.source.salaries;
    if (this.salaries == null || this.salaries.length == 0) {
      return;
    }

    this.chartDataLocal = new GradesMinMaxSalariesChartObject(
      this.canvasId,
      this.salaries,
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
