import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DeveloperGrade } from '@models/enums';
import { PeopleByGradesChartData } from '@services/user-salaries.service';
import { SalariesChart } from '../salaries-chart/salaries-chart';

interface ProgressBarData {
  color: string;
  textColor: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-people-by-grades-chart',
  templateUrl: './people-by-grades-chart.component.html',
  styleUrl: './people-by-grades-chart.component.scss'
})
export class PeopleByGradesChartComponent implements OnInit {

  static readonly defaultColor = { color: 'bg-light', textColor: 'text-dark' };

  readonly colorsByGrade: Map<DeveloperGrade, {color: string, textColor: string}> = new Map([
    [DeveloperGrade.Junior, { color: 'bg-success', textColor: 'text-white' }],
    [DeveloperGrade.Middle, { color: 'bg-warning', textColor: 'text-dark' }],
    [DeveloperGrade.Senior, { color: 'bg-info', textColor: 'text-dark' }],
    [DeveloperGrade.Lead, { color: 'bg-primary', textColor: 'text-white' }],
    [DeveloperGrade.Unknown, PeopleByGradesChartComponent.defaultColor],
  ]);

  @Input()
  source: SalariesChart | null = null;

  barsForLocal: Array<ProgressBarData> = [];
  barsForRemote: Array<ProgressBarData> = [];

  @Input()
  title: string | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.source == null) {
      return;
    }

    if (this.source.peopleByGradesChartDataForLocal != null) {
      this.barsForLocal = this.prepareData(this.source.peopleByGradesChartDataForLocal);
    }

    if (this.source.peopleByGradesChartDataForRemote != null) {
      this.barsForRemote = this.prepareData(this.source.peopleByGradesChartDataForRemote);
    }
  }

  private prepareData(data: PeopleByGradesChartData): Array<ProgressBarData> {
    const totalCount = data.allCount;
    const result = data.data
      .filter((item) => item.grade !== DeveloperGrade.Unknown)
      .map((item, index) => {
        const color = this.colorsByGrade.get(item.grade) ?? PeopleByGradesChartComponent.defaultColor;
        return {
          color: color.color,
          textColor: color.textColor,
          value: formatNumber((item.count / totalCount) * 100, 'en-US', '1.0-2'),
          label: DeveloperGrade[item.grade],
        };
    });

    const noGradeData = data.data.find((item) => item.grade === DeveloperGrade.Unknown);
    if (noGradeData != null) {
      const color = this.colorsByGrade.get(DeveloperGrade.Unknown) ?? PeopleByGradesChartComponent.defaultColor;
      result.push(
        {
          color: color.color,
          textColor: color.textColor,
          value: formatNumber((noGradeData.count / totalCount) * 100, 'en-US', '1.0-2'),
          label: "Грейд не указан",
        }
      );
    }

    return result;
  }
}
