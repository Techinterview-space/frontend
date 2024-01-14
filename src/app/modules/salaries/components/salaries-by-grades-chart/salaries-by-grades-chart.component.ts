import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary } from '@models/salaries/salary.model';
import { SalariesChart } from '../salaries-chart/salaries-chart';
import Chart from 'chart.js/auto';
import { RandomRgbColor } from './random-rgb-color';

@Component({
  selector: 'app-salaries-by-grades-chart',
  templateUrl: './salaries-by-grades-chart.component.html',
  styleUrl: './salaries-by-grades-chart.component.scss'
})
export class SalariesByGradesChartComponent implements OnInit, OnDestroy {

  @Input()
  chart: SalariesChart | null = null;

  chartData: Chart | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.chart == null) {
      return;
    }

    const chartData = this.chart.salariesByMoneyBarChart;
    const randomColor = new RandomRgbColor();
    const datasets = [
      {
        label: 'Все',
        data: chartData.items.map(x => x.count),
        borderWidth: 1,
        borderColor: randomColor.toString(1),
        backgroundColor: randomColor.toString(0.5),
      },
    ];

    this.chartData = new Chart('canvas', {
      type: 'line',
      data: {
        labels: chartData.labels
          .map(x => {
            let num = Number(x);
            if (isNaN(num)) {
              throw Error('Invalid label ' + x);
            }

            num = num / 1000;
            return num + 'k';
          }),
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        elements: {
          line: {
              tension: 0.4
          },
        }
      },
    });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
