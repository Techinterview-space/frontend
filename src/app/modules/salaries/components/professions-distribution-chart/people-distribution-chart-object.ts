import { Chart } from "chart.js/auto";
import { ChartTheme } from "../chart-theme";

// Bars carry a percentage value. "Другие"/"Точнее" are aggregates (muted);
// only a drillable aggregate is clickable — the backend's pre-aggregated
// residual renders as a muted but non-clickable terminal bucket.
export interface ProfessionsChartItem {
  label: string;
  value: number;
  isAggregate: boolean;
  drillable: boolean;
}

interface ProfessionsBarDataset {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
  borderRadius: number;
}

// Horizontal sorted bars for one professions chart. Clicking a drillable
// aggregate asks the host to page one level deeper. A mutable holder keeps the
// event closures pointed at the current page's items across re-renders.
export class PeopleDistributionChartObject extends Chart {
  private readonly state: { items: Array<ProfessionsChartItem> };

  constructor(
    canvasId: string,
    items: Array<ProfessionsChartItem>,
    title: string,
    onDrillClick: () => void,
  ) {
    ChartTheme.applyDefaults();
    const state: { items: Array<ProfessionsChartItem> } = { items };

    super(canvasId, {
      type: "bar",
      data: PeopleDistributionChartObject.buildData(items),
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        onClick: (_event, elements) => {
          const el = elements[0];
          if (el != null && state.items[el.index]?.drillable) {
            onDrillClick();
          }
        },
        onHover: (event, elements) => {
          const target = event.native?.target as HTMLElement | null;
          if (target == null) {
            return;
          }
          const el = elements[0];
          const overDrillable =
            el != null && state.items[el.index]?.drillable === true;
          target.style.cursor = overDrillable ? "pointer" : "default";
        },
        plugins: {
          legend: { display: false },
          title: {
            text: title,
            font: { size: 16, weight: "bold" },
            align: "start",
            display: true,
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${(ctx.parsed.x ?? 0).toFixed(1)}%`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { callback: (v) => `${v}%` },
          },
          y: {
            grid: { display: false },
          },
        },
      },
    });

    this.state = state;
  }

  setItems(items: Array<ProfessionsChartItem>): void {
    this.state.items = items;
    const built = PeopleDistributionChartObject.buildData(items);
    this.data.labels = built.labels;
    this.data.datasets = built.datasets;
    this.update();
  }

  private static buildData(items: Array<ProfessionsChartItem>): {
    labels: Array<string>;
    datasets: Array<ProfessionsBarDataset>;
  } {
    const accent = ChartTheme.primary();
    const muted = ChartTheme.gradeUnknown();
    return {
      labels: items.map((x) => x.label),
      datasets: [
        {
          label: "Доля, %",
          data: items.map((x) => x.value),
          backgroundColor: items.map((x) => (x.isAggregate ? muted : accent)),
          borderColor: items.map((x) => (x.isAggregate ? muted : accent)),
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };
  }
}
