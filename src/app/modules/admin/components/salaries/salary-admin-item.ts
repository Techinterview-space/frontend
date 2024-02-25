import { DeveloperGrade } from "@models/enums/developer-grade.enum";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { LabelEntityDto } from "@services/label-entity.model";

export class SalaryAdminItem {

    readonly id: string;
    readonly value: number;
    readonly quarter: number;
    readonly year: number;
    readonly currency: string;
    readonly company: string;
    readonly grade: string | null;
    readonly profession: string;
    readonly city: string;
    readonly skill: string;
    readonly industry: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(
        private readonly item: UserSalaryAdminDto,
        professions: Array<LabelEntityDto>,
        skills: Array<LabelEntityDto>,
        industries: Array<LabelEntityDto>) {
        this.id = item.id;
        this.value = item.value;
        this.quarter = item.quarter;
        this.year = item.year;
        this.currency = Currency[item.currency];
        this.company = CompanyType[item.company];
        this.grade = item.grade != null ? DeveloperGrade[item.grade] : null;
        this.profession = professions.find(p => p.id == item.professionId)?.title || '-';
        this.city = item.city != null ? KazakhstanCity[item.city] : '-';
        this.skill = item.skillId != null ? skills.find(x => x.id == item.skillId)?.title ?? '-' : '-';
        this.industry = item.workIndustryId != null ? industries.find(x => x.id == item.workIndustryId)?.title ?? '-' : '-';
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt ?? item.createdAt;
    }
}