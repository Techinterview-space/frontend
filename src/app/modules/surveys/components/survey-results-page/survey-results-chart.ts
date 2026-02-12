import { Chart } from "chart.js/auto";
import { PublicSurveyOptionResult } from "@models/public-survey.model";

const CHART_COLORS = [
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 99, 132, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
  "rgba(46, 204, 113, 0.7)",
  "rgba(231, 76, 60, 0.7)",
  "rgba(52, 152, 219, 0.7)",
  "rgba(241, 196, 15, 0.7)",
];

export class SurveyResultsChart extends Chart {
  constructor(
    canvasId: string,
    options: PublicSurveyOptionResult[],
  ) {
    const colors = options.map(
      (_, i) => CHART_COLORS[i % CHART_COLORS.length],
    );

    super(canvasId, {
      type: "pie",
      data: {
        labels: options.map((o) => `${o.text} (${o.responseCount})`),
        datasets: [
          {
            data: options.map((o) => o.responseCount),
            backgroundColor: colors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const option = options[context.dataIndex];
                return ` ${option.text}: ${option.responseCount} (${option.percentage.toFixed(1)}%)`;
              },
            },
          },
        },
      },
    });
  }
}
