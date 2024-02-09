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

        const professions = chart.professionsDistributionDataForLocal?.items.map(x => x.profession) ?? [];
        chart.professionsDistributionDataForRemote?.items.forEach(item => {
            if (professions.some(x => x === item.profession)) {
                return;
            }

            professions.push(item.profession);
        });

        datasets.push(
            {
                label: "Казахстанская компания",
                data: chart.professionsDistributionDataForLocal?.items.map(x => {
                    return (x.count / chart.professionsDistributionDataForLocal!.all) * 100;
                }) ?? [],
                backgroundColor: new RandomRgbColor().toString(0.8),
            }
        );

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
                    responsive: true,
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