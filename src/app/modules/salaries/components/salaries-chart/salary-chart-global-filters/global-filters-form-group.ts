import { FormControl, FormGroup } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";

export class SalaryChartGlobalFiltersData {
    grade: DeveloperGrade | null = null;

    constructor(grade: DeveloperGrade | null = null) {
        if (grade === DeveloperGrade.Unknown) {
            grade = null;
        }

        this.grade = grade;
    }

    equals(other: SalaryChartGlobalFiltersData): boolean {
        return this.grade === other.grade;
    }
}

export class GlobalFiltersFormGroup extends FormGroup {

    readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();

    constructor(filterData: SalaryChartGlobalFiltersData | null) {
        super({
            grade: new FormControl(filterData?.grade, []),
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

        return new SalaryChartGlobalFiltersData(grade);
    }
}
