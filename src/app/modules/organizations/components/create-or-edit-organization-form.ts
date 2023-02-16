import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization } from '@models/organizations/organization.model';
import { CreateOrganizationRequest, UpdateOrganizationRequest } from '@services/organizations.service';

export class CreateOrEditOrganizationForm extends FormGroup {
  constructor(organization: Organization | null) {
    super({
      id: new FormControl(organization?.id),
      name: new FormControl(organization?.name, [Validators.required]),
      description: new FormControl(organization?.description, [Validators.maxLength(255)])
    });
  }

  forEdit(): boolean {
    return this.value.id != null;
  }

  createRequestOrNull(): CreateOrganizationRequest | null {
    if (this.invalid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      name: this.value.name,
      description: this.value.description
    };
  }

  updateRequestOrNull(): UpdateOrganizationRequest | null {
    if (this.invalid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      id: this.value.id,
      name: this.value.name,
      description: this.value.description
    };
  }
}
