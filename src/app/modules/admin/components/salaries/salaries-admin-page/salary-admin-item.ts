import { DeveloperGrade } from "@models/enums/developer-grade.enum";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";

export class SalaryAdminItem {

    readonly value: number;
    readonly quarter: number;
    readonly year: number;
    readonly currency: string;
    readonly company: string;
    readonly grade: string | null;
    readonly profession: string;
    readonly createdAt: Date;

    constructor(private readonly item: UserSalary) {
        this.value = item.value;
        this.quarter = item.quarter;
        this.year = item.year;
        this.currency = Currency[item.currency];
        this.company = CompanyType[item.company];
        this.grade = item.grade != null ? DeveloperGrade[item.grade] : null;
        this.profession = UserProfession[item.profession];
        this.createdAt = item.createdAt;
    }
}