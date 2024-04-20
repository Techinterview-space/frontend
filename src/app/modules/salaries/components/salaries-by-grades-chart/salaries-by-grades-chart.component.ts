import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SalariesChartJsObject } from "./salaries-chart-js-object";
import { SalariesByMoneyBarChart } from "@services/user-salaries.service";
import { SalariesPerProfession } from "../salaries-per-profession";
import { LabelEntityDto } from "@services/label-entity.model";

@Component({
  selector: "app-salaries-by-grades-chart",
  templateUrl: "./salaries-by-grades-chart.component.html",
  styleUrl: "./salaries-by-grades-chart.component.scss",
})
export class SalariesByGradesChartComponent implements OnInit, OnDestroy {
  @Input()
  chart: SalariesByMoneyBarChart | null = null;

  @Input()
  title: string | null = null;

  @Input()
  salaries: Array<SalariesPerProfession> | null = null;

  @Input()
  professions: Array<LabelEntityDto> = [];

  chartDataLocal: SalariesChartJsObject | null = null;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngOnInit(): void {
    // ignored
  }

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy(): void {
    // ignored
  }

  toggleBarDatasetByProfession(item: SalariesPerProfession): void {
    item.toggle();
    this.chartDataLocal?.toggleDatasetByProfession(item.profession);
  }

  private initChart(): void {
    if (this.chart == null || this.salaries == null) {
      return;
    }

    this.chartDataLocal = new SalariesChartJsObject(
      this.canvasId,
      this.chart,
      this.professions
    );

    this.chartDataLocal.hideProfessionDatasets();

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
