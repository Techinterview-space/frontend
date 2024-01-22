import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { CreateUserSalaryRequest } from "@services/user-salaries.service";

export class EditSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(private readonly salarytoBeEdited: UserSalary | null) {
        const now = new Date(Date.now());
        const currentQuarter = Math.floor((now.getMonth() + 3) / 3);

        super({
            value: new FormControl(
                salarytoBeEdited?.value ?? null,
                [
                    Validators.pattern(EditSalaryForm.digitsPattern),
                    Validators.required,
                    Validators.min(42500),
                    Validators.max(10000000),
                ]),
            quarter: new FormControl(
                salarytoBeEdited?.quarter ?? currentQuarter,
                [
                    Validators.pattern(EditSalaryForm.digitsPattern),
                    Validators.min(1),
                    Validators.max(4),
                    Validators.required
                ]),
            year: new FormControl(
                salarytoBeEdited?.year ?? now.getFullYear(),
                [
                    Validators.pattern(EditSalaryForm.digitsPattern),
                    Validators.min(2000),
                    Validators.max(2100),
                    Validators.required
                ]),
            currency: new FormControl(salarytoBeEdited?.currency ?? Currency.KZT, [Validators.required]),
            company: new FormControl(salarytoBeEdited?.company ?? null, [Validators.required]),
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
            profession: new FormControl(salarytoBeEdited?.profession ?? null, [Validators.required]),
        });
    }

    createRequestOrNull(): CreateUserSalaryRequest | null {
        if (this.valid) {
            const profession = Number(this.value.profession) as UserProfession;
            const grade = this.value.grade != null
                ? Number(this.value.grade) as DeveloperGrade
                : null;

          return {
            value: Number(this.value.value),
            quarter: Number(this.value.quarter),
            year: Number(this.value.year),
            currency: Number(this.value.currency) as Currency,
            company: Number(this.value.company) as CompanyType,
            grade: grade,
            profession: profession,
          };
        }
    
        this.markAllAsTouched();
        return null;
    }
}
