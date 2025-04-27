import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { Gender } from "@models/enums/gender.enum";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";
import {
  CreateUserSalaryRequest,
  EditUserSalaryRequest,
} from "@services/user-salaries.service";
import { FormatAsMoneyPipe } from "@shared/directives/format-as-money.pipe";

interface InvalidFieldsGroupedByPage {
  page: number;
  fields: string[];
}

interface InvalidField {
  page: number;
  controlName: string;
  field: string;
}

export class EditSalaryForm extends FormGroup {
  static readonly digitsPattern = "^[0-9]*$";

  private _invalidFields: InvalidField[] = [];

  constructor(
    salarytoBeEditedOrNull: UserSalary | null,
    hasIndustries: boolean = false,
    makeAllFieldsRequired: boolean = false,
  ) {
    const thisYear = new Date().getFullYear();
    const now = new Date(Date.now());
    const currentQuarter = Math.floor((now.getMonth() + 3) / 3);
    const salaryValue =
      salarytoBeEditedOrNull?.value != null
        ? FormatAsMoneyPipe.formatNumber(salarytoBeEditedOrNull.value)
        : null;

    super({
      value: new FormControl(salaryValue, [
        Validators.pattern(EditSalaryForm.digitsPattern),
        Validators.required,
        Validators.min(75000),
        Validators.max(10000000),
      ]),
      quarter: new FormControl(
        salarytoBeEditedOrNull?.quarter ?? currentQuarter,
        [
          Validators.pattern(EditSalaryForm.digitsPattern),
          Validators.min(1),
          Validators.max(4),
          Validators.required,
        ],
      ),
      year: new FormControl(salarytoBeEditedOrNull?.year ?? now.getFullYear(), [
        Validators.pattern(EditSalaryForm.digitsPattern),
        Validators.min(2000),
        Validators.max(2100),
        Validators.required,
      ]),
      currency: new FormControl(
        salarytoBeEditedOrNull?.currency ?? Currency.KZT,
        [Validators.required],
      ),
      grade: new FormControl(salarytoBeEditedOrNull?.grade ?? null, [
        Validators.required,
      ]),
      company: new FormControl(salarytoBeEditedOrNull?.company ?? null, [
        Validators.required,
      ]),
      profession: new FormControl(
        salarytoBeEditedOrNull?.professionId ?? null,
        [Validators.required],
      ),
      age: new FormControl(salarytoBeEditedOrNull?.age ?? null, [
        makeAllFieldsRequired ? Validators.required : Validators.nullValidator,
        Validators.min(12),
        Validators.max(120),
      ]),
      yearOfStartingWork: new FormControl(
        salarytoBeEditedOrNull?.yearOfStartingWork ?? null,
        [
          makeAllFieldsRequired
            ? Validators.required
            : Validators.nullValidator,
          Validators.min(1960),
          Validators.max(thisYear),
        ],
      ),
      city: new FormControl(salarytoBeEditedOrNull?.city ?? null, [
        makeAllFieldsRequired ? Validators.required : Validators.nullValidator,
      ]),
      gender: new FormControl(salarytoBeEditedOrNull?.gender ?? null, [
        makeAllFieldsRequired ? Validators.required : Validators.nullValidator,
      ]),
      skillId: new FormControl(salarytoBeEditedOrNull?.skillId ?? null, []),
      workIndustryId: new FormControl(
        salarytoBeEditedOrNull?.workIndustryId ?? null,
        hasIndustries
          ? [
              makeAllFieldsRequired
                ? Validators.required
                : Validators.nullValidator,
            ]
          : [],
      ),
    });
  }

  createAddRequestOrNull(): CreateUserSalaryRequest | null {
    if (this.valid) {
      const grade = Number(this.value.grade) as DeveloperGrade;
      const city =
        this.value.city != null
          ? (Number(this.value.city) as KazakhstanCity)
          : null;

      const skillId =
        this.value.skillId != null ? Number(this.value.skillId) : null;

      const workIndustryId =
        this.value.workIndustryId != null
          ? Number(this.value.workIndustryId)
          : null;

      const professionId =
        this.value.profession != null ? Number(this.value.profession) : null;

      const age = this.value.age != null ? Number(this.value.age) : null;

      const yearOfStartingWork =
        this.value.yearOfStartingWork != null
          ? Number(this.value.yearOfStartingWork)
          : null;

      const gender =
        this.value.gender != null ? Number(this.value.gender) : null;

      return {
        value: Number(this.value.value),
        quarter: Number(this.value.quarter),
        year: Number(this.value.year),
        currency: Number(this.value.currency) as Currency,
        company: Number(this.value.company) as CompanyType,
        grade: grade,
        age: age,
        yearOfStartingWork: yearOfStartingWork,
        gender: gender,
        professionId: professionId,
        city: city != KazakhstanCity.Undefined ? city : null,
        skillId: skillId,
        workIndustryId: workIndustryId,
      };
    }

    this._invalidFields = [];
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

    this.markAllAsTouched();
    return null;
  }

  createEditRequestOrNull(): EditUserSalaryRequest | null {
    if (this.valid) {
      const grade = Number(this.value.grade) as DeveloperGrade;
      const city =
        this.value.city != null
          ? (Number(this.value.city) as KazakhstanCity)
          : null;

      const skillId =
        this.value.skillId != null ? Number(this.value.skillId) : null;

      const workIndustryId =
        this.value.workIndustryId != null
          ? Number(this.value.workIndustryId)
          : null;

      const professionId =
        this.value.profession != null ? Number(this.value.profession) : null;

      const age = this.value.age != null ? Number(this.value.age) : null;

      const yearOfStartingWork =
        this.value.yearOfStartingWork != null
          ? Number(this.value.yearOfStartingWork)
          : null;

      const gender =
        this.value.gender != null ? Number(this.value.gender) : null;

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
      case "value":
        return "Зарплата, NET";
      case "quarter":
        return "Квартал";
      case "company":
        return "Казахстанская / Удаленная компания";
      case "profession":
        return "Ваша специализация";
      case "grade":
        return "Ваш грейд";
      case "workIndustryId":
        return "Сфера деятельности компании";
      case "city":
        return "Город, в котором вы живете";
      case "yearOfStartingWork":
        return "Год старта вашей карьеры";
      case "gender":
          return "Пол";
      case "age":
        return "Сколько вам полных лет?";

      default:
        return "";
    }
  }

  private getPageForField(name: string): number {
    switch (name) {
      case "value":
        case "quarter":
          case "company":
            case "profession":
        return 1;

      case "grade":
        case "workIndustryId":
          case "city":
            
        return 2;

      case "yearOfStartingWork":
        case "gender":
          case "age":
        return 3;

      default:
        return 0;
    }
  }
}
