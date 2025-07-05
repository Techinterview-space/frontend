import { Chart } from "chart.js/auto";
import { RandomRgbColor } from "../random-rgb-color";
import { SalariesSkillsChartData } from "@services/user-salaries.service";

export class SalariesSkillsChartDataObject extends Chart {
  private readonly datasets: Array<ChartDatasetItem> = [];

  constructor(
    canvasId: string,
    private readonly chartData: SalariesSkillsChartData,
  ) {
    const datasets: Array<ChartDatasetItem> = [];
    datasets.push(new ChartDatasetItem(chartData, false));

    super(canvasId, {
      type: "polarArea",
      data: {
        labels: chartData.items.map((x) => x.skill.title),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 18,
              },
            },
          },
        },
        plugins: {
          legend: {
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
    this.data.labels = this.chartData.items.map((x) => x.skill.title);
    if (show) {
      this.data.labels.push("Не указаны данные");
    }

    this.data.datasets = [new ChartDatasetItem(this.chartData, show)];

    this.update();
  }
}

class ChartDatasetItem {
  readonly label: string;
  readonly data: Array<number>;
  readonly backgroundColor: Array<string>;

  constructor(chartData: SalariesSkillsChartData, includeNoData: boolean) {
    this.label = "Указанные ЯП/фреймворки";
    this.data = [];
    this.backgroundColor = [];

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
