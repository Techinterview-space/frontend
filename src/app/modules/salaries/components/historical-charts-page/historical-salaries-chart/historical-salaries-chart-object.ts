import { SalariesCountWeekByWeekChart } from "@services/historical-charts.service";
import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";

interface ChartDatasetType {
    label: string;
    data: Array<number>;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    pointStyle: PointStyle;
    yAxisID: 'y' | 'y1',
}

export class HistoricalSalariesChartObject extends Chart {
    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, chartData: SalariesCountWeekByWeekChart) {

        // По датасету на медиану и среднюю
        const datasets: Array<ChartDatasetType> = [
          new DatasetItem(
            "Количество анкет",
            chartData.totalCountItems.map(x => x.totalCount),
            4,
            new RandomRgbColor(),
            false as PointStyle,
            'y1'
          ),
          new DatasetItem(
            "Медиана, КЗ",
            chartData.totalCountItems.map(x => x.localMedian),
            2,
            new RandomRgbColor(),
            false as PointStyle,
            'y'
          ),
          new DatasetItem(
            "Средняя, КЗ",
            chartData.totalCountItems.map(x => x.localAverage),
            2,
            new RandomRgbColor(),
            false as PointStyle,
            'y'
          ),
          new DatasetItem(
            "Медиана, удаленка",
            chartData.totalCountItems.map(x => x.remoteMedian),
            2,
            new RandomRgbColor(),
            false as PointStyle,
            'y'
          ),
          new DatasetItem(
            "Средняя, удаленка",
            chartData.totalCountItems.map(x => x.remoteAverage),
            2,
            new RandomRgbColor(),
            false as PointStyle,
            'y'
          ),
        ];

        super(canvasId, {
          type: "line" as ChartType,
          data: {
            labels: chartData
                .weekEnds
                .map((x) => x.toISOString().slice(0, 10)),
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                position: 'left',
              },
              y1: {
                beginAtZero: true,
                position: 'right',
              }
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
