import { Chart } from "chart.js/auto";
import { DevelopersByCategoryChartData } from "@services/user-salaries.service";
import { RandomRgbColor } from "./random-rgb-color";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: string;
  borderColor: string;
}

export class PeopleByCategoryBarChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(
    canvasId: string,
    private readonly source: DevelopersByCategoryChartData
  ) {
    const randomColor = new RandomRgbColor();
    const datasets: Array<ChartDatasetType> = [
      {
        label: "Ответы респондентов",
        data: source.data,
        backgroundColor: randomColor.toString(0.8),
        borderColor: randomColor.toString(1),
      },
    ];

    super(canvasId, {
      type: "bar",
      data: {
        labels: source.labels
          .map((x, i) => {
            if (source.data[i] === 0) {
              return null;
            }

            if (i === 0) {
              return `< ${x.end}`;
            }

            if (i === source.labels.length - 1) {
              return `> ${x.start}`;
            }

            if (x.end - x.start === 1) {
              return `до ${x.end}`;
            }

            return `${x.start}-${x.end}`;
          })
          .filter((x) => x != null),
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            title: {
              display: false,
            },
          },
        },
      },
    });

    this.datasets = datasets;
  }
}
