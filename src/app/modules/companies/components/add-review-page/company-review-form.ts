import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CompanyEmploymentType,
  CompanyEmploymentTypeEnum,
} from "@models/companies.model";
import { CompanyReviewCreateRequest } from "@services/companies.service";
import {
  InvalidField,
  InvalidFieldsGroupedByPage,
} from "@shared/forms/form-group-utils";

export class CompanyReviewForm extends FormGroup {
  readonly companyEmploymentTypes = CompanyEmploymentTypeEnum.employmentTypes;

  private _invalidFields: InvalidField[] = [];

  constructor() {
    super({
      cultureAndValues: new FormControl(null, [
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
      pros: new FormControl(null, [Validators.required]),
      cons: new FormControl(null, [Validators.required]),
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
    this._invalidFields = [];
    if (!this.valid || this.value.userEmployment === null) {
      this.markAllAsTouched();

      const controls = this.controls;
      for (const name in controls) {
        const control = this.controls[name];

        if (control.invalid) {
          this._invalidFields.push({
            page: this.getPageForField(name),
            controlName: name,
            field: this.getControlNameLable(name),
          });
        }
      }

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
      userEmployment: userEmploymentAsInt as CompanyEmploymentType,
    };
  }

  getInvalidFields(): InvalidFieldsGroupedByPage[] {
    if (this._invalidFields.length === 0) {
      return [];
    }

    const groupedByPage: InvalidFieldsGroupedByPage[] = [
      {
        page: 1,
        fields: [],
      },
      {
        page: 2,
        fields: [],
      },
      {
        page: 3,
        fields: [],
      },
    ];

    for (const invalidField of this._invalidFields) {
      const page = invalidField.page;
      groupedByPage[page - 1].fields.push(invalidField.field);
    }

    return groupedByPage;
  }

  private getControlNameLable(name: string): string {
    switch (name) {
      case "cultureAndValues":
        return "Культура и ценности";
      case "codeQuality":
        return "Качество кода";
      case "workLifeBalance":
        return "Work / Life баланс";
      case "compensationAndBenefits":
        return "Зарплата и бонусы";
      case "careerOpportunities":
        return "Карьерные возможности";
      case "management":
        return "Менеджмент";
      case "pros":
        return "Плюсы";
      case "cons":
        return "Минусы";
      case "iWorkHere":
        return "Работаю здесь";
      case "userEmployment":
        return "Сфера деятельности компании";

      default:
        return "";
    }
  }

  private getPageForField(name: string): number {
    switch (name) {
      case "cultureAndValues":
      case "codeQuality":
      case "workLifeBalance":
      case "compensationAndBenefits":
      case "careerOpportunities":
      case "management":
        return 2;

      case "pros":
      case "cons":
      case "iWorkHere":
      case "userEmployment":
        return 3;

      default:
        return 0;
    }
  }
}
