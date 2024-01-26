import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { EditUserSalaryRequest } from "@services/user-salaries.service";

export class EditSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(private readonly salarytoBeEdited: UserSalary | null) {
        super({
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
            profession: new FormControl(salarytoBeEdited?.profession ?? null, [Validators.required]),
        });
    }

    createRequestOrNull(): EditUserSalaryRequest | null {
        if (this.valid) {
            const grade = Number(this.value.grade) as DeveloperGrade;
            const profession = Number(this.value.profession) as UserProfession;

            return {
                grade: grade,
                profession: profession,
            };
        }
    
        this.markAllAsTouched();
        return null;
    }
}
