import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary } from '@models/salaries/salary.model';
import { SalariesChart } from '../salaries-chart/salaries-chart';
import { Chart, ChartType }  from 'chart.js/auto';
import { RandomRgbColor } from './random-rgb-color';
import { UserProfession } from '@models/salaries/user-profession';

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
    if (this.chart == null ||
      this.chart.salariesByMoneyBarChart == null) {
      return;
    }

    const chartData = this.chart.salariesByMoneyBarChart;
    const randomColor = new RandomRgbColor();
    const datasets = [
      {
        type: 'line' as ChartType,
        label: 'Все',
        data: chartData.items.map(x => x.count),
        borderWidth: 3,
        borderColor: randomColor.toString(1),
        backgroundColor: randomColor.toString(0.5),
      },
    ];

    chartData.itemsByProfession.forEach((x, i) => {
      const profession = x.profession;
      const color = new RandomRgbColor();
      datasets.push({
        label: UserProfession[profession].toString(),
        data: x.items.map(x => x.count),
        borderWidth: 1,
        borderColor: color.toString(0.6),
        backgroundColor: color.toString(0.3),
        type: 'bar' as ChartType,
      });
    });

    this.chartData = new Chart('canvas', {
      type: 'scatter',
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
