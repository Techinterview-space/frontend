import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";
import { HistoricalSurveyChartResponse } from "@services/historical-charts.models";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointStyle: PointStyle;
  yAxisID: "y";
}

export class SurveyHistoricalChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, chartData: HistoricalSurveyChartResponse) {
    // По датасету на медиану и среднюю
    const datasets: Array<ChartDatasetType> = [
      new DatasetItem(
        "Казахстанские компании",
        chartData.surveyResultsByWeeksChart.localChartItems,
        new RandomRgbColor(),
      ),
      new DatasetItem(
        "Валютная удаленка",
        chartData.surveyResultsByWeeksChart.remoteChartItems,
        new RandomRgbColor(),
      ),
    ];

    super(canvasId, {
      type: "line" as ChartType,
      data: {
        labels: chartData.surveyResultsByWeeksChart.weekEnds.map((x) =>
          x.toISOString().slice(0, 10),
        ),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            position: "left",
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
}

class DatasetItem implements ChartDatasetType {
  constructor(
    readonly label: string,
    readonly data: number[],
    readonly color: RandomRgbColor,
  ) {
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.5);
  }

  readonly borderWidth = 2;
  readonly borderColor: string;
  readonly backgroundColor: string;
  readonly yAxisID = "y";
  readonly pointStyle: PointStyle = true as PointStyle;
}
