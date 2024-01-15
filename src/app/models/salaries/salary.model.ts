import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "./company-type";
import { Currency } from "./currency";
import { UserProfession } from "./user-profession";

export interface UserSalaryAdminDto extends UserSalary{
    userId: number | null;
    userEmail: string | null;
}

export interface UserSalary {
    value: number;
    quarter: number;
    year: number;
    currency: Currency;
    company: CompanyType;
    grade: DeveloperGrade | null;
    profession: UserProfession;
    createdAt: Date;
}
