import { RandomRgbColor } from "@modules/salaries/components/random-rgb-color";
import { SalariesAddingTrendChart } from "@services/user-salaries.service";
import { Chart, ChartType, PointStyle } from "chart.js/auto";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointStyle: PointStyle;
}

export class SalariesAddingChart extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, chartData: SalariesAddingTrendChart) {
    const randomColor = new RandomRgbColor();
    const datasets: Array<ChartDatasetType> = [
      {
        label: "Все анкеты",
        data: chartData.items.map((x) => x.count),
        borderWidth: 1,
        borderColor: randomColor.toString(1),
        backgroundColor: randomColor.toString(0.5),
        pointStyle: false as PointStyle,
      },
    ];

    super(canvasId, {
      type: "line" as ChartType,
      data: {
        labels: chartData.labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
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
