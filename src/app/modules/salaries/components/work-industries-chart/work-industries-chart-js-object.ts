import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { UserSalary } from '@models/salaries/salary.model';
import { WorkIndustry } from '@services/work-industry.service';

export class WorkIndustriesChartJsObject extends Chart {

    private readonly datasets: Array<ChartDatasetItem> = [];
    private readonly uniqueIndustries: Array<WorkIndustry> = [];

    constructor(
        canvasId: string,
        private readonly salaries: UserSalary[],
        private readonly industries: WorkIndustry[]) {
        const datasets: Array<ChartDatasetItem> = [];

        const uniqueIndustries = WorkIndustriesChartJsObject.prepareUniqueIndustries(salaries, industries);
        datasets.push(new ChartDatasetItem(uniqueIndustries, salaries, false));

        super(
            canvasId,
            {
                type: 'polarArea',
                data: {
                    labels: uniqueIndustries.map(x => x.title),
                    datasets: datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            pointLabels: {
                              display: true,
                              centerPointLabels: true,
                              font: {
                                size: 18
                              }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            title: {
                                display: false,
                            },
                          }
                    }
                },
            });

        this.datasets = datasets;
        this.uniqueIndustries = uniqueIndustries;
    }

    toggleNoDataArea(show: boolean): void {
        this.data.labels = this.uniqueIndustries.map(x => x.title);
        if (show) {
            this.data.labels.push('Не указаны данные');
        }

        this.data.datasets = [
            new ChartDatasetItem(this.uniqueIndustries, this.salaries, show),
        ];

        this.update();
    }

    static prepareUniqueIndustries(salaries: UserSalary[], industries: WorkIndustry[]): WorkIndustry[] {
        const uniqueIndustries: Array<WorkIndustry> = [];
        salaries.forEach(x => {
            if (x.workIndustryId == null) {
                return;
            }

            const industry = industries.find(y => y.id === x.workIndustryId);
            if (industry == null) {
                return;
            }

            const uniqueSkill = uniqueIndustries.find(y => y.id === x.workIndustryId);
            if (uniqueSkill != null) {
                return;
            }

            uniqueIndustries.push(industry);
        });

        return uniqueIndustries;
    }
}

class ChartDatasetItem {
    readonly label: string;
    readonly data: Array<number>;
    readonly backgroundColor: Array<string>;

    constructor(uniqueIndustries: Array<WorkIndustry>, salaries: Array<UserSalary>, includeNoData: boolean) {

        this.label = 'Сфера работы';
        this.data = [];
        this.backgroundColor = [];

        if (salaries.length === 0) {
            return;
        }

        uniqueIndustries.forEach(s => {
            this.data.push(salaries.filter(x => x.workIndustryId === s.id).length);
            this.backgroundColor.push(new RandomRgbColor().toString(0.4));
        });

        if (!includeNoData) {
            return;
        }

        const noDataSalaries = salaries.filter(x => x.workIndustryId == null).length;
        this.data.push(noDataSalaries);
        this.backgroundColor.push(new RandomRgbColor().toString(0.4));
    }
}
