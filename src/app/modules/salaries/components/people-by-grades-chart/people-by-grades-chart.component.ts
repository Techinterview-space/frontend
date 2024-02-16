import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DeveloperGrade } from '@models/enums';
import { PeopleByGradesChartData } from '@services/user-salaries.service';
import { SalariesChart } from '../salaries-chart/salaries-chart';

interface ProgressBarData {
  color: string;
  textColor: string;
  value: string;
  width: number;
  maxValue: string;
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

  totalCountLocal: number = 0;
  totalCountRemote: number = 0;

  showPercents = true;

  @Input()
  title: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initCharts();
  }

  toggleCountAndPercent(): void {
    this.showPercents = !this.showPercents;
    this.initCharts();
  }

  private initCharts(): void {
    if (this.source == null) {
      return;
    }

    if (this.source.peopleByGradesChartDataForLocal != null) {
      this.totalCountLocal = this.source.peopleByGradesChartDataForLocal.allCount;
      this.barsForLocal = this.prepareData(
        this.source.peopleByGradesChartDataForLocal, this.showPercents);
    }

    if (this.source.peopleByGradesChartDataForRemote != null) {
      this.totalCountRemote = this.source.peopleByGradesChartDataForRemote.allCount;
      this.barsForRemote = this.prepareData(
        this.source.peopleByGradesChartDataForRemote, this.showPercents);
    }
  }

  private prepareData(data: PeopleByGradesChartData, showPercents: boolean): Array<ProgressBarData> {
    const totalCount = data.allCount;

    const result = data.data
      .filter((item) => item.grade !== DeveloperGrade.Unknown)
      .map((item, index) => {
        const color = this.colorsByGrade.get(item.grade) ?? PeopleByGradesChartComponent.defaultColor;
        const width = (item.count / totalCount) * 100;
        const value = showPercents
          ? formatNumber(width, 'en-US', '1.0-2') + '%'
          : formatNumber(item.count, 'en-US', '1.0-0');

        const maxValue = showPercents
          ? '100'
          : formatNumber(totalCount, 'en-US', '1.0-0');

        return {
          color: color.color,
          textColor: color.textColor,
          value: value,
          maxValue: maxValue,
          width: width,
          label: DeveloperGrade[item.grade],
        };
    });

    const noGradeData = data.data.find((item) => item.grade === DeveloperGrade.Unknown);
    if (noGradeData != null) {
      const color = this.colorsByGrade.get(DeveloperGrade.Unknown) ?? PeopleByGradesChartComponent.defaultColor;
      const width = (noGradeData.count / totalCount) * 100;
      const value = showPercents
          ? formatNumber(width, 'en-US', '1.0-2') + '%'
          : formatNumber(noGradeData.count, 'en-US', '1.0-0');

        const maxValue = showPercents
          ? '100'
          : formatNumber(totalCount, 'en-US', '1.0-0');

      result.push(
        {
          color: color.color,
          textColor: color.textColor,
          value: value,
          maxValue: maxValue,
          width: width,
          label: "Грейд не указан",
        }
      );
    }

    return result;
  }
}
