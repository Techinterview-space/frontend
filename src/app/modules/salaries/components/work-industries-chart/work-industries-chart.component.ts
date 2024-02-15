import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { WorkIndustriesChartJsObject } from './work-industries-chart-js-object';
import { WorkIndustry } from '@services/work-industry.service';

@Component({
  selector: 'app-work-industries-chart',
  templateUrl: './work-industries-chart.component.html',
  styleUrl: './work-industries-chart.component.scss'
})
export class WorkIndustriesChartComponent {

  @Input()
  industries: Array<WorkIndustry> = [];

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Input()
  salaries: Array<UserSalary> | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: WorkIndustriesChartJsObject | null = null;
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
    if (this.salaries == null || this.salaries.length === 0 || this.industries.length === 0) {
      return;
    }

    this.chartDataLocal = new WorkIndustriesChartJsObject(this.canvasId, this.salaries, this.industries);

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? '100%';
    }
  }
}
