import { Chart } from "chart.js/auto";
import { ChartTheme } from "../chart-theme";

export interface IndustriesChartItem {
  label: string;
  value: number;
  percent: number;
  isAggregate: boolean;
}

interface IndustriesBarDataset {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
  borderRadius: number;
}

// Horizontal sorted bars for the industries drill-down. The "Другие"/"Точнее"
// aggregate is rendered as a muted, clickable bar; clicking it asks the host
// component to drill one level deeper. A mutable holder keeps the event
// closures pointed at the current page's items across re-renders.
export class WorkIndustriesChartDataObject extends Chart {
  private readonly state: { items: Array<IndustriesChartItem> };

  constructor(
    canvasId: string,
    items: Array<IndustriesChartItem>,
    onAggregateClick: () => void,
  ) {
    ChartTheme.applyDefaults();
    const state: { items: Array<IndustriesChartItem> } = { items };

    super(canvasId, {
      type: "bar",
      data: WorkIndustriesChartDataObject.buildData(items),
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        onClick: (_event, elements) => {
          const el = elements[0];
          if (el != null && state.items[el.index]?.isAggregate) {
            onAggregateClick();
          }
        },
        onHover: (event, elements) => {
          const target = event.native?.target as HTMLElement | null;
          if (target == null) {
            return;
          }
          const el = elements[0];
          const overAggregate =
            el != null && state.items[el.index]?.isAggregate === true;
          target.style.cursor = overAggregate ? "pointer" : "default";
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const item = state.items[ctx.dataIndex];
                const percent = item != null ? item.percent : 0;
                return ` ${ctx.parsed.x ?? 0} анкет (${percent.toFixed(1)}%)`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { precision: 0 },
          },
          y: {
            grid: { display: false },
          },
        },
      },
    });

    this.state = state;
  }

  setItems(items: Array<IndustriesChartItem>): void {
    this.state.items = items;
    const built = WorkIndustriesChartDataObject.buildData(items);
    this.data.labels = built.labels;
    this.data.datasets = built.datasets;
    this.update();
  }

  private static buildData(items: Array<IndustriesChartItem>): {
    labels: Array<string>;
    datasets: Array<IndustriesBarDataset>;
  } {
    const accent = ChartTheme.primary();
    const muted = ChartTheme.gradeUnknown();
    return {
      labels: items.map((x) => x.label),
      datasets: [
        {
          label: "Кол-во анкет",
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
