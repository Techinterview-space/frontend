import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { KazakhstanCity, KazakhstanCityEnum } from '@models/salaries/kazakhstan-city';
import { UserSalary } from '@models/salaries/salary.model';
import { SalariesChart } from '../salaries-chart/salaries-chart';
import { UserProfessionEnum } from '@models/salaries/user-profession';
import { CompanyType } from '@models/salaries/company-type';

interface ChartDatasetType {
    label: string;
    data: Array<number>;
    backgroundColor: string;
}

export class PeopleDistributionChartObject extends Chart {

    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, chart: SalariesChart) {
        const datasets: Array<ChartDatasetType> = [];

        const maxcount = chart.salaries.filter(x => x.company === CompanyType.Local).length;

        // TODO mgorbatyuk: wrong calculation, should be fixed
        chart.salariesByMoneyBarChart?.itemsByProfession.forEach((x, i) => {
            datasets.push({
                label: UserProfessionEnum.label(x.profession),
                data: x.items.map(s => (s.count/ maxcount * 100)),
                backgroundColor: new RandomRgbColor().toString(0.6),
            });
        });

        super(
            canvasId,
            {
                type: 'bar',
                data: {
                    labels: ["Казахстанские компании", "Иностранные компании"],
                    datasets: datasets,
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                        }
                    }
                },
            });

        this.datasets = datasets;
    }
}