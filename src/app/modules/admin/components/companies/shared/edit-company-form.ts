import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Company } from "@models/companies.model";
import { CompanyEditRequest } from "@services/companies.service";

export class EditCompanyForm extends FormGroup {
  private static readonly URL_LINK_PATTERN =
    "^https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,10}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$";

  constructor(company: Company | null) {
    super({
      name: new FormControl(company?.name, [Validators.required]),
      description: new FormControl(company?.description, [Validators.required]),
      socialLink: new FormControl(
        company != null && company.links.length > 0 ? company.links[0] : null,
        [Validators.pattern(EditCompanyForm.URL_LINK_PATTERN)],
      ),
      logoUrl: new FormControl(company?.logoUrl, [
        Validators.pattern(EditCompanyForm.URL_LINK_PATTERN),
      ]),
    });
  }

  editRequestOrNull(): CompanyEditRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    var socialLink = this.value.socialLink;

    if (socialLink != null) {
      socialLink = socialLink.trim();
    }

    return {
      name: this.value.name?.trim(),
      description: this.value.description?.trim(),
      links: [socialLink],
      logoUrl: this.value.logoUrl?.trim(),
    };
  }
}
