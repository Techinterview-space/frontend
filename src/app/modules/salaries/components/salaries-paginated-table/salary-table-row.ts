import { DeveloperGrade } from "@models/enums/developer-grade.enum";
import { GenderEnum } from "@models/enums/gender.enum";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";
import { LabelEntityDto } from "@services/label-entity.model";

export class SalaryTableRow {
  readonly value: number;
  readonly quarter: number;
  readonly year: number;
  readonly currency: string;
  readonly company: string;
  readonly grade: string | null;
  readonly profession: string;
  readonly gender: string;
  readonly age: string;
  readonly yearOfStartingWork: string;
  readonly city: string;
  readonly skill: string;
  readonly industry: string;
  readonly createdAt: Date;

  constructor(
    private readonly item: UserSalary,
    professions: Array<LabelEntityDto>,
    skills: Array<LabelEntityDto>,
    industries: Array<LabelEntityDto>
  ) {
    this.value = item.value;
    this.quarter = item.quarter;
    this.year = item.year;
    this.currency = Currency[item.currency];
    this.company = CompanyType[item.company];
    this.age = item.age?.toString() ?? "-";
    this.yearOfStartingWork = item.yearOfStartingWork?.toString() ?? "-";
    this.gender = item.gender != null ? GenderEnum.label(item.gender) : "-";
    this.grade = item.grade != null ? DeveloperGrade[item.grade] : null;
    this.profession =
      professions.find((p) => p.id == item.professionId)?.title || "-";
    this.city = item.city != null ? KazakhstanCity[item.city] : "-";
    this.skill =
      item.skillId != null
        ? skills.find((x) => x.id == item.skillId)?.title ?? "-"
        : "-";
    this.industry =
      item.workIndustryId != null
        ? industries.find((x) => x.id == item.workIndustryId)?.title ?? "-"
        : "-";
    this.createdAt = item.createdAt;
  }
}
