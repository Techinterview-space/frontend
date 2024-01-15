import { formatNumber } from "@angular/common";
import { SalariesByMoneyBarChart, SalariesByProfession, SalariesChartResponse } from "@services/user-salaries.service";

export class SalariesChart {

    readonly averageSalary: string;
    readonly medianSalary: string;
    readonly countOfRecords: number;
    readonly salariesByProfession: Array<SalariesByProfession>;
    readonly salariesByMoneyBarChart: SalariesByMoneyBarChart | null;

    constructor(readonly data: SalariesChartResponse) {
        this.averageSalary = formatNumber(data.averageSalary, 'en-US', '1.0-2');
        this.medianSalary = formatNumber(data.medianSalary, 'en-US', '1.0-2');
        this.countOfRecords = data.salaries.length;
        this.salariesByProfession = data.salariesByProfession;
        this.salariesByMoneyBarChart = data.salariesByMoneyBarChart;
    }
}
