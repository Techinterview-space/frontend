import { HistoricalDataByTemplate } from "@services/historical-charts.service";
import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointStyle: PointStyle;
  yAxisID: "y" | "y1";
}

export class HistoricalSalariesChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, template: HistoricalDataByTemplate) {
    const dataPoints = template.dataPoints ?? [];

    const datasets: Array<ChartDatasetType> = [
      new DatasetItem(
        "Медиана",
        dataPoints.map((x) => x.medianLocalSalary),
        2,
        new RandomRgbColor(),
        true as PointStyle,
        "y",
      ),
      new DatasetItem(
        "Средняя",
        dataPoints.map((x) => x.averageLocalSalary),
        2,
        new RandomRgbColor(),
        true as PointStyle,
        "y",
      ),
      new DatasetItem(
        "Количество анкет",
        dataPoints.map((x) => x.totalSalaryCount),
        4,
        new RandomRgbColor(),
        "circle",
        "y1",
      ),
    ];

    // Add grade-based median datasets if available
    const firstPointWithGrades = dataPoints.find(
      (x) => x.medianLocalSalaryByGrade != null,
    );
    if (firstPointWithGrades?.medianLocalSalaryByGrade) {
      const grades = Object.keys(
        firstPointWithGrades.medianLocalSalaryByGrade,
      ) as Array<keyof typeof firstPointWithGrades.medianLocalSalaryByGrade>;

      for (const grade of grades) {
        if (grade === "Undefined") continue;

        const gradeData = dataPoints.map(
          (x) => x.medianLocalSalaryByGrade?.[grade] ?? 0,
        );

        // Only add if there's actual data
        if (gradeData.some((v) => v > 0)) {
          datasets.push(
            new DatasetItem(
              `Медиана ${grade}`,
              gradeData,
              1,
              new RandomRgbColor(),
              "rect" as PointStyle,
              "y",
            ),
          );
        }
      }
    }

    const labels = dataPoints.map((x) => {
      const date = new Date(x.date);
      return date.toISOString().slice(0, 10);
    });

    super(canvasId, {
      type: "line" as ChartType,
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            position: "left",
          },
          y1: {
            beginAtZero: true,
            position: "right",
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

class DatasetItem implements ChartDatasetType {
  constructor(
    readonly label: string,
    readonly data: number[],
    readonly borderWidth: number,
    readonly color: RandomRgbColor,
    readonly pointStyle: PointStyle,
    readonly yAxisID: "y1" | "y",
  ) {
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.5);
  }

  readonly borderColor: string;
  readonly backgroundColor: string;
}
