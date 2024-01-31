import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { EditUserSalaryRequest } from "@services/user-salaries.service";

export class EditSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(private readonly salarytoBeEdited: UserSalary | null) {
        super({
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
            profession: new FormControl(salarytoBeEdited?.profession ?? null, [Validators.required]),
            city: new FormControl(salarytoBeEdited?.city ?? null, []),
            skillId: new FormControl(salarytoBeEdited?.skillId ?? null, []),
        });
    }

    createRequestOrNull(): EditUserSalaryRequest | null {
        if (this.valid) {
            const grade = Number(this.value.grade) as DeveloperGrade;
            const profession = Number(this.value.profession) as UserProfession;
            const city = this.value.city != null
                ? Number(this.value.city) as KazakhstanCity
                : null;

            const skillId = this.value.skillId != null
                ? Number(this.value.skillId)
                : null;

            return {
                grade: grade,
                profession: profession,
                city: city != KazakhstanCity.Undefined ? city : null,
                skillId: skillId,
            };
        }
    
        this.markAllAsTouched();
        return null;
    }
}
