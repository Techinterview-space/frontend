import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
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
        company: new FormControl(CompanyType.Local, [Validators.required]),
        grade: new FormControl(null, []),
        profession: new FormControl(null, [Validators.required]),
        });
    }

    createRequestOrNull(): CreateUserSalaryRequest | null {
        if (this.valid) {
          return {
            value: this.value.value,
            quarter: this.value.quarter,
            year: this.value.year,
            currency: this.value.currency,
            company: this.value.company,
            grade: this.value.grade,
            profession: this.value.profession,
          };
        }
    
        this.markAllAsTouched();
        return null;
      }
}