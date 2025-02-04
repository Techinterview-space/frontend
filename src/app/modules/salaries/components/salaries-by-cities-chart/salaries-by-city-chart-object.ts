import { Chart } from "chart.js/auto";
import { SalariesByCityChart } from "@services/user-salaries.service";
import { RandomRgbColor } from "../random-rgb-color";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: string;
  borderColor: string;
}

export class SalariesByCityChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, private readonly source: SalariesByCityChart) {
    const medianRandomColor = new RandomRgbColor();
    const averageRandomColor = new RandomRgbColor();

    const datasets: Array<ChartDatasetType> = [
      {
        label: "Медиана",
        data: source.medianSalaries,
        backgroundColor: medianRandomColor.toString(0.8),
        borderColor: medianRandomColor.toString(1),
      },
      {
        label: "Среднее",
        data: source.averageSalaries,
        backgroundColor: averageRandomColor.toString(0.8),
        borderColor: averageRandomColor.toString(1),
      },
    ];

    console.log(source);
    super(canvasId, {
      type: "bar",
      data: {
        labels: source.labels.map((x, i) => {
          return `${x} (n=${source.itemsCount[i]})`;
        }),
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
