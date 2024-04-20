import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "./company-type";
import { Currency } from "./currency";
import { KazakhstanCity } from "./kazakhstan-city";
import { Gender } from "@models/enums/gender.enum";

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
  gender: Gender | null;
  age: number | null;
  yearOfStartingWork: number | null;
  yearsOfExperience: number | null;
  requireAdditionalData: boolean;
  skillId: number | null;
  workIndustryId: number | null;
  professionId: number | null;
  createdAt: Date;
}
