import { RandomRgbColor } from "../random-rgb-color";
import { DeveloperGrade } from "@models/enums";
import { BoxPlotChart } from "@sgratzl/chartjs-chart-boxplot";
import {
  GradesMinMaxChartData,
  GradeBoxPlotData,
} from "@services/user-salaries.service";

export class GradesMinMaxSalariesChartObject extends BoxPlotChart {
  static readonly grades: Array<{ grade: DeveloperGrade; label: string }> = [
    {
      grade: DeveloperGrade.Trainee,
      label: DeveloperGrade[DeveloperGrade.Trainee],
    },
    {
      grade: DeveloperGrade.Junior,
      label: DeveloperGrade[DeveloperGrade.Junior],
    },
    {
      grade: DeveloperGrade.Middle,
      label: DeveloperGrade[DeveloperGrade.Middle],
    },
    {
      grade: DeveloperGrade.Senior,
      label: DeveloperGrade[DeveloperGrade.Senior],
    },
    { grade: DeveloperGrade.Lead, label: DeveloperGrade[DeveloperGrade.Lead] },
  ];

  private readonly datasets: Array<ChartDataset> = [];

  constructor(canvasId: string, chartData: GradesMinMaxChartData) {
    const datasets: Array<ChartDataset> = [];

    if (chartData.localData.length > 0) {
      datasets.push(
        new ChartDataset(chartData.localData, "Казахстанская компания"),
      );
    }

    if (chartData.remoteData.length > 0) {
      datasets.push(
        new ChartDataset(chartData.remoteData, "Иностранная компания"),
      );
    }

    super(canvasId, {
      data: {
        labels: GradesMinMaxSalariesChartObject.grades.map((x) => x.label),
        datasets: datasets,
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        responsive: true,
        elements: {},
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

class ChartDataset {
  readonly data: Array<ChartDatasetItem>;
  readonly borderColor: string;
  readonly backgroundColor: string;
  readonly borderRadius = 5;
  readonly borderWidth = 2;
  readonly itemRadius = 1;
  readonly itemStyle = "circle";
  readonly itemBackgroundColor = "#000";

  constructor(
    gradeData: Array<GradeBoxPlotData>,
    readonly label: string,
  ) {
    const color = new RandomRgbColor();
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.7);

    this.data = GradesMinMaxSalariesChartObject.grades.map((g) => {
      const gradeBoxPlot = gradeData.find((data) => data.grade === g.grade);
      return new ChartDatasetItem(gradeBoxPlot);
    });
  }
}

class ChartDatasetItem {
  readonly min: number;
  readonly q1: number;
  readonly median: number;
  readonly q3: number;
  readonly max: number;
  readonly items: Array<number>;
  readonly mean: number;

  constructor(gradeBoxPlot: GradeBoxPlotData | undefined) {
    if (gradeBoxPlot == null) {
      this.min = 0;
      this.max = 0;
      this.median = 0;
      this.q1 = 0;
      this.q3 = 0;
      this.mean = 0;
      this.items = [];
      return;
    }

    this.min = gradeBoxPlot.min;
    this.max = gradeBoxPlot.max;
    this.median = gradeBoxPlot.median;
    this.q1 = gradeBoxPlot.q1;
    this.q3 = gradeBoxPlot.q3;
    this.mean = gradeBoxPlot.mean;
    this.items = gradeBoxPlot.items;
  }
}
