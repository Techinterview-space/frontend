import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { PeopleDistributionChartObject } from "./people-distribution-chart-object";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { CompanyType } from "@models/salaries/company-type";

@Component({
  selector: "app-people-distribution-chart",
  templateUrl: "./people-distribution-chart.component.html",
  styleUrl: "./people-distribution-chart.component.scss",
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
    if (this.chart == null || this.chart.salaries.length == 0) {
      return;
    }

    const localSalaries = this.chart.salaries.filter(
      (x) => x.company === CompanyType.Local
    );
    const remoteSalaries = this.chart.salaries.filter(
      (x) => x.company === CompanyType.Remote
    );

    if (localSalaries.length > 0) {
      this.chartDataLocal = this.initChartWithParams(
        this.canvasIdLocal,
        localSalaries,
        10,
        "Казахстан"
      );
    }

    if (remoteSalaries.length > 0) {
      this.chartDataRemote = this.initChartWithParams(
        this.canvasIdRemote,
        remoteSalaries,
        3,
        "Мир (удаленка)"
      );
    }
  }

  private initChartWithParams(
    canvasId: string,
    salaries: Array<UserSalary>,
    otherLimit: number,
    title: string
  ): PeopleDistributionChartObject {
    const chart = new PeopleDistributionChartObject(
      canvasId,
      salaries,
      otherLimit,
      title,
      this.chart!.allProfessions
    );

    var chartEl = document.getElementById(canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }

    return chart;
  }
}
