import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CompanyEmploymentType, CompanyEmploymentTypeEnum } from "@models/companies.model";
import { CompanyReviewCreateRequest } from "@services/companies.service";

export class CompanyReviewForm extends FormGroup {

    readonly companyEmploymentTypes = CompanyEmploymentTypeEnum.employmentTypes;

    constructor() {
        super({
            cultureAndValues: new FormControl(
                null, [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(5),
                ]),
            codeQuality: new FormControl(null, [
                Validators.min(1),
                Validators.max(5),
            ]),
            workLifeBalance: new FormControl(null, [
                Validators.required,
                Validators.min(1),
                Validators.max(5),
            ]),
            compensationAndBenefits: new FormControl(null, [
                Validators.required,
                Validators.min(1),
                Validators.max(5),
            ]),
            careerOpportunities: new FormControl(null, [
                Validators.required,
                Validators.min(1),
                Validators.max(5),
            ]),
            management: new FormControl(null, [
                Validators.required,
                Validators.min(1),
                Validators.max(5),
            ]),
            pros: new FormControl(null),
            cons: new FormControl(null),
            iWorkHere: new FormControl(false),
            userEmployment: new FormControl(CompanyEmploymentType.FullTime, [
                Validators.required,
            ]),
        });
    }

    setStarRating(controlName: string, rating: number): void {
        this.controls[controlName].setValue(rating);
    }

    getStarRating(controlName: string): number {
        return this.value[controlName];
    }

    getRequestOrNull(): CompanyReviewCreateRequest | null {
        if (!this.valid) {
            this.markAllAsTouched();
            return null;
        }

        if (this.value.userEmployment === null) {
            this.markAllAsTouched();
            return null;
        }

        const userEmploymentAsInt = parseInt(this.value.userEmployment);
        if (isNaN(userEmploymentAsInt)) {
            this.markAllAsTouched();
            return null;
        }

        return {
            cultureAndValues: this.value.cultureAndValues,
            codeQuality: this.value.codeQuality,
            workLifeBalance: this.value.workLifeBalance,
            compensationAndBenefits: this.value.compensationAndBenefits,
            careerOpportunities: this.value.careerOpportunities,
            management: this.value.management,
            pros: this.value.pros,
            cons: this.value.cons,
            iWorkHere: this.value.iWorkHere as boolean,
            userEmployment: this.value.userEmployment as CompanyEmploymentType,
        };
    }
}