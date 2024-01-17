import { UserProfession } from '@models/salaries/user-profession';
import { SalariesByMoneyBarChart } from '@services/user-salaries.service';
import { Chart, ChartType }  from 'chart.js/auto';
import { RandomRgbColor } from './random-rgb-color';

interface ChartDatasetType {
    profession: UserProfession | null;
    label: string;
    data: Array<number>;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    type: ChartType;
}

export class SalariesChartJsObject extends Chart {

    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, chartData: SalariesByMoneyBarChart) {

        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
        const randomColor = new RandomRgbColor();
        const datasets: Array<ChartDatasetType> = [
        {
            profession: null,
            type: 'line' as ChartType,
            label: 'Все',
            data: chartData.items.map(x => x.count),
            borderWidth: 3,
            borderColor: randomColor.toString(1),
            backgroundColor: randomColor.toString(0.5),
        },
        ];

        chartData.itemsByProfession.forEach((x, i) => {
        const color = new RandomRgbColor();
        datasets.push({
            profession: x.profession,
            label: UserProfession[x.profession].toString(),
            data: x.items.map(x => x.count),
            borderWidth: 1,
            borderColor: color.toString(0.6),
            backgroundColor: color.toString(0.3),
            type: 'bar' as ChartType,
        });
        });

        super(
            canvasId,
            {
                type: 'scatter',
                data: {
                    labels: chartData.labels
                    .map(x => {
                        let num = Number(x);
                        if (isNaN(num)) {
                        throw Error('Invalid label ' + x);
                        }

                        num = num / 1000;
                        return num + 'k';
                    }),
                    datasets: datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    elements: {
                        line: {
                            tension: 0.4
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            title: {
                                position: 'start',
                            },
                          }
                    }
                },
            });

        this.datasets = datasets;
    }

    hideBarDatasets(): void {
        for (let index = 0; index < this.datasets.length; index++) {
            const dataset = this.datasets[index];
            if (dataset.type == 'bar') {
                this.setDatasetVisibility(index, false);
            }
        }

        this.update();
    }

    toggleDatasetByProfession(profession: UserProfession): void {
        const index = this.datasets.findIndex(x => x.profession == profession);
        if (index == -1) {
            return;
        }

        const visibility = !this.isDatasetVisible(index);
        this.setDatasetVisibility(index, visibility);
        this.update();
    }
}