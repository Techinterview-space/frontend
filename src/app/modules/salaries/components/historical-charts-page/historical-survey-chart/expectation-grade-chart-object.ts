import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";
import { ExpectationPercentage, HistoricalSurveyChartResponse, SurveyResultsByWeeksChartGradeItem, UsefulnessPercentage } from "@services/historical-charts.models";
import { DeveloperGrade } from "@models/enums";
import { ExpectationReplyType } from "@services/salaries-survey.service";
import { RgbColor } from "../../rgb-color";

export class ExpectationGradeChartObject extends Chart {
  private readonly datasets: Array<DatasetItem> = [];

  constructor(
    canvasId: string,
    chartData: HistoricalSurveyChartResponse,
    dispatcher: (x: SurveyResultsByWeeksChartGradeItem) => ExpectationPercentage[],
    totalCountDispatcher: (x: SurveyResultsByWeeksChartGradeItem) => number) {

    const items = chartData.surveyResultsByWeeksChart.gradeItems;

    const datasets: Array<DatasetItem> = [
      ...ExpectationGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Junior,
        items,
        "1",
        0,
        dispatcher,
        totalCountDispatcher
      ),
      ...ExpectationGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Middle,
        items,
        "2",
        20,
        dispatcher,
        totalCountDispatcher
      ),
      ...ExpectationGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Senior,
        items,
        "3",
        30,
        dispatcher,
        totalCountDispatcher
      ),
      ...ExpectationGradeChartObject.prepareDatasetsForGrade(
        DeveloperGrade.Lead,
        items,
        "4",
        40,
        dispatcher,
        totalCountDispatcher
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
    darken = 0,
    dispatcher: (x: SurveyResultsByWeeksChartGradeItem) => ExpectationPercentage[],
    totalCountDispatcher: (x: SurveyResultsByWeeksChartGradeItem) => number
  ): Array<DatasetItem> {
    const items = gradeItems.filter((x) => x.grade === grade);
    const postfix = DeveloperGrade[grade];
    return [
      new DatasetItem(
        grade,
        "Ниже ожиданий, " + postfix,
        items.map((x) => ExpectationGradeChartObject
          .getExpectationReplyType(ExpectationReplyType.LessThanExpected, dispatcher(x))),
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
        "Ожидаемо, " + postfix,
        items.map((x) => ExpectationGradeChartObject
          .getExpectationReplyType(ExpectationReplyType.Expected, dispatcher(x))),
        1,
        RgbColor.blue(darken),
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
        "Выше ожиданий, " + postfix,
        items.map((x) => ExpectationGradeChartObject
          .getExpectationReplyType(ExpectationReplyType.MoreThanExpected, dispatcher(x))),
        1,
        RgbColor.lightGreen(darken),
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
        items.map((x) => totalCountDispatcher(x)),
        4,
        new RandomRgbColor(),
        'circle',
        "y1",
        "line",
        "0"
      ),
    ];
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
