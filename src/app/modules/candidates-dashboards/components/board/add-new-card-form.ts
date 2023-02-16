import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationUser } from '@models/application-user';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { EditCandidateCardRequest } from '@services/candidate-cards.service';

export class AddNewCardForm extends FormGroup {
  constructor(organizationId: string | null, currentUser: ApplicationUser | null, employmentStatus: EmploymentStatus) {
    super({
      candidateFirstName: new FormControl(null, [Validators.required]),
      candidateLastName: new FormControl(null, [Validators.required]),
      candidateContacts: new FormControl(null, []),
      organizationId: new FormControl(organizationId),
      createdById: new FormControl(currentUser?.id),
      employmentStatus: new FormControl(employmentStatus)
    });
  }

  candidateCardOrNull(): EditCandidateCardRequest | null {
    if (this.valid) {
      return {
        employmentStatus: this.value.employmentStatus,
        candidateId: null,
        organizationId: this.value.organizationId,
        candidateFirstName: this.value.candidateFirstName,
        candidateLastName: this.value.candidateLastName,
        candidateContacts: this.value.candidateContacts,
        labels: []
      };
    }

    this.markAllAsTouched();
    return null;
  }
}
