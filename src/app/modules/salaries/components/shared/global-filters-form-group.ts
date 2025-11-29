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
  salarySourceTypes: SalarySourceType[];
  quarterTo: number | null = null;
  yearTo: number | null = null;
  dateTo: Date | null = null;

  constructor(
    grade: DeveloperGrade | null = null,
    profsInclude: Array<number> = [],
    cities: Array<KazakhstanCity> = [],
    skills: Array<number> = [],
    salarySourceTypes: SalarySourceType[] = [],
    quarterTo: number | null = null,
    yearTo: number | null = null,
    dateTo: Date | null = null,
  ) {
    if (grade === DeveloperGrade.Unknown) {
      grade = null;
    }

    this.grade = grade;
    this.profsInclude = profsInclude;
    this.cities = cities;
    this.skills = skills;
    this.salarySourceTypes = salarySourceTypes;
    this.quarterTo = quarterTo;
    this.yearTo = yearTo;
    this.dateTo = dateTo;
  }

  equals(other: SalaryChartGlobalFiltersData): boolean {
    return (
      this.grade === other.grade &&
      this.isEqualArrays(this.cities, other.cities) &&
      this.isEqualArrays(this.profsInclude, other.profsInclude) &&
      this.isEqualArrays(this.skills, other.skills) &&
      this.isEqualArrays(this.salarySourceTypes, other.salarySourceTypes) &&
      this.quarterTo === other.quarterTo &&
      this.yearTo === other.yearTo &&
      this.dateTo === other.dateTo
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
    {
      value: SalarySourceType.KolesaDataAnalyticsCsv2024.toString(),
      label: "Kolesa Data-специалисты, 2024",
      item: SalarySourceType.KolesaDataAnalyticsCsv2024,
    },
  ];

  constructor(filterData: SalaryChartGlobalFiltersData | null) {
    super({
      grade: new FormControl(filterData?.grade, []),
      profsToInclude: new FormControl(filterData?.profsInclude, []),
      cities: new FormControl(filterData?.cities, []),
      skills: new FormControl(filterData?.skills, []),
      salarySourceType: new FormControl(
        filterData != null && filterData.salarySourceTypes.length > 0
          ? filterData.salarySourceTypes[0]
          : null,
        [],
      ),
      quarterTo: new FormControl(filterData?.quarterTo, []),
      yearTo: new FormControl(filterData?.yearTo, []),
      dateTo: new FormControl(filterData?.dateTo?.toISOString().split("T")[0], []),
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
    const dateTo = this.value.dateTo
      ? new Date(this.value.dateTo as string)
      : null;

    return new SalaryChartGlobalFiltersData(
      grade,
      profsToInclude,
      cities,
      skills,
      salarySourceType != null ? [salarySourceType] : [],
      quarterTo,
      yearTo,
      dateTo,
    );
  }
}
