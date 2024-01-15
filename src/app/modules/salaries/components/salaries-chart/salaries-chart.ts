import { formatNumber } from "@angular/common";
import { SalariesByMoneyBarChart, SalariesByProfession, SalariesChartResponse } from "@services/user-salaries.service";

export class SalariesChart {

    readonly averageSalary: string;
    readonly medianSalary: string;

    readonly averageRemoteSalary: string | null;
    readonly medianRemoteSalary: string | null;

    readonly countOfRecords: number;
    readonly salariesByProfession: Array<SalariesByProfession>;
    readonly salariesByMoneyBarChart: SalariesByMoneyBarChart | null;

    constructor(readonly data: SalariesChartResponse) {
        this.averageSalary = SalariesChart.formatNumber(data.averageSalary) ?? '';
        this.medianSalary = SalariesChart.formatNumber(data.medianSalary) ?? '';

        this.averageRemoteSalary = SalariesChart.formatNumber(data.averageRemoteSalary);
        this.medianRemoteSalary = SalariesChart.formatNumber(data.medianRemoteSalary)

        this.countOfRecords = data.salaries.length;
        this.salariesByProfession = data.salariesByProfession;
        this.salariesByMoneyBarChart = data.salariesByMoneyBarChart;
    }

    private static formatNumber(value: number | null): string | null {
        return value != null
            ? formatNumber(value, 'en-US', '1.0-2')
            : null;
    }
}
