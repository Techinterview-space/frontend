import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { UserSalary } from '@models/salaries/salary.model';
import { Skill } from '@services/skills.service';

export class SalariesSkillsChartJsObject extends Chart {

    private readonly datasets: Array<ChartDatasetItem> = [];
    private readonly uniqueSkills: Array<Skill> = [];

    constructor(
        canvasId: string,
        private readonly salaries: UserSalary[],
        private readonly skills: Skill[]) {
        const datasets: Array<ChartDatasetItem> = [];

        const uniqueSkills = SalariesSkillsChartJsObject.prepareUniqueSkills(salaries, skills);
        datasets.push(new ChartDatasetItem(uniqueSkills, salaries, false));

        super(
            canvasId,
            {
                type: 'polarArea',
                data: {
                    labels: [
                        ...uniqueSkills.map(x => x.title),
                        'Не указаны данные',
                    ],
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
        this.uniqueSkills = uniqueSkills;
    }

    toggleNoDataArea(show: boolean): void {
        this.data.labels = this.uniqueSkills.map(x => x.title);
        if (show) {
            this.data.labels.push('Не указаны данные');
        }

        this.data.datasets = [
            new ChartDatasetItem(this.uniqueSkills, this.salaries, show),
        ];

        this.update();
    }

    static prepareUniqueSkills(salaries: UserSalary[], skills: Skill[]): Skill[] {
        const uniqueSkills: Array<Skill> = [];
        salaries.forEach(x => {
            if (x.skillId == null) {
                return;
            }

            const skill = skills.find(y => y.id === x.skillId);
            if (skill == null) {
                return;
            }

            const uniqueSkill = uniqueSkills.find(y => y.id === x.skillId);
            if (uniqueSkill != null) {
                return;
            }

            uniqueSkills.push(skill);
        });

        return uniqueSkills;
    }
}

class ChartDatasetItem {
    readonly label: string;
    readonly data: Array<number>;
    readonly backgroundColor: Array<string>;

    constructor(uniqueSkills: Array<Skill>, salaries: Array<UserSalary>, includeNoData: boolean) {

        this.label = 'Указанные ЯП/фреймворки';
        this.data = [];
        this.backgroundColor = [];

        if (salaries.length === 0) {
            return;
        }

        uniqueSkills.forEach(s => {
            this.data.push(salaries.filter(x => x.skillId === s.id).length);
            this.backgroundColor.push(new RandomRgbColor().toString(0.4));
        });

        if (!includeNoData) {
            return;
        }

        const noSkillSalaries = salaries.filter(x => x.skillId == null).length;
        this.data.push(noSkillSalaries);
        this.backgroundColor.push(new RandomRgbColor().toString(0.4));
    }
}
