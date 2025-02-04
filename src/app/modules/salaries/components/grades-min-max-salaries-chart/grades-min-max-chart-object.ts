import { Chart } from "chart.js/auto";
import { RandomRgbColor } from "../random-rgb-color";
import { UserSalary } from "@models/salaries/salary.model";
import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { BoxPlotChart } from "@sgratzl/chartjs-chart-boxplot";
import { PercentileCollection } from "@shared/value-objects/percentile-collection";

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

  constructor(canvasId: string, salaries: Array<UserSalary>) {
    const datasets: Array<ChartDataset> = [];

    new RandomRgbColor().toString(1);

    const salariesLocal: Array<UserSalary> = [];
    const salariesRemote: Array<UserSalary> = [];

    salaries.forEach((x) => {
      if (x.grade == null) {
        return;
      }

      if (x.company == CompanyType.Remote) {
        salariesRemote.push(x);
        return;
      }

      salariesLocal.push(x);
    });

    if (salariesLocal.length > 0) {
      datasets.push(new ChartDataset(salariesLocal, "Казахстанская компания"));
    }

    if (salariesRemote.length > 0) {
      datasets.push(new ChartDataset(salariesRemote, "Иностранная компания"));
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

  constructor(salariesSource: Array<UserSalary>, readonly label: string) {
    const color = new RandomRgbColor();
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.7);

    this.data = GradesMinMaxSalariesChartObject.grades.map((g) => {
      const salaries = salariesSource
        .filter((s) => s.grade == g.grade)
        .sort((a, b) => a.value - b.value);

      return new ChartDatasetItem(salaries);
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

  constructor(salaries: Array<UserSalary>) {
    const itemsForChart = new PercentileCollection(salaries).getValues();
    if (itemsForChart.length === 0) {
      this.min = 0;
      this.max = 0;
      this.median = 0;
      this.q1 = 0;
      this.q3 = 0;
      this.mean = 0;
      this.items = [];
      return;
    }

    this.min = itemsForChart[0].value;
    this.max = itemsForChart[itemsForChart.length - 1].value;
    this.median = itemsForChart[Math.floor(itemsForChart.length / 2)].value;
    this.q1 = itemsForChart[Math.floor(itemsForChart.length / 4)].value;
    this.q3 = itemsForChart[Math.floor((itemsForChart.length * 3) / 4)].value;
    this.mean =
      itemsForChart.reduce((a, b) => a + b.value, 0) / itemsForChart.length;

    this.items = itemsForChart.map((s) => s.value);
  }
}
