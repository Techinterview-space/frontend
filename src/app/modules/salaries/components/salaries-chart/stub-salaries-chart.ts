import { SalariesChart } from "./salaries-chart";
import { SalariesChartResponse } from "@services/user-salaries.service";
import { UserSalary } from "@models/salaries/salary.model";

export class StubSalariesChart extends SalariesChart {

    private static readonly salaryLabels = [
        "250000",
        "500000",
        "750000",
        "1000000",
        "1250000",
        "1500000",
    ]

    constructor(data: SalariesChartResponse | null) {
        super({
            averageSalary: data?.averageSalary ?? StubSalariesChart.getRandomNumber(700, 300) * 1000,
            medianSalary: data?.medianSalary ?? StubSalariesChart.getRandomNumber(700, 300) * 1000,
            averageRemoteSalary: StubSalariesChart.getRandomNumber(1_200, 600) * 1000,
            medianRemoteSalary: StubSalariesChart.getRandomNumber(1_200, 600) * 1000,
            shouldAddOwnSalary: true,
            currentUserSalary: null,
            totalCountInStats: data?.totalCountInStats ?? 0,
            salaries: [] as UserSalary[],
            salariesByMoneyBarChart: {
                items: StubSalariesChart.salaryLabels.map((x) => StubSalariesChart.getRandomNumber(100, 25)),
                itemsByProfession: [],
                labels: StubSalariesChart.salaryLabels,
            },
            salariesByMoneyBarChartForRemote: null,
            rangeStart: new Date(),
            rangeEnd: new Date(),
            peopleByGradesChartDataForLocal: null,
            peopleByGradesChartDataForRemote: null,
            developersByAgeChartData: null,
            developersByExperienceYearsChartData: null,
            hasAuthentication: false,
          },
          []);
    }

    private static getRandomNumber(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
