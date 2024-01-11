import { formatNumber } from "@angular/common";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { SalariesByProfession, SalariesChartResponse } from "@services/user-salaries.service";

export class SalariesChart {

    averageSalary: string;
    medianSalary: string;
    countOfRecords: number;
    salariesByProfession: Array<SalariesByProfession>;

    constructor(private readonly data: SalariesChartResponse) {
        this.averageSalary = formatNumber(data.averageSalary, 'en-US', '1.0-2');
        this.medianSalary = formatNumber(data.medianSalary, 'en-US', '1.0-2');
        this.countOfRecords = data.salaries.length;
        this.salariesByProfession = data.salariesByProfession;
    }
}
