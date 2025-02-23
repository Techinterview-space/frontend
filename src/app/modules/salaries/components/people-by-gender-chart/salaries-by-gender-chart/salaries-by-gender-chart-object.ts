import { Chart } from "chart.js/auto";
import { SalariesByGenderChart } from "@services/user-salaries.service";
import { GenderEnum } from "@models/enums/gender.enum";
import { RandomRgbColor } from "../../random-rgb-color";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: string;
  borderColor: string;
}

export class SalariesByGenderChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(
    canvasId: string,
    private readonly source: SalariesByGenderChart,
  ) {
    const datasets = source.datasetByGender.map((x) => {
      const color = new RandomRgbColor();
      return {
        label: GenderEnum.labelPlural(x.gender),
        data: x.averageSalaries,
        backgroundColor: color.toString(0.8),
        borderColor: color.toString(1),
      };
    });

    super(canvasId, {
      type: "bar",
      data: {
        labels: source.labels,
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
