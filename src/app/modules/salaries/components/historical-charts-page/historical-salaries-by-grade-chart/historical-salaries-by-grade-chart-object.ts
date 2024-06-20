import {
  SalariesCountWeekByWeekChart,
  SalariesCountWeekByWeekChartGradeItem,
} from "@services/historical-charts.service";
import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";
import { DeveloperGrade, DeveloperGradeEnum } from "@models/enums";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointStyle: PointStyle;
  grade: DeveloperGrade | null;
  yAxisID: "y" | "y1";
  hidden: boolean;

  toggle(): void;
}

export class HistoricalSalariesByGradeChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, chartData: SalariesCountWeekByWeekChart) {
    const datasets: Array<ChartDatasetType> = [];

    const juniorSalaries = [];
    const middleSalaries = [];
    const seniorSalaries = [];
    const leadSalaries = [];

    for (let index = 0; index < chartData.gradeItems.length; index++) {
      const element = chartData.gradeItems[index];

      switch (element.grade) {
        case DeveloperGrade.Junior:
          juniorSalaries.push(element);
          break;

        case DeveloperGrade.Middle:
          middleSalaries.push(element);
          break;

        case DeveloperGrade.Senior:
          seniorSalaries.push(element);
          break;

        case DeveloperGrade.Lead:
          leadSalaries.push(element);
          break;
      }
    }

    datasets.push(
      ...HistoricalSalariesByGradeChartObject.getDatasetForGrade(
        DeveloperGrade.Junior,
        juniorSalaries,
        false
      ),
      ...HistoricalSalariesByGradeChartObject.getDatasetForGrade(
        DeveloperGrade.Middle,
        middleSalaries,
        false
      ),
      ...HistoricalSalariesByGradeChartObject.getDatasetForGrade(
        DeveloperGrade.Senior,
        seniorSalaries,
        false
      ),
      ...HistoricalSalariesByGradeChartObject.getDatasetForGrade(
        DeveloperGrade.Lead,
        leadSalaries,
        false
      ),
      new DatasetItem(
        "Количество анкет",
        chartData.totalCountItems.map((x) => x.totalCount),
        4,
        new RandomRgbColor(),
        "circle",
        null,
        "y1",
        false
      ),
    );

    super(canvasId, {
      type: "line" as ChartType,
      data: {
        labels: chartData.weekEnds.map((x) => x.toISOString().slice(0, 10)),
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

  toggle(grade: DeveloperGrade): void {
    this.datasets.filter((x) => x.grade === grade).forEach((x) => x.toggle());

    this.update();
  }

  private static getDatasetForGrade(
    grade: DeveloperGrade,
    items: Array<SalariesCountWeekByWeekChartGradeItem>,
    hidden: boolean
  ): Array<DatasetItem> {
    const prefix = DeveloperGrade[grade];
    return [
      new DatasetItem(
        prefix + ", медиана, КЗ",
        items.map((x) => x.localMedian),
        2,
        new RandomRgbColor(),
        true as PointStyle,
        grade,
        "y",
        hidden
      ),
      new DatasetItem(
        prefix + ", средняя, КЗ",
        items.map((x) => x.localAverage),
        2,
        new RandomRgbColor(),
        true as PointStyle,
        grade,
        "y",
        hidden
      ),
      new DatasetItem(
        prefix + ", медиана, удаленка",
        items.map((x) => x.remoteMedian),
        2,
        new RandomRgbColor(),
        true as PointStyle,
        grade,
        "y",
        hidden
      ),
      new DatasetItem(
        prefix + ", средняя, удаленка",
        items.map((x) => x.remoteAverage),
        2,
        new RandomRgbColor(),
        true as PointStyle,
        grade,
        "y",
        hidden
      ),
    ];
  }
}

class DatasetItem implements ChartDatasetType {
  constructor(
    readonly label: string,
    readonly data: number[],
    readonly borderWidth: number,
    readonly color: RandomRgbColor,
    readonly pointStyle: PointStyle,
    readonly grade: DeveloperGrade | null,
    readonly yAxisID: "y1" | "y",
    hidden: boolean
  ) {
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.5);
    this.hidden = hidden;
  }

  hidden: boolean;
  readonly borderColor: string;
  readonly backgroundColor: string;

  toggle(): void {
    this.hidden = !this.hidden;
  }
}
