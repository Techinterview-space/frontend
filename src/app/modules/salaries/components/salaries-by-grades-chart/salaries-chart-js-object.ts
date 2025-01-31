import { SalariesByMoneyBarChart } from "@services/user-salaries.service";
import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../random-rgb-color";
import { LabelEntityDto } from "@services/label-entity.model";

interface ChartDatasetType {
  profession: number | null;
  label: string;
  data: Array<number>;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  type: ChartType;
  pointStyle: PointStyle;
}

export class SalariesChartJsObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(
    canvasId: string,
    chartData: SalariesByMoneyBarChart
  ) {
    const randomColor = new RandomRgbColor();
    const datasets: Array<ChartDatasetType> = [];

    datasets.push({
      profession: null,
      type: "bar" as ChartType,
      label: "Все",
      data: chartData.items,
      borderWidth: 1,
      borderColor: randomColor.toString(1),
      backgroundColor: randomColor.toString(0.5),
      pointStyle: false as PointStyle,
    });

    super(canvasId, {
      type: "scatter",
      data: {
        labels: chartData.labels.map((x) => {
          let num = Number(x);
          if (isNaN(num)) {
            throw Error("Invalid label " + x);
          }

          num = num / 1000;
          return num + "k";
        }),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "linear",
            min: 0,
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

  toggleDatasetByProfession(professionId: number | null): void {
    const index = this.datasets.findIndex((x) => x.profession == professionId);
    if (index == -1) {
      return;
    }

    const visibility = !this.isDatasetVisible(index);
    this.setDatasetVisibility(index, visibility);
    this.update();
  }
}
