import { formatNumber } from "@angular/common";
import { SalariesByMoneyBarChart, SalariesChartResponse } from "@services/user-salaries.service";
import { SalariesPerProfession } from "../salaries-per-profession";

export class SalariesChart {

    readonly averageSalary: string;
    readonly medianSalary: string;

    readonly averageRemoteSalary: string | null;
    readonly medianRemoteSalary: string | null;

    readonly countOfRecords: number;

    readonly salariesByMoneyBarChart: SalariesByMoneyBarChart | null;
    readonly salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null;

    readonly salariesPerProfessionForLocal: Array<SalariesPerProfession> | null;
    readonly salariesPerProfessionForRemote: Array<SalariesPerProfession> | null;

    readonly hasRemoteSalaries: boolean;

    constructor(readonly data: SalariesChartResponse) {
        this.averageSalary = SalariesChart.formatNumber(data.averageSalary) ?? '';
        this.medianSalary = SalariesChart.formatNumber(data.medianSalary) ?? '';

        this.averageRemoteSalary = SalariesChart.formatNumber(data.averageRemoteSalary);
        this.medianRemoteSalary = SalariesChart.formatNumber(data.medianRemoteSalary)

        this.countOfRecords = data.salaries.length;

        this.salariesByMoneyBarChart = data.salariesByMoneyBarChart;
        this.salariesByMoneyBarChartForRemote = data.salariesByMoneyBarChartForRemote;

        const salariesPerProfession = SalariesPerProfession.from(data.salaries);

        this.salariesPerProfessionForLocal = salariesPerProfession.local;
        this.salariesPerProfessionForRemote = salariesPerProfession.remote;
        this.hasRemoteSalaries = this.salariesPerProfessionForRemote.length > 0;
    }

    private static formatNumber(value: number | null): string | null {
        return value != null
            ? formatNumber(value, 'en-US', '1.0-2')
            : null;
    }
}
