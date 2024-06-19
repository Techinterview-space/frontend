import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";
import { ExpectationPercentage, HistoricalSurveyChartResponse, SurveyResultsByWeeksChartGradeItem, UsefulnessPercentage } from "@services/historical-charts.models";
import { DeveloperGrade } from "@models/enums";
import { ExpectationReplyType, UsefulnessReplyType } from "@services/salaries-survey.service";
import { RgbColor } from "../../rgb-color";

export class HistoricalSurveyGradeChartObject extends Chart {
  private readonly datasets: Array<DatasetItem> = [];

  constructor(canvasId: string, chartData: HistoricalSurveyChartResponse) {

    const items = chartData.surveyResultsByWeeksChart.gradeItems;

    const datasets: Array<DatasetItem> = [
      ...HistoricalSurveyGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Junior,
        items,
        "1",
        0
      ),
      ...HistoricalSurveyGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Middle,
        items,
        "2",
        20
      ),
      ...HistoricalSurveyGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Senior,
        items,
        "3",
        30
      ),
      ...HistoricalSurveyGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Lead,
        items,
        "4",
        40
      ),
    ];

    super(canvasId, {
      type: "line" as ChartType,
      data: {
        labels: chartData.surveyResultsByWeeksChart
          .weekEnds
          .map((x) => x.toISOString().slice(0, 10)),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true,
            position: "left",
            stacked: true,
          },
          y1: {
            beginAtZero: true,
            position: "right",
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            title: {
              position: "start",
            },
          },
        },
      },
    });

    this.datasets = datasets;
  }

  toggle(grade: DeveloperGrade): void {
    this.datasets
      .filter((x) => x.grade === grade)
      .forEach((x) => x.toggle());

    this.update();
  }

  static prepareDatasetsForGrade(
    grade: DeveloperGrade,
    gradeItems: SurveyResultsByWeeksChartGradeItem[],
    stack: string,
    darken = 0
  ): Array<DatasetItem> {
    const items = gradeItems.filter((x) => x.grade === grade);
    const postfix = DeveloperGrade[grade];
    return [
      new DatasetItem(
        grade,
        "Да, " + postfix,
        items.map((x) => HistoricalSurveyGradeChartObject
          .getUsefulnessPercentage(UsefulnessReplyType.Yes, x.localUsefulnessPercentage)),
        1,
        RgbColor.green(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        false,
        1,
        0.8
      ),
      new DatasetItem(
        grade,
        "Нет, " + postfix,
        items.map((x) => HistoricalSurveyGradeChartObject
          .getUsefulnessPercentage(UsefulnessReplyType.No, x.localUsefulnessPercentage)),
        1,
        RgbColor.red(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        false,
        1,
        0.8
      ),
      new DatasetItem(
        grade,
        "Не уверен, " + postfix,
        items.map((x) => HistoricalSurveyGradeChartObject
          .getUsefulnessPercentage(UsefulnessReplyType.NotSure, x.localUsefulnessPercentage)),
        1,
        RgbColor.grey(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        false,
        1,
        0.8
      ),
      new DatasetItem(
        grade,
        "Количество ответов, " + postfix,
        items.map((x) => x.totalCount),
        4,
        new RandomRgbColor(),
        false as PointStyle,
        "y1",
        "line",
        "0"
      ),
    ];
  }

  static getUsefulnessPercentage(
    type: UsefulnessReplyType,
    records: UsefulnessPercentage[]
  ) : number {
    const record = records.find((x) => x.replyType === type);
    return record ? record.percentage : 0;
  }

  static getExpectationReplyType(
    type: ExpectationReplyType,
    records: ExpectationPercentage[]
  ) : number {
    const record = records.find((x) => x.replyType === type);
    return record ? record.percentage : 0;
  }
}

class DatasetItem {
  constructor(
    grade: DeveloperGrade,
    readonly label: string,
    readonly data: number[],
    readonly borderWidth: number,
    readonly color: RandomRgbColor,
    readonly pointStyle: PointStyle,
    readonly yAxisID: "y1" | "y",
    readonly type: "line" | "bar",
    readonly stack: string,
    hidden = false,
    borderColorOpacity: number = 1,
    bgColorOpacity: number = 0.5,
  ) {
    this.borderColor = color.toString(borderColorOpacity);
    this.backgroundColor = color.toString(bgColorOpacity);
    this.hidden = hidden;
    this.grade = grade;
  }

  readonly borderColor: string;
  readonly backgroundColor: string;
  hidden: boolean;
  grade: DeveloperGrade;

  toggle(): void {
    this.hidden = !this.hidden;
  }
}
