import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Vacancy, VacancyStatus } from "@models/vacancy.model";
import { VacancyEditRequest } from "@services/vacancies.service";

export class VacancyForm extends FormGroup {
  static readonly TITLE_MAX_LENGTH = 200;
  static readonly COMPANY_NAME_MAX_LENGTH = 200;

  constructor(vacancy: Vacancy | null) {
    super(
      {
        title: new FormControl(vacancy?.title ?? "", [
          Validators.required,
          Validators.maxLength(VacancyForm.TITLE_MAX_LENGTH),
        ]),
        companyId: new FormControl(vacancy?.companyId ?? null),
        companyName: new FormControl(vacancy?.companyNameText ?? "", [
          Validators.maxLength(VacancyForm.COMPANY_NAME_MAX_LENGTH),
        ]),
        hideAttachedCompany: new FormControl(
          vacancy?.hideAttachedCompany ?? false,
        ),
        hrContact: new FormControl(vacancy?.hrContact ?? ""),
        description: new FormControl(vacancy?.description ?? ""),
        status: new FormControl(vacancy?.status ?? VacancyStatus.Draft, [
          Validators.required,
        ]),
      },
      { validators: VacancyForm.companyAssignmentValidator },
    );
  }

  // A vacancy must have either a linked company or a free-text company name,
  // and hiding the attached company only makes sense when one is linked.
  private static companyAssignmentValidator(
    group: AbstractControl,
  ): ValidationErrors | null {
    const companyId = group.get("companyId")?.value;
    const companyName = ((group.get("companyName")?.value ?? "") as string).trim();
    const hide = group.get("hideAttachedCompany")?.value === true;

    if (!companyId && !companyName) {
      return { companyRequired: true };
    }

    if (hide && !companyId) {
      return { hideWithoutCompany: true };
    }

    return null;
  }

  requestOrNull(): VacancyEditRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const hrContact = (this.value.hrContact ?? "").trim();
    const companyName = (this.value.companyName ?? "").trim();

    return {
      title: (this.value.title ?? "").trim(),
      companyId: this.value.companyId || null,
      companyName: companyName ? companyName : null,
      hideAttachedCompany: this.value.hideAttachedCompany === true,
      hrContact: hrContact ? hrContact : null,
      description: this.value.description ?? null,
      status: this.value.status,
    };
  }
}
