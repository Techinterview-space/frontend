import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { Gender } from "@models/enums/gender.enum";
import { CompanyType } from "@models/salaries/company-type";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";
import { EditUserSalaryRequest } from "@services/user-salaries.service";

export class EditSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(
        salarytoBeEdited: UserSalary | null,
        hasIndustries: boolean = false) {
        const thisYear = new Date().getFullYear();
        super({
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
            company: new FormControl(salarytoBeEdited?.company ?? null, [Validators.required]),
            profession: new FormControl(salarytoBeEdited?.professionId ?? null, [Validators.required]),
            age: new FormControl(salarytoBeEdited?.age ?? null, [Validators.required, Validators.min(12), Validators.max(120)]),
            yearOfStartingWork: new FormControl(
                salarytoBeEdited?.yearOfStartingWork ?? null,
                [Validators.required, Validators.min(1960), Validators.max(thisYear)]),
            city: new FormControl(salarytoBeEdited?.city ?? null, []),
            gender: new FormControl(salarytoBeEdited?.gender ?? null, [Validators.required]),
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
            
            const age = this.value.age != null
                ? Number(this.value.age)
                : null;

            const yearOfStartingWork = this.value.yearOfStartingWork != null
                ? Number(this.value.yearOfStartingWork)
                : null;

            const gender = this.value.gender != null
                ? Number(this.value.gender)
                : null;

            return {
                grade: grade,
                age: age,
                yearOfStartingWork: yearOfStartingWork,
                gender: gender as Gender,
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
