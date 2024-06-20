import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";
import { ExpectationPercentage, HistoricalSurveyChartResponse, SurveyResultsByWeeksChartItem } from "@services/historical-charts.models";
import { ExpectationReplyType } from "@services/salaries-survey.service";
import { RgbColor } from "../../rgb-color";


export class ExpectationChartObject extends Chart {
  private readonly datasets: Array<DatasetItem> = [];

  constructor(
    canvasId: string,
    chartData: HistoricalSurveyChartResponse) {

    const data = chartData.surveyResultsByWeeksChart;
    const datasets: Array<DatasetItem> = [
      ...ExpectationChartObject.prepareExpectationDatasets(
        data.items,
        "Казахстанские компании",
        "1",
        0,
        (x) => x.localExpectationPercentage
      ),
      ...ExpectationChartObject.prepareExpectationDatasets(
        data.items,
        "Удаленка",
        "2",
        50,
        (x) => x.remoteExpectationPercentage
      ),
      new DatasetItem(
        "Количество ответов",
        data.items.map((x) => x.totalCount),
        4,
        new RandomRgbColor(),
        "circle",
        "y1",
        "line",
        "0"
      ),
    ];

    super(canvasId, {
      type: "line" as ChartType,
      data: {
        labels: data.weekEnds.map((x) => x.toISOString().slice(0, 10)),
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
            stacked: true,
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

  static prepareExpectationDatasets(
    items: SurveyResultsByWeeksChartItem[],
    postfix: string,
    stack: string,
    darken = 0,
    dispatcher: (x: SurveyResultsByWeeksChartItem) => ExpectationPercentage[]
  ): Array<DatasetItem> {
    return [
      new DatasetItem(
        "Выше ожиданий, " + postfix,
        items.map((x) => ExpectationChartObject
          .getExpectationReplyType(ExpectationReplyType.MoreThanExpected, dispatcher(x))),
        1,
        RgbColor.green(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        1,
        0.8
      ),
      new DatasetItem(
        "Ожидаемо, " + postfix,
        items.map((x) => ExpectationChartObject
          .getExpectationReplyType(ExpectationReplyType.Expected, x.localExpectationPercentage)),
        1,
        RgbColor.blue(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        1,
        0.8
      ),
      new DatasetItem(
        "Ниже ожиданий, " + postfix,
        items.map((x) => ExpectationChartObject
          .getExpectationReplyType(ExpectationReplyType.LessThanExpected, x.localExpectationPercentage)),
        1,
        RgbColor.red(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        1,
        0.8
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
    readonly label: string,
    readonly data: number[],
    readonly borderWidth: number,
    readonly color: RandomRgbColor,
    readonly pointStyle: PointStyle,
    readonly yAxisID: "y1" | "y",
    readonly type: "line" | "bar",
    readonly stack: string,
    borderColorOpacity: number = 1,
    bgColorOpacity: number = 0.5,
  ) {
    this.borderColor = color.toString(borderColorOpacity);
    this.backgroundColor = color.toString(bgColorOpacity);
  }

  readonly borderColor: string;
  readonly backgroundColor: string;
}
