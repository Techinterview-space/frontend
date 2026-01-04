import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { WeeklyCurrencyChartData } from "@services/currencies-collection.service";
import { CurrencyType } from "@services/admin-tools.service";
import { RgbColor } from "../rgb-color";

interface ChartDatasetType {
  label: string;
  data: Array<number>;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointStyle: PointStyle;
  hidden?: boolean;
}

// Fixed colors for each currency for consistent appearance
const CURRENCY_COLORS: Record<CurrencyType, RgbColor> = {
  [CurrencyType.Undefined]: new RgbColor(128, 128, 128),
  [CurrencyType.KZT]: new RgbColor(0, 123, 255),
  [CurrencyType.USD]: new RgbColor(34, 139, 34),
  [CurrencyType.EUR]: new RgbColor(65, 105, 225),
  [CurrencyType.RUB]: new RgbColor(220, 53, 69),
  [CurrencyType.KGS]: new RgbColor(255, 193, 7),
  [CurrencyType.SAR]: new RgbColor(111, 66, 193),
  [CurrencyType.AED]: new RgbColor(23, 162, 184),
  [CurrencyType.CAD]: new RgbColor(232, 62, 140),
};

const CURRENCY_LABELS: Record<CurrencyType, string> = {
  [CurrencyType.Undefined]: "Не указано",
  [CurrencyType.KZT]: "KZT",
  [CurrencyType.USD]: "USD",
  [CurrencyType.EUR]: "EUR",
  [CurrencyType.RUB]: "RUB",
  [CurrencyType.KGS]: "KGS",
  [CurrencyType.SAR]: "SAR",
  [CurrencyType.AED]: "AED",
  [CurrencyType.CAD]: "CAD",
};

export class CurrenciesChartObject extends Chart {
  private readonly datasets: Array<ChartDatasetType> = [];

  constructor(canvasId: string, chartData: WeeklyCurrencyChartData[]) {
    // Ensure chartData is an array
    const safeChartData = Array.isArray(chartData) ? chartData : [];

    // Get all unique currencies from the data
    const allCurrencies = new Set<CurrencyType>();
    safeChartData.forEach((week) => {
      week.averageCurrencies?.forEach((c) => {
        if (c.currency !== CurrencyType.KZT) {
          allCurrencies.add(c.currency);
        }
      });
    });

    // Create labels from week dates
    const labels = safeChartData.map((week) => {
      const startDate = new Date(week.weekStartDate);
      return startDate.toISOString().slice(0, 10);
    });

    // Create datasets for each currency
    const datasets: Array<ChartDatasetType> = [];
    allCurrencies.forEach((currency) => {
      const data = safeChartData.map((week) => {
        const currencyItem = week.averageCurrencies?.find(
          (c) => c.currency === currency,
        );
        return currencyItem?.value ?? 0;
      });

      const color = CURRENCY_COLORS[currency] ?? new RgbColor(128, 128, 128);
      const label = CURRENCY_LABELS[currency] ?? CurrencyType[currency];

      datasets.push(
        new DatasetItem(label, data, 2, color, "circle" as PointStyle),
      );
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
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            beginAtZero: false,
            position: "left",
            title: {
              display: true,
              text: "Курс в KZT",
            },
          },
          x: {
            title: {
              display: true,
              text: "Неделя",
            },
          },
        },
        elements: {
          line: {
            tension: 0.3,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            title: {
              display: false,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                if (value == null) {
                  return `${context.dataset.label}: N/A`;
                }
                return `${context.dataset.label}: ${value.toFixed(2)} KZT`;
              },
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
    readonly color: RgbColor,
    readonly pointStyle: PointStyle,
  ) {
    this.borderColor = color.toString(1);
    this.backgroundColor = color.toString(0.5);
  }

  readonly borderColor: string;
  readonly backgroundColor: string;
}

