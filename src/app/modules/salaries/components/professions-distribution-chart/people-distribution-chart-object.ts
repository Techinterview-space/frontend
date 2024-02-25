import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { UserSalary } from '@models/salaries/salary.model';
import { UserProfession, UserProfessionEnum } from '@models/salaries/user-profession';
import { LabelEntityDto } from '@services/label-entity.model';

interface ChartDatasetType {
    label: string;
    data: Array<number>;
    backgroundColor: Array<string>;
}

interface ProfessionItem {
    professionId: number | null;
    label: string;
    count: number;

}

export class PeopleDistributionChartObject extends Chart {

    private readonly datasets: Array<ChartDatasetType> = [];

    constructor(
        canvasId: string,
        salaries: Array<UserSalary>,
        otherLimit: number,
        title: string,
        private readonly professionEntities: Array<LabelEntityDto>) {
        const datasets: Array<ChartDatasetType> = [];

        let professions: Array<ProfessionItem> = [];
        salaries.forEach(x => {

            const existingItem = professions.find(p => p.professionId === x.professionId);
            if (existingItem != null) {
                existingItem.count++;
                return;
            }

            professions.push({
                professionId: x.professionId,
                label: professionEntities.find(p => p.id === x.professionId)?.title || '',
                count: 1,
            });
        });

        professions = professions.sort((a, b) => b.count - a.count);

        const professionsToInclude = professions.filter((x) => x.count > otherLimit);
        const salariesNotINcluded = professions.filter((x) => x.count <= otherLimit);

        if (salaries.length > 0) {

            const dataForDataset = professionsToInclude.map(x => {
                return {
                    value: (salaries.filter(s => s.professionId === x.professionId).length / salaries.length) * 100,
                    color: new RandomRgbColor().toString(0.8),
                };
            });

            if (salariesNotINcluded.length > 0) {
                const count = salariesNotINcluded.map(x => x.count).reduce((a, b) => a + b);
                dataForDataset.push({
                    value: count / salaries.length * 100,
                    color: new RandomRgbColor().toString(0.8),
                });
            }

            datasets.push(
                {
                    label: "Процентное соотношение",
                    data: dataForDataset.map(x => x.value),
                    backgroundColor: dataForDataset.map(x => x.color),
                }
            );
        }

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
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'left',
                            title: {
                                text: title,
                                font: {
                                    size: 16,
                                },
                                position: 'start',
                                display: true,
                            },
                          }
                    }
                },
            });

        this.datasets = datasets;
    }
}