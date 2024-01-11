import { formatNumber } from "@angular/common";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { SalariesChartResponse } from "@services/user-salaries.service";

export class SalariesChart {

    public averageSalary: string;
    public countOfRecords: number;

    public salariesByProfession: Array<SalariesByProfession>;

    constructor(private readonly data: SalariesChartResponse) {
        this.averageSalary = formatNumber(data.salaries.reduce((a, b) => a + b.value, 0) / data.salaries.length, 'en-US', '1.0-2');
        this.countOfRecords = data.salaries.length;

        this.salariesByProfession = [];
        var uniqueProfessions = data.salaries.map(x => x.profession).filter((v, i, a) => a.indexOf(v) === i);
        for (let index = 0; index < uniqueProfessions.length; index++) {
            const profession = uniqueProfessions[index];
            const salaries = data.salaries.filter(x => x.profession == profession);
            this.salariesByProfession.push(new SalariesByProfession(profession, salaries));
        }
    }
}

export class SalariesByProfession {

    readonly professionTitle: string;
    readonly averageSalary: number;

    constructor(
        readonly profession: UserProfession,
        readonly salaries: Array<UserSalary>
    ) {
        this.averageSalary = salaries.reduce((a, b) => a + b.value, 0) / salaries.length;
        this.professionTitle = UserProfession[profession];
    }
}