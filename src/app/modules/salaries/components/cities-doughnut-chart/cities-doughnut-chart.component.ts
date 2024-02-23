import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CitiesDoughnutChartObject } from './cities-doughnut-chart-object';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';

@Component({
  selector: 'app-cities-doughnut-chart',
  templateUrl: './cities-doughnut-chart.component.html',
  styleUrl: './cities-doughnut-chart.component.scss'
})
export class CitiesDoughnutChartComponent {

  @Input()
  salaries: Array<UserSalary> | null = null;

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: CitiesDoughnutChartObject | null = null;
  showNoDataArea = false;

  readonly canvasId = 'canvas_' + Math.random().toString(36);

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
    if (this.salaries == null || this.salaries.length == 0) {
      return;
    }

    this.chartDataLocal = new CitiesDoughnutChartObject(this.canvasId, this.salaries);

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? '100%';
    }
  }
}
