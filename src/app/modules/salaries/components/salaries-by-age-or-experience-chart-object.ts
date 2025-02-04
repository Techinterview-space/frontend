import { Chart } from "chart.js/auto";
import { SalariesByAgeOrExperienceChart } from "@services/user-salaries.service";
import { RandomRgbColor } from "./random-rgb-color";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: string;
  borderColor: string;
  tension: number;
  fill: boolean;
}

export class SalariesByAgeOrExperienceChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(
    canvasId: string,
    private readonly source: SalariesByAgeOrExperienceChart
  ) {
    const medianRandomColor = new RandomRgbColor();
    const averageRandomColor = new RandomRgbColor();

    const datasets: Array<ChartDatasetType> = [
      {
        label: "Медиана",
        data: source.medianSalaries,
        backgroundColor: medianRandomColor.toString(0.8),
        borderColor: medianRandomColor.toString(1),
        tension: 0.3,
        fill: false,
      },
      {
        label: "Среднее",
        data: source.averageSalaries,
        backgroundColor: averageRandomColor.toString(0.8),
        borderColor: averageRandomColor.toString(1),
        tension: 0.3,
        fill: false,
      },
    ];

    super(canvasId, {
      type: "line",
      data: {
        labels: source.labels
        .map((x, i) => {

          if (source.itemsCount[i] === 0) {
            return null;
          }

          if (i === 0) {
            return `< ${x.end} (n=${source.itemsCount[i]})`;
          }

          if (i === source.labels.length - 1) {
            return `> ${x.start} (n=${source.itemsCount[i]})`;
          }

          if (x.end - x.start === 1) {
            return `до ${x.end} (n=${source.itemsCount[i]})`;
          }

          return `${x.start}-${x.end} (n=${source.itemsCount[i]})`;
        })
        .filter((x) => x != null),
        datasets: datasets,
      },
      options: {
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
}
