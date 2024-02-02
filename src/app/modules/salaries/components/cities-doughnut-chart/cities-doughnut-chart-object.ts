import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { KazakhstanCity, KazakhstanCityEnum } from '@models/salaries/kazakhstan-city';
import { UserSalary } from '@models/salaries/salary.model';

interface ChartDatasetType {
    label: string;
    data: Array<number>;
    backgroundColor: Array<string>;
    hoverOffset: number;
}

export class CitiesDoughnutChartObject extends Chart {

    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, salaries: Array<UserSalary>) {
        const datasets: Array<ChartDatasetType> = [];

        const cities: Array<{city: KazakhstanCity | null, count: number}> = [];
        salaries.forEach(x => {

            const item = cities.find(c => c.city == x.city);
            if (item == null) {
                cities.push({city: x.city, count: 1});
                return;
            }

            item.count++;
        });

        datasets.push({
            label: 'Город проживания',
            data: cities.map(x => x.count),
            backgroundColor: cities.map(x => new RandomRgbColor().toString(1)),
            hoverOffset: 4,
        });

        super(
            canvasId,
            {
                type: 'doughnut',
                data: {
                    labels: cities.map(x => x.city != null
                        ? KazakhstanCityEnum.label(x.city) + ` (${x.count})`
                        : `Не указан (${x.count})`),
                    datasets: datasets,
                },
                options: {
                    aspectRatio: 1,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            title: {
                                display: false,
                            },
                          }
                    }
                },
            });

        this.datasets = datasets;
    }
}