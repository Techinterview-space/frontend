import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { UserSalary } from '@models/salaries/salary.model';
import { DeveloperGrade } from '@models/enums';
import { CompanyType } from '@models/salaries/company-type';

export class GradesMinMaxSalariesChartObject extends Chart {

    static readonly grades: Array<{grade: DeveloperGrade, label: string}> = [
        { grade: DeveloperGrade.Junior, label: DeveloperGrade[DeveloperGrade.Junior] },
        { grade: DeveloperGrade.Middle, label: DeveloperGrade[DeveloperGrade.Middle] },
        { grade: DeveloperGrade.Senior, label: DeveloperGrade[DeveloperGrade.Senior] },
        { grade: DeveloperGrade.Lead, label: DeveloperGrade[DeveloperGrade.Lead] },
    ];

    private readonly datasets: Array<ChartDataset> = [];

    constructor(canvasId: string, salaries: Array<UserSalary>) {
        const datasets: Array<ChartDataset> = [];

        new RandomRgbColor().toString(1);

        const salariesLocal: Array<UserSalary> = [];
        const salariesRemote: Array<UserSalary> = [];

        salaries.forEach(x => {
            if (x.grade == null) {
                return;
            }

            if (x.company == CompanyType.Remote) {
                salariesRemote.push(x);
                return;
            }

            salariesLocal.push(x);
        });

        if (salariesLocal.length > 0) {
            datasets.push(new ChartDataset(salariesLocal, 'Казахстанские компании'));
        }

        if (salariesRemote.length > 0) {
            datasets.push(new ChartDataset(salariesRemote, 'Иностранная компания'));
        }

        super(
            canvasId,
            {
                type: 'bar',
                data: {
                    labels: GradesMinMaxSalariesChartObject.grades.map(x => x.label),
                    datasets: datasets,
                },
                options: {
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

class ChartDataset {
    readonly data: Array<[number, number]>;
    readonly borderColor: string;
    readonly backgroundColor: string;
    readonly borderRadius = 5;
    readonly borderWidth = 2;

    constructor(salariesSource: Array<UserSalary>, readonly label: string) {

        const color = new RandomRgbColor();
        this.borderColor = color.toString(1);
        this.backgroundColor = color.toString(0.7);
        this.data = GradesMinMaxSalariesChartObject.grades.map(g => {
            const salaries = salariesSource.filter(s => s.grade == g.grade);
            if (salaries.length == 0) {
                return [0, 0];
            }

            const min = Math.min(...salaries.map(s => s.value));
            const max = Math.max(...salaries.map(s => s.value));

            return [min, max];
        })
    }
}