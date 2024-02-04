import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { UserSalary } from '@models/salaries/salary.model';
import { Skill } from '@services/skills.service';

export class SalariesSkillsChartJsObject extends Chart {

    private readonly datasets: Array<ChartDatasetItem> = [];

    constructor(canvasId: string, salaries: UserSalary[], skills: Skill[]) {
        const randomColor = new RandomRgbColor();
        const datasets: Array<ChartDatasetItem> = [];

        const uniqueSkills = SalariesSkillsChartJsObject.prepareUniqueSkills(salaries, skills);
        datasets.push(new ChartDatasetItem(uniqueSkills, salaries));

        console.log('SalariesSkillsChartJsObject', uniqueSkills, datasets);

        super(
            canvasId,
            {
                type: 'polarArea',
                data: {
                    labels: [
                        'Не указаны данные',
                        ...uniqueSkills.map(x => x.title),
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

    constructor(uniqueSkills: Array<Skill>, salaries: Array<UserSalary>) {

        this.label = 'Указанные ЯП/фреймворки';
        this.data = [];
        this.backgroundColor = [];

        if (salaries.length === 0) {
            return;
        }

        const noSkillSalaries = salaries.filter(x => x.skillId == null).length;
        this.data.push(noSkillSalaries);
        this.backgroundColor.push(new RandomRgbColor().toString(0.4));

        uniqueSkills.forEach(s => {
            this.data.push(salaries.filter(x => x.skillId === s.id).length);
            this.backgroundColor.push(new RandomRgbColor().toString(0.4));
        })
    }
}
