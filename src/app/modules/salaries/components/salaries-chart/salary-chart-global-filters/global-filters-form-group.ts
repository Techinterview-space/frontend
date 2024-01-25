import { FormControl, FormGroup } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { UserProfession } from "@models/salaries/user-profession";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { SelectItem } from "@shared/select-boxes/select-item";

export class SalaryChartGlobalFiltersData {
    grade: DeveloperGrade | null = null;
    profsToInclude: Array<UserProfession> = [];
    profsToExclude: Array<UserProfession> = [];

    constructor(
        grade: DeveloperGrade | null = null,
        profsToInclude: Array<UserProfession> = [],
        profsToExclude: Array<UserProfession> = []) {
        if (grade === DeveloperGrade.Unknown) {
            grade = null;
        }

        this.grade = grade;
        this.profsToInclude = profsToInclude;
        this.profsToExclude = profsToExclude;
    }

    equals(other: SalaryChartGlobalFiltersData): boolean {
        // TODO mgorbatyuk: do more smart check that two arrays are not same
        return this.grade === other.grade &&
            this.profsToExclude.length === other.profsToExclude.length &&
            this.profsToInclude.length === other.profsToInclude.length;
    }
}

export class GlobalFiltersFormGroup extends FormGroup {

    readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();

    constructor(filterData: SalaryChartGlobalFiltersData | null) {
        super({
            grade: new FormControl(filterData?.grade, []),
            profsToInclude: new FormControl(filterData?.profsToInclude, []),
            profsToExclude: new FormControl(filterData?.profsToExclude, []),
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

        const profsToInclude = this.value.profsToInclude as Array<UserProfession> ?? [];
        const profsToExclude = this.value.profsToExclude as Array<UserProfession> ?? [];

        return new SalaryChartGlobalFiltersData(grade, profsToInclude, profsToExclude);
    }
}
