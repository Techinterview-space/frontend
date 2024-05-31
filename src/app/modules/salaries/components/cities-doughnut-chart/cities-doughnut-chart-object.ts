import { Chart } from "chart.js/auto";
import { RandomRgbColor } from "../random-rgb-color";
import {
  KazakhstanCity,
  KazakhstanCityEnum,
} from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  hoverOffset: number;
}

interface CityWithCount {
  city: KazakhstanCity | null;
  count: number;
}

export class CitiesDoughnutChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];
  private readonly uniqueCities: Array<CityWithCount> = [];

  constructor(canvasId: string, private readonly salaries: Array<UserSalary>) {
    const datasets: Array<ChartDatasetType> = [];

    const uniqueCities = CitiesDoughnutChartObject.prepareUniqueItems(
      salaries,
      KazakhstanCityEnum.allItems()
    );
    datasets.push(new ChartDatasetItem(uniqueCities, salaries, false));

    super(canvasId, {
      type: "doughnut",
      data: {
        labels: uniqueCities
          .filter((x) => x.city != null)
          .map((x) => KazakhstanCityEnum.label(x.city!) + ` (${x.count})`),
        datasets: datasets,
      },
      options: {
        aspectRatio: 1,
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
    this.uniqueCities = uniqueCities;
  }

  toggleNoDataArea(show: boolean): void {
    const items = show
      ? this.uniqueCities
      : this.uniqueCities.filter((x) => x.city != null);

    this.data.labels = items.map(
      (x) =>
        (x.city != null ? KazakhstanCityEnum.label(x.city) : "Нет данных") +
        ` (${x.count})`
    );

    if (show) {
      this.data.labels.push("Не указаны данные");
    }

    this.data.datasets = [
      new ChartDatasetItem(this.uniqueCities, this.salaries, show),
    ];

    this.update();
  }

  private static prepareUniqueItems(
    salaries: UserSalary[],
    cities: KazakhstanCity[]
  ): CityWithCount[] {
    const uniqueItems: Array<CityWithCount> = [];
    salaries.forEach((x) => {
      const item = uniqueItems.find((c) => c.city == x.city);
      if (item == null) {
        uniqueItems.push({ city: x.city, count: 1 });
        return;
      }

      item.count++;
    });

    return uniqueItems
      .sort((x, y) => y.count - x.count);
  }
}

class ChartDatasetItem {
  readonly label: string;
  readonly data: Array<number>;
  readonly backgroundColor: Array<string>;
  readonly hoverOffset: number;

  constructor(
    uniqueCities: Array<CityWithCount>,
    salaries: Array<UserSalary>,
    includeNoData: boolean
  ) {
    this.label = "Город проживания";
    this.data = [];
    this.backgroundColor = [];
    this.hoverOffset = 4;

    if (salaries.length === 0) {
      return;
    }

    uniqueCities
      .filter((x) => x.city != null)
      .forEach((s) => {
        this.data.push(salaries.filter((x) => x.city === s.city).length);
        this.backgroundColor.push(new RandomRgbColor().toString(0.4));
      });

    if (includeNoData) {
      const noDataSalaries = uniqueCities.filter((x) => x.city == null).length;
      this.data.push(noDataSalaries);
      this.backgroundColor.push(new RandomRgbColor().toString(0.4));
    }
  }
}
