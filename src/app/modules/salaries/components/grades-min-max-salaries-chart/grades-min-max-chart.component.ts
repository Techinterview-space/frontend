import { Component, Input, OnDestroy, AfterViewInit } from "@angular/core";
import { GradesMinMaxSalariesChartObject } from "./grades-min-max-chart-object";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GradesMinMaxChartData } from "@services/user-salaries.service";

@Component({
  selector: "app-grades-min-max-chart",
  templateUrl: "./grades-min-max-chart.component.html",
  styleUrl: "./grades-min-max-chart.component.scss",
  standalone: false,
})
export class GradesMinMaxChartComponent implements OnDestroy, AfterViewInit {
  @Input()
  source: SalariesChart | null = null;

  chartData: GradesMinMaxChartData | null = null;
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

    this.chartData = this.source.gradesMinMaxChartData;
    if (this.chartData == null) {
      return;
    }

    this.chartDataLocal = new GradesMinMaxSalariesChartObject(
      this.canvasId,
      this.chartData,
    );

    const chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
