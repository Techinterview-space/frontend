import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { UserSalary } from "@models/salaries/salary.model";
import { EditUserSalaryRequest } from "@services/user-salaries.service";

export class EditSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(private readonly salarytoBeEdited: UserSalary | null) {
        super({
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
        });
    }

    createRequestOrNull(): EditUserSalaryRequest | null {
        if (this.valid) {
            const grade = Number(this.value.grade) as DeveloperGrade;

          return {
            grade: grade,
          };
        }
    
        this.markAllAsTouched();
        return null;
    }
}
