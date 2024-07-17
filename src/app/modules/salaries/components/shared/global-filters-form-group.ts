import { FormControl, FormGroup } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { SalarySourceType } from "@models/salaries/salary.model";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { SelectItem } from "@shared/select-boxes/select-item";

export class SalaryChartGlobalFiltersData {
  grade: DeveloperGrade | null = null;
  profsInclude: Array<number> = [];
  cities: Array<KazakhstanCity> = [];
  skills: Array<number> = [];
  salarySourceType: SalarySourceType | null = null;
  quarterTo: number | null = null;
  yearTo: number | null = null;

  constructor(
    grade: DeveloperGrade | null = null,
    profsInclude: Array<number> = [],
    cities: Array<KazakhstanCity> = [],
    skills: Array<number> = [],
    salarySourceType: SalarySourceType | null = null,
    quarterTo: number | null = null,
    yearTo: number | null = null
  ) {
    if (grade === DeveloperGrade.Unknown) {
      grade = null;
    }

    this.grade = grade;
    this.profsInclude = profsInclude;
    this.cities = cities;
    this.skills = skills;
    this.salarySourceType = salarySourceType;
    this.quarterTo = quarterTo;
    this.yearTo = yearTo;
  }

  equals(other: SalaryChartGlobalFiltersData): boolean {
    return (
      this.grade === other.grade &&
      this.isEqualArrays(this.cities, other.cities) &&
      this.isEqualArrays(this.profsInclude, other.profsInclude) &&
      this.isEqualArrays(this.skills, other.skills) &&
      this.salarySourceType === other.salarySourceType &&
      this.quarterTo === other.quarterTo &&
      this.yearTo === other.yearTo
    );
  }

  private isEqualArrays<T>(a: Array<T>, b: Array<T>): boolean {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((x, i) => x === b[i]);
  }
}

export class GlobalFiltersFormGroup extends FormGroup {
  readonly grades: Array<DeveloperGradeSelectItem> =
    DeveloperGradeSelectItem.gradesSimpleOnly();

  readonly sourceTypes: Array<SelectItem<SalarySourceType>> = [
    {
      value: SalarySourceType.KolesaDevelopersCsv2022.toString(),
      label: "Kolesa Developers Zerttey, 2022",
      item: SalarySourceType.KolesaDevelopersCsv2022,
    },
  ];

  constructor(filterData: SalaryChartGlobalFiltersData | null) {
    super({
      grade: new FormControl(filterData?.grade, []),
      profsToInclude: new FormControl(filterData?.profsInclude, []),
      cities: new FormControl(filterData?.cities, []),
      skills: new FormControl(filterData?.skills, []),
      salarySourceType: new FormControl(filterData?.salarySourceType, []),
      quarterTo: new FormControl(filterData?.quarterTo, []),
      yearTo: new FormControl(filterData?.yearTo, []),
    });
  }

  data(): SalaryChartGlobalFiltersData | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    let grade =
      this.value.grade != null && this.value.grade !== "null"
        ? (this.value.grade as DeveloperGrade)
        : null;

    if (grade === DeveloperGrade.Unknown) {
      grade = null;
    }

    const profsToInclude = (this.value.profsToInclude as Array<number>) ?? [];
    const cities = (this.value.cities as Array<KazakhstanCity>) ?? [];
    const skills = (this.value.skills as Array<number>) ?? [];

    let salarySourceType =
      this.value.salarySourceType != null &&
      this.value.salarySourceType !== "null"
        ? (this.value.salarySourceType as SalarySourceType | null)
        : null;

    if (salarySourceType === SalarySourceType.Undefined) {
      salarySourceType = null;
    }

    const quarterTo = this.value.quarterTo ?? null;
    const yearTo = this.value.yearTo ?? null;

    return new SalaryChartGlobalFiltersData(
      grade,
      profsToInclude,
      cities,
      skills,
      salarySourceType,
      quarterTo,
      yearTo
    );
  }
}
