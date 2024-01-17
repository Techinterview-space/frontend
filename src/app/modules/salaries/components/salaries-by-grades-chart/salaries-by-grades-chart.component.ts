import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary } from '@models/salaries/salary.model';
import { SalariesChart } from '../salaries-chart/salaries-chart';
import { Chart, ChartType }  from 'chart.js/auto';
import { RandomRgbColor } from './random-rgb-color';
import { UserProfession } from '@models/salaries/user-profession';
import { SalariesChartJsObject } from './salaries-chart-js-object';
import { SalariesByMoneyBarChart } from '@services/user-salaries.service';
import { SalariesPerProfession } from '../salaries-per-profession';

@Component({
  selector: 'app-salaries-by-grades-chart',
  templateUrl: './salaries-by-grades-chart.component.html',
  styleUrl: './salaries-by-grades-chart.component.scss'
})
export class SalariesByGradesChartComponent implements OnInit, OnDestroy {

  @Input()
  chart: SalariesByMoneyBarChart | null = null;

  @Input()
  title: string | null = null;

  @Input()
  salaries: Array<SalariesPerProfession> | null = null;

  chartDataLocal: SalariesChartJsObject | null = null;

  readonly canvasId = 'canvas_' + Math.random().toString(36).substring(7);

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

  toggleBarDatasetByProfession(profession: UserProfession): void {
    this.chartDataLocal?.toggleDatasetByProfession(profession);
  }

  private initChart(): void {
    if (this.chart == null || this.salaries == null) {
      return;
  }

  this.chartDataLocal = new SalariesChartJsObject(this.canvasId, this.chart);
  this.chartDataLocal.hideBarDatasets();

  var chartEl = document.getElementById(this.canvasId);
  if (chartEl != null && chartEl.parentElement != null) {
    chartEl.style.height = chartEl?.parentElement.style.height ?? '100%';
  }
  }
}
