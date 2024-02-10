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
    backgroundColor: Array<string>;
}

export class PeopleDistributionChartObject extends Chart {

    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(canvasId: string, chart: SalariesChart) {
        const datasets: Array<ChartDatasetType> = [];

        let professions: Array<{profession: UserProfession, label: string, count: number}> = [];
        chart.salaries.forEach(x => {

            const existingItem = professions.find(p => p.profession === x.profession);
            if (existingItem != null) {
                existingItem.count++;
                return;
            }

            professions.push({
                profession: x.profession,
                label: UserProfessionEnum.label(x.profession),
                count: 1,
            });
        });

        professions = professions.sort((a, b) => b.count - a.count);

        const professionsToInclude = professions.filter((x) => x.count > 10);
        const salariesNotINcluded = professions.filter((x) => x.count <= 10);

        const salariesLocal = chart.salaries.filter(x => x.company === CompanyType.Local);
        if (salariesLocal.length > 0) {

            const dataForDataset = professionsToInclude.map(x => {
                return {
                    value: (salariesLocal.filter(s => s.profession === x.profession).length / salariesLocal.length) * 100,
                    color: new RandomRgbColor().toString(0.8),
                };
            });

            if (salariesNotINcluded.length > 0) {
                const count = salariesNotINcluded.map(x => x.count).reduce((a, b) => a + b);
                dataForDataset.push({
                    value: count / salariesLocal.length * 100,
                    color: new RandomRgbColor().toString(0.8),
                });
            }

            datasets.push(
                {
                    label: "Специальность",
                    data: dataForDataset.map(x => x.value),
                    backgroundColor: dataForDataset.map(x => x.color),
                }
            );
        }

        /*const salariesRemote = chart.salaries.filter(x => x.company === CompanyType.Remote);
        if (salariesRemote.length > 0) {
            datasets.push(
                {
                    label: "Иностранная компания",
                    data: professions.map(x => {
                        return (salariesRemote.filter(s => s.profession === x.profession).length / salariesRemote.length) * 100;
                    }),
                    backgroundColor: new RandomRgbColor().toString(0.8),
                }
            );
        }*/

        const labels = professionsToInclude.map(x => x.label);
        if (salariesNotINcluded.length > 0) {
            labels.push("Другие");
        }

        super(
            canvasId,
            {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: datasets,
                },
                options: {
                    aspectRatio: 1,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'left',
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