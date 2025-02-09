import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { PeopleByCategoryBarChartObject } from "../people-by-category-bar-chart-object";

@Component({
    selector: "app-people-by-experience-chart",
    templateUrl: "./people-by-experience-chart.component.html",
    styleUrl: "./people-by-experience-chart.component.scss",
    standalone: false
})
export class PeopleByExperienceChartComponent {
  @Input()
  source: SalariesChart | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: PeopleByCategoryBarChartObject | null = null;
  currentSalary: UserSalaryAdminDto | null = null;

  showNoDataArea = false;
  countOfResponses = 0;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  private initChart(): void {
    if (
      this.source == null ||
      this.source.developersByExperienceYearsChartData == null
    ) {
      return;
    }

    this.currentSalary = this.source.currentUserSalary;
    this.countOfResponses =
      this.source.developersByExperienceYearsChartData.data.reduce(
        (acc, item) => acc + item,
        0
      );
    this.chartDataLocal = new PeopleByCategoryBarChartObject(
      this.canvasId,
      this.source.developersByExperienceYearsChartData
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
