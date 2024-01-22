import { Currency } from "@models/salaries/currency";
import { SalariesChart } from "./salaries-chart";
import { CompanyType } from "@models/salaries/company-type";
import { DeveloperGrade } from "@models/enums";
import { UserProfession } from "@models/salaries/user-profession";

export class StubSalariesChart extends SalariesChart {

    private static readonly salaryLabels = [
        "250000",
        "500000",
        "750000",
        "1000000",
        "1250000",
        "1500000",
    ]

    constructor() {
        const salariesCount = 10;
        const thisYearDate = new Date();
        const salaries = [];

        for (let index = 0; index < salariesCount; index++) {
            salaries.push(
                {
                    value: StubSalariesChart.getRandomNumber(1_500_000, 250_000),
                    quarter: 1,
                    year: thisYearDate.getFullYear(),
                    currency: Currency.KZT,
                    company: CompanyType.Local,
                    grade: DeveloperGrade.Middle,
                    profession: UserProfession.Developer, // TODO mgorbatyuk: randomize
                    createdAt: thisYearDate,
                });
        }

        super({
            averageSalary: StubSalariesChart.getRandomNumber(1_000, 300) * 1000,
            medianSalary: StubSalariesChart.getRandomNumber(1_000, 300) * 1000,
            averageRemoteSalary: StubSalariesChart.getRandomNumber(1_200, 600) * 1000,
            medianRemoteSalary: StubSalariesChart.getRandomNumber(1_200, 600) * 1000,
            shouldAddOwnSalary: true,
            currentUserSalary: null,
            salaries: salaries,
            salariesByMoneyBarChart: {
                items: StubSalariesChart.salaryLabels.map((x) => {
                    const value = parseInt(x);
                    return {
                        start: value,
                        end: value + 250_000,
                        count: StubSalariesChart.getRandomNumber(100, 25),
                    };
                }),
                itemsByProfession: [],
                labels: StubSalariesChart.salaryLabels,
            },
            salariesByMoneyBarChartForRemote: null,
            rangeStart: new Date(),
            rangeEnd: new Date(),
          });
    }

    private static getRandomNumber(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
