import { UserProfession } from '@models/salaries/user-profession';
import { SalariesByMoneyBarChart } from '@services/user-salaries.service';
import { Chart, ChartType, PointStyle }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';

interface ChartDatasetType {
    profession: UserProfession | null;
    label: string;
    data: Array<number>;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    type: ChartType;
    pointStyle: PointStyle;
}

export class SalariesChartJsObject extends Chart {

    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, chartData: SalariesByMoneyBarChart) {
        const randomColor = new RandomRgbColor();
        const datasets: Array<ChartDatasetType> = [];

        chartData.itemsByProfession.forEach((x, i) => {
            const color = new RandomRgbColor();
            datasets.push({
                profession: x.profession,
                label: UserProfession[x.profession].toString(),
                data: x.items,
                borderWidth: 2,
                borderColor: color.toString(1),
                backgroundColor: color.toString(0.7),
                type: 'line' as ChartType,
                pointStyle: false as PointStyle,
            });
        });

        datasets.push(
            {
                profession: null,
                type: 'bar' as ChartType,
                label: 'Все',
                data: chartData.items,
                borderWidth: 1,
                borderColor: randomColor.toString(1),
                backgroundColor: randomColor.toString(0.5),
                pointStyle: false as PointStyle,
            },
        );

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
                            type: 'linear',
                            min: 0,
                            
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

    hideProfessionDatasets(): void {
        for (let index = 0; index < this.datasets.length; index++) {
            const dataset = this.datasets[index];
            if (dataset.profession != null) {
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