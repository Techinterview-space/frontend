import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { KazakhstanCity, KazakhstanCityEnum } from '@models/salaries/kazakhstan-city';
import { UserSalary } from '@models/salaries/salary.model';
import { SalariesChart } from '../salaries-chart/salaries-chart';
import { UserProfession, UserProfessionEnum } from '@models/salaries/user-profession';
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

        const professions: Array<UserProfession> = [];
        chart.salaries.forEach(x => {
            if (professions.some(y => y === x.profession)) {
                return;
            }

            professions.push(x.profession);
        });

        console.log('Professions', professions);

        const salariesLocal = chart.salaries.filter(x => x.company === CompanyType.Local);
        if (salariesLocal.length > 0) {
            datasets.push(
                {
                    label: "Казахстанская компания",
                    data: professions.map(x => {
                        return (salariesLocal.filter(s => s.profession === x).length / salariesLocal.length) * 100;
                    }),
                    backgroundColor: new RandomRgbColor().toString(0.8),
                }
            );
        }

        const salariesRemote = chart.salaries.filter(x => x.company === CompanyType.Remote);
        if (salariesRemote.length > 0) {
            datasets.push(
                {
                    label: "Иностранная компания",
                    data: professions.map(x => {
                        return (salariesRemote.filter(s => s.profession === x).length / salariesRemote.length) * 100;
                    }),
                    backgroundColor: new RandomRgbColor().toString(0.8),
                }
            );
        }

        super(
            canvasId,
            {
                type: 'bar',
                data: {
                    labels: professions.map(x => UserProfessionEnum.label(x)),
                    datasets: datasets,
                },
                options: {
                    indexAxis: 'y',
                    responsive: false,
                    scales: {
                        x: {
                          min: 0,
                          max: 100
                        },
                    }
                },
            });

        this.datasets = datasets;
    }
}