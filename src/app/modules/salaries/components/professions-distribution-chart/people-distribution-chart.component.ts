import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PeopleDistributionChartObject } from "./people-distribution-chart-object";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { ProfessionsDistributionChartData, ProfessionDistributionData } from "@services/user-salaries.service";

@Component({
  selector: "app-people-distribution-chart",
  templateUrl: "./people-distribution-chart.component.html",
  styleUrl: "./people-distribution-chart.component.scss",
  standalone: false,
})
export class PeopleDistributionChartComponent {
  @Input()
  chart: SalariesChart | null = null;

  chartDataLocal: PeopleDistributionChartObject | null = null;
  chartDataRemote: PeopleDistributionChartObject | null = null;

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

    const chartData = this.chart.professionsDistributionChartData;
    if (chartData == null) {
      return;
    }

    if (chartData.localData.totalCount > 0) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdLocal,
        chartData.localData,
        10,
        "Казахстан",
      );
    }

    if (chartData.remoteData.totalCount > 0) {
      this.chartDataRemote = this.initChartWithParams(
        this.canvasIdRemote,
        chartData.remoteData,
        3,
        "Мир (удаленка)",
      );
    }
  }

  private initChartWithParams(
    canvasId: string,
    data: ProfessionDistributionData,
    otherLimit: number,
    title: string,
  ): PeopleDistributionChartObject {
    const chart = new PeopleDistributionChartObject(
      canvasId,
      data,
      otherLimit,
      title,
    );

    var chartEl = document.getElementById(canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }

    return chart;
  }
}
