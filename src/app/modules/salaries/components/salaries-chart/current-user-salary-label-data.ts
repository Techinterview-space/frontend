import { KazakhstanCityEnum } from "@models/salaries/kazakhstan-city";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";

export class CurrentUserSalaryLabelData {

    readonly value: number;
    readonly quarter: number;
    readonly year: number;
    readonly city: string | null;

    constructor(private readonly salary: UserSalaryAdminDto) {
        this.value = salary.value;
        this.quarter = salary.quarter;
        this.year = salary.year;
        this.city = salary.city != null ? KazakhstanCityEnum.label(salary.city) : null;
    }
}