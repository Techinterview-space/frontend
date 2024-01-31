import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "./company-type";
import { Currency } from "./currency";
import { UserProfession } from "./user-profession";
import { KazakhstanCity } from "./kazakhstan-city";

export interface UserSalaryAdminDto extends UserSalary{
    id: string;
}

export interface UserSalary {
    value: number;
    quarter: number;
    year: number;
    currency: Currency;
    company: CompanyType;
    grade: DeveloperGrade | null;
    profession: UserProfession;
    city: KazakhstanCity | null;
    skillId: number | null;
    createdAt: Date;
}
