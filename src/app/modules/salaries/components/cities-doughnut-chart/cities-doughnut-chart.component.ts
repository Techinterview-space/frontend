import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
} from "@angular/core";
import { CitiesDoughnutChartDataObject } from "./cities-doughnut-chart-data-object";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { CitiesDoughnutChartData } from "@services/user-salaries.service";

@Component({
  selector: "app-cities-doughnut-chart",
  templateUrl: "./cities-doughnut-chart.component.html",
  styleUrl: "./cities-doughnut-chart.component.scss",
  standalone: false,
})
export class CitiesDoughnutChartComponent implements AfterViewInit {
  @Input()
  chartData: CitiesDoughnutChartData | null = null;

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: CitiesDoughnutChartDataObject | null = null;
  showNoDataArea = false;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  changeShowNoDataAreaToggler(): void {
    this.chartDataLocal?.toggleNoDataArea(this.showNoDataArea);
  }

  private initChart(): void {
    if (this.chartData == null || this.chartData.items.length == 0) {
      return;
    }

    this.chartDataLocal = new CitiesDoughnutChartDataObject(
      this.canvasId,
      this.chartData,
    );
  }
}
