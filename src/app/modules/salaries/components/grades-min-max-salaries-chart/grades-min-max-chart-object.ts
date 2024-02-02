import { Chart }  from 'chart.js/auto';
import { RandomRgbColor } from '../random-rgb-color';
import { UserSalary } from '@models/salaries/salary.model';
import { DeveloperGrade } from '@models/enums';
import { CompanyType } from '@models/salaries/company-type';
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';

export class GradesMinMaxSalariesChartObject extends BoxPlotChart {

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
            datasets.push(new ChartDataset(salariesLocal, 'Казахстанская компания'));
        }

        if (salariesRemote.length > 0) {
            datasets.push(new ChartDataset(salariesRemote, 'Иностранная компания'));
        }

        super(
            canvasId,
            {
                data: {
                    labels: GradesMinMaxSalariesChartObject.grades.map(x => x.label),
                    datasets: datasets,
                },
                options: {
                    indexAxis: 'y',
                    maintainAspectRatio: false,
                    responsive: true,
                    elements: {
                        boxplot: {
                          itemRadius: 2,
                        },
                      },
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
    readonly data: Array<ChartDatasetItem>;
    readonly borderColor: string;
    readonly backgroundColor: string;
    readonly borderRadius = 5;
    readonly borderWidth = 2;

    constructor(salariesSource: Array<UserSalary>, readonly label: string) {

        const color = new RandomRgbColor();
        this.borderColor = color.toString(1);
        this.backgroundColor = color.toString(0.7);

        this.data = GradesMinMaxSalariesChartObject.grades.map(g => {
            const salaries = salariesSource
                .filter(s => s.grade == g.grade)
                .sort((a, b) => a.value - b.value);

            return new ChartDatasetItem(salaries);
        })
    }
}

class ChartDatasetItem {
    readonly min: number;
    readonly q1: number;
    readonly median: number;
    readonly q3: number;
    readonly max: number;

    constructor(salaries: Array<UserSalary>) {
        this.min = salaries[0].value;
        this.max = salaries[salaries.length - 1].value;
        this.median = salaries[Math.floor(salaries.length / 2)].value;
        this.q1 = salaries[Math.floor(salaries.length / 4)].value;
        this.q3 = salaries[Math.floor(salaries.length * 3 / 4)].value;
    }
}
