import { Chart } from "chart.js/auto";
import { RandomRgbColor } from "../random-rgb-color";
import { CitiesDoughnutChartData } from "@services/user-salaries.service";
import { KazakhstanCityEnum } from "@models/salaries/kazakhstan-city";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  hoverOffset: number;
}

export class CitiesDoughnutChartDataObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(
    canvasId: string,
    private readonly chartData: CitiesDoughnutChartData,
  ) {
    const datasets: Array<ChartDatasetType> = [];
    datasets.push(new ChartDatasetItem(chartData, false));

    super(canvasId, {
      type: "doughnut",
      data: {
        labels: chartData.items.map((x) => KazakhstanCityEnum.label(x.city) + ` (${x.count})`),
        datasets: datasets,
      },
      options: {
        aspectRatio: 1,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            title: {
              display: false,
            },
          },
        },
      },
    });

    this.datasets = datasets;
  }

  toggleNoDataArea(show: boolean): void {
    this.data.labels = this.chartData.items.map(
      (x) => KazakhstanCityEnum.label(x.city) + ` (${x.count})`
    );

    if (show && this.chartData.noDataCount > 0) {
      this.data.labels.push(`Нет данных (${this.chartData.noDataCount})`);
    }

    this.data.datasets = [new ChartDatasetItem(this.chartData, show)];

    this.update();
  }
}

class ChartDatasetItem implements ChartDatasetType {
  readonly label: string;
  readonly data: Array<number>;
  readonly backgroundColor: Array<string>;
  readonly hoverOffset: number;

  constructor(
    chartData: CitiesDoughnutChartData,
    includeNoData: boolean,
  ) {
    this.label = "Город проживания";
    this.data = [];
    this.backgroundColor = [];
    this.hoverOffset = 4;

    chartData.items.forEach((item) => {
      this.data.push(item.count);
      this.backgroundColor.push(new RandomRgbColor().toString(0.4));
    });

    if (includeNoData && chartData.noDataCount > 0) {
      this.data.push(chartData.noDataCount);
      this.backgroundColor.push(new RandomRgbColor().toString(0.4));
    }
  }
}