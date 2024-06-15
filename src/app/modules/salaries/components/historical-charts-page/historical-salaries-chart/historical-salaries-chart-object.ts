import { SalariesCountWeekByWeekChart } from "@services/historical-charts.service";
import { Chart, ChartType, PointStyle } from "chart.js/auto";
import { RandomRgbColor } from "../../random-rgb-color";

interface ChartDatasetType {
    label: string;
    data: Array<number>;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    pointStyle: PointStyle;
    yAxisID: 'y' | 'y1',
}

export class HistoricalSalariesChartObject extends Chart {
    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, chartData: SalariesCountWeekByWeekChart) {
        const randomColor = new RandomRgbColor();

        // По датасету на медиану и среднюю
        const datasets: Array<ChartDatasetType> = [
          {
            label: "Все анкеты",
            data: [],
            borderWidth: 1,
            borderColor: randomColor.toString(1),
            backgroundColor: randomColor.toString(0.5),
            pointStyle: false as PointStyle,
            yAxisID: 'y',
          },
          {
            label: "Количество анкет",
            data: chartData.totalCountItems.map(x => x.totalCount),
            borderWidth: 1,
            borderColor: randomColor.toString(1),
            backgroundColor: randomColor.toString(0.5),
            pointStyle: false as PointStyle,
            yAxisID: 'y1',
          },
        ];
    
        super(canvasId, {
          type: "line" as ChartType,
          data: {
            labels: chartData
                .weekEnds
                .map((x) => x.toISOString().slice(0, 10)),
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                position: 'left',
              },
              y1: {
                beginAtZero: true,
                position: 'right',
              }
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
