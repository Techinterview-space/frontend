import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { PeopleDistributionChartObject } from './people-distribution-chart-object';
import { SalariesChart } from '../salaries-chart/salaries-chart';

@Component({
  selector: 'app-people-distribution-chart',
  templateUrl: './people-distribution-chart.component.html',
  styleUrl: './people-distribution-chart.component.scss'
})
export class PeopleDistributionChartComponent {

  @Input()
  chart: SalariesChart | null = null;

  chartDataLocal: PeopleDistributionChartObject | null = null;

  readonly canvasId = 'canvas_' + Math.random().toString(36).substring(7);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart(): void {
    if (this.chart == null) {
      return;
    }

    this.chartDataLocal = new PeopleDistributionChartObject(this.canvasId, this.chart);

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? '100%';
    }
  }
}
