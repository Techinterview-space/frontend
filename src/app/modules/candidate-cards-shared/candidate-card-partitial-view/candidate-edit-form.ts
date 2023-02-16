import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EditCandidateCardRequest } from '@services/candidate-cards.service';

export class CandidateEditForm extends FormGroup {
  private readonly candidateCard: CandidateCard;
  constructor(candidateCard: CandidateCard) {
    super({
      candidateId: new FormControl(candidateCard.candidateId),
      candidateFirstName: new FormControl(candidateCard.candidate?.firstName, [Validators.required]),
      candidateLastName: new FormControl(candidateCard.candidate?.lastName, [Validators.required]),
      candidateContacts: new FormControl(candidateCard.candidate?.contacts, [Validators.minLength(5)])
    });

    this.candidateCard = candidateCard;
  }

  requestOrNull(): EditCandidateCardRequest | null {
    if (this.valid) {
      return {
        organizationId: this.candidateCard.organizationId,
        employmentStatus: this.candidateCard.employmentStatus,
        candidateId: this.value.candidateId,
        candidateFirstName: this.value.candidateFirstName,
        candidateLastName: this.value.candidateLastName,
        candidateContacts: this.value.candidateContacts,
        labels: this.candidateCard.labels
      };
    }

    this.markAllAsTouched();
    return null;
  }
}
