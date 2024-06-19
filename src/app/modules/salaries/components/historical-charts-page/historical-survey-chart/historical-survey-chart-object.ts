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
  yAxisID: "y" | "y1";
}

export class HistoricalSurveyChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, chartData: HistoricalSurveyChartResponse) {
    
    const data = chartData.surveyResultsByWeeksChart;
    const datasets: Array<ChartDatasetType> = [
      new DatasetItem(
        "Количество ответов",
        data.items.map((x) => x.totalCount),
        4,
        new RandomRgbColor(),
        "circle",
        "y1"
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
          y: {
            beginAtZero: true,
            position: "left",
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
}

class DatasetItem implements ChartDatasetType {
  constructor(
    readonly label: string,
    readonly data: number[],
    readonly borderWidth: number,
    readonly color: RandomRgbColor,
    readonly pointStyle: PointStyle,
    readonly yAxisID: "y1" | "y"
  ) {
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.5);
  }

  readonly borderColor: string;
  readonly backgroundColor: string;
}
