import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { UserProfession } from "@models/salaries/user-profession";
import { CreateUserSalaryRequest } from "@services/user-salaries.service";

export class AddSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor() {
        const now = new Date(Date.now());
        const currentQuarter = Math.floor((now.getMonth() + 3) / 3);

        super({
            value: new FormControl(
                null,
                [
                    Validators.pattern(AddSalaryForm.digitsPattern),
                    Validators.required
                ]),
            quarter: new FormControl(
                currentQuarter,
                [
                    Validators.pattern(AddSalaryForm.digitsPattern),
                    Validators.min(1),
                    Validators.max(4),
                    Validators.required
                ]),
            year: new FormControl(
                now.getFullYear(),
                [
                    Validators.pattern(AddSalaryForm.digitsPattern),
                    Validators.min(2000),
                    Validators.max(2100),
                    Validators.required
                ]),
            currency: new FormControl(Currency.KZT, [Validators.required]),
            company: new FormControl(null, [Validators.required]),
            grade: new FormControl(null, []),
            profession: new FormControl(null, [Validators.required]),
        });
    }

    createRequestOrNull(): CreateUserSalaryRequest | null {
        if (this.valid) {
          return {
            value: Number(this.value.value),
            quarter: Number(this.value.quarter),
            year: Number(this.value.year),
            currency: Number(this.value.currency) as Currency,
            company: Number(this.value.company) as CompanyType,
            grade: Number(this.value.grade) as DeveloperGrade,
            profession: Number(this.value.profession) as UserProfession,
          };
        }
    
        this.markAllAsTouched();
        return null;
    }
}