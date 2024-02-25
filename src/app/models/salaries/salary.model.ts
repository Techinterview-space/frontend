import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "./company-type";
import { Currency } from "./currency";
import { KazakhstanCity } from "./kazakhstan-city";

export interface UserSalaryAdminDto extends UserSalary {
    id: string;
    updatedAt: Date | null;
}

export interface UserSalary {
    value: number;
    quarter: number;
    year: number;
    currency: Currency;
    company: CompanyType;
    grade: DeveloperGrade | null;
    city: KazakhstanCity | null;
    skillId: number | null;
    workIndustryId: number | null;
    professionId: number | null;
    createdAt: Date;
}
