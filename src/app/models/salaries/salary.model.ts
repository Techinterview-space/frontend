import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "./company-type";
import { Currency } from "./currency";
import { UserProfession } from "./user-profession";

export interface UserSalaryAdminDto extends UserSalary{
    id: string;
}

export interface UserSalary {
    id: string;
    value: number;
    quarter: number;
    year: number;
    currency: Currency;
    company: CompanyType;
    grade: DeveloperGrade | null;
    profession: UserProfession;
    createdAt: Date;
}
