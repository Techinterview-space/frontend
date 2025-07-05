import { Chart } from "chart.js/auto";
import { RandomRgbColor } from "../random-rgb-color";
import { ProfessionDistributionData } from "@services/user-salaries.service";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
}

export class PeopleDistributionChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(
    canvasId: string,
    data: ProfessionDistributionData,
    otherLimit: number,
    title: string,
  ) {
    const datasets: Array<ChartDatasetType> = [];

    // Filter professions that meet the minimum count threshold
    const professionsToInclude = data.items.filter((x) => x.count > otherLimit);

    if (data.totalCount > 0) {
      const dataForDataset = professionsToInclude.map((x) => {
        return {
          value: x.percentage,
          color: new RandomRgbColor().toString(0.8),
        };
      });

      // Add "Other" category if there are professions below the threshold
      if (data.otherCount > 0) {
        dataForDataset.push({
          value: data.otherPercentage,
          color: new RandomRgbColor().toString(0.8),
        });
      }

      datasets.push({
        label: "Процентное соотношение",
        data: dataForDataset.map((x) => x.value),
        backgroundColor: dataForDataset.map((x) => x.color),
      });
    }

    const labels = professionsToInclude.map((x) => x.profession.title);
    if (data.otherCount > 0) {
      labels.push("Другие");
    }

    super(canvasId, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "left",
            title: {
              text: title,
              font: {
                size: 16,
              },
              position: "start",
              display: true,
            },
          },
        },
      },
    });

    this.datasets = datasets;
  }
}
