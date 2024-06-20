import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";
import { HistoricalSurveyChartResponse, SurveyResultsByWeeksChartItem, UsefulnessPercentage } from "@services/historical-charts.models";
import { UsefulnessReplyType } from "@services/salaries-survey.service";
import { RgbColor } from "../../rgb-color";


export class UsefulnessChartObject extends Chart {
  private readonly datasets: Array<DatasetItem> = [];

  constructor(
    canvasId: string,
    chartData: HistoricalSurveyChartResponse) {

    const data = chartData.surveyResultsByWeeksChart;
    const datasets: Array<DatasetItem> = [
      ...UsefulnessChartObject.prepareExpectationDatasets(
        data.items,
        "Казахстанские компании",
        "1",
        0,
        (x) => x.localUsefulnessPercentage
      ),
      ...UsefulnessChartObject.prepareExpectationDatasets(
        data.items,
        "Удаленка",
        "2",
        50,
        (x) => x.remoteUsefulnessPercentage
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
    dispatcher: (x: SurveyResultsByWeeksChartItem) => UsefulnessPercentage[]
  ): Array<DatasetItem> {
    return [
      new DatasetItem(
        "Да, " + postfix,
        items.map((x) => UsefulnessChartObject
          .getExpectationReplyType(UsefulnessReplyType.Yes, dispatcher(x))),
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
        "Не уверен, " + postfix,
        items.map((x) => UsefulnessChartObject
          .getExpectationReplyType(UsefulnessReplyType.NotSure, dispatcher(x))),
        1,
        RgbColor.grey(darken),
        false as PointStyle,
        "y",
        "bar",
        stack,
        1,
        0.8
      ),
      new DatasetItem(
        "Нет, " + postfix,
        items.map((x) => UsefulnessChartObject
          .getExpectationReplyType(UsefulnessReplyType.No, dispatcher(x))),
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
    type: UsefulnessReplyType,
    records: UsefulnessPercentage[]
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
