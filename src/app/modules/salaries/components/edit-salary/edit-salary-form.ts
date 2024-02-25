import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";
import { EditUserSalaryRequest } from "@services/user-salaries.service";

export class EditSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(
        salarytoBeEdited: UserSalary | null,
        hasIndustries: boolean = false) {
        super({
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
            company: new FormControl(salarytoBeEdited?.company ?? null, [Validators.required]),
            profession: new FormControl(salarytoBeEdited?.professionId ?? null, [Validators.required]),
            city: new FormControl(salarytoBeEdited?.city ?? null, []),
            skillId: new FormControl(salarytoBeEdited?.skillId ?? null, []),
            workIndustryId: new FormControl(salarytoBeEdited?.workIndustryId ?? null, hasIndustries ? [Validators.required] : []),
        });
    }

    createRequestOrNull(): EditUserSalaryRequest | null {
        if (this.valid) {
            const grade = Number(this.value.grade) as DeveloperGrade;
            const city = this.value.city != null
                ? Number(this.value.city) as KazakhstanCity
                : null;

            const skillId = this.value.skillId != null
                ? Number(this.value.skillId)
                : null;

            const workIndustryId = this.value.workIndustryId != null
                ? Number(this.value.workIndustryId)
                : null;

            const professionId = this.value.profession != null
                ? Number(this.value.profession)
                : null;

            return {
                grade: grade,
                professionId: professionId,
                city: city != KazakhstanCity.Undefined ? city : null,
                skillId: skillId,
                workIndustryId: workIndustryId,
                company: Number(this.value.company) as CompanyType,
            };
        }
    
        this.markAllAsTouched();
        return null;
    }
}
