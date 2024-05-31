import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  SalariesAddingTrendChart,
  UserSalariesService,
} from "@services/user-salaries.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { SalariesAddingChart } from "./salaries-adding-chart";
import { SalaryChartGlobalFiltersData } from "../salary-chart-global-filters/global-filters-form-group";

@Component({
  selector: "app-salaries-adding-chart",
  templateUrl: "./salaries-adding-chart.component.html",
  styleUrl: "./salaries-adding-chart.component.scss",
})
export class SalariesAddingChartComponent implements OnInit, OnDestroy {

  @Input()
  filter: SalaryChartGlobalFiltersData | null = null;

  data: SalariesAddingTrendChart | null = null;
  chart: SalariesAddingChart | null = null;

  constructor(
    private readonly service: UserSalariesService
  ) {}

  ngOnInit(): void {
    this.chart = null;
    this.service
      .addingSalariesaTrendChart({
        profsInclude: this.filter?.profsInclude ?? [],
        grade: this.filter?.grade ?? null,
        cities: this.filter?.cities ?? [],
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.data = x;
        this.chart = new SalariesAddingChart("canvas-adding-trend-chart", this.data);
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
