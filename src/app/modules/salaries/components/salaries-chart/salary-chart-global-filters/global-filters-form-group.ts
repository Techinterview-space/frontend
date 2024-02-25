import { FormControl, FormGroup } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";

export class SalaryChartGlobalFiltersData {
    grade: DeveloperGrade | null = null;
    profsToInclude: Array<number> = [];
    cities: Array<KazakhstanCity> = [];

    constructor(
        grade: DeveloperGrade | null = null,
        profsToInclude: Array<number> = [],
        cities: Array<KazakhstanCity> = []) {
        if (grade === DeveloperGrade.Unknown) {
            grade = null;
        }

        this.grade = grade;
        this.profsToInclude = profsToInclude;
        this.cities = cities;
    }

    equals(other: SalaryChartGlobalFiltersData): boolean {
        // TODO mgorbatyuk: do more smart check that two arrays are not same
        return this.grade === other.grade &&
            this.cities.length === other.cities.length &&
            this.profsToInclude.length === other.profsToInclude.length;
    }
}

export class GlobalFiltersFormGroup extends FormGroup {

    readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();

    constructor(filterData: SalaryChartGlobalFiltersData | null) {
        super({
            grade: new FormControl(filterData?.grade, []),
            profsToInclude: new FormControl(filterData?.profsToInclude, []),
            cities: new FormControl(filterData?.cities, []),
        });
    }

    data(): SalaryChartGlobalFiltersData | null {
        if (!this.valid) {
            this.markAllAsTouched();
            return null;
        }

        const grade = this.value.grade != null && this.value.grade !== 'null'
            ? this.value.grade as DeveloperGrade
            : null;

        const profsToInclude = this.value.profsToInclude as Array<number> ?? [];
        const cities = this.value.cities as Array<KazakhstanCity> ?? [];

        return new SalaryChartGlobalFiltersData(grade, profsToInclude, cities);
    }
}
