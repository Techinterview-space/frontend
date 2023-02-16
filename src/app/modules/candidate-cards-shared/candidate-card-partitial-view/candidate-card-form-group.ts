import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { AddCommentRequest } from '@services/candidate-cards.service';

export class CandidateCardCommentFormGroup extends FormGroup {
  constructor(card: CandidateCard) {
    super({
      comment: new FormControl(null, [Validators.required, Validators.max(5000)]),
      candidateCardId: new FormControl(card.id)
    });
  }

  requestOrNull(): AddCommentRequest | null {
    if (!this.valid) {
      this.markAsTouched();
      return null;
    }

    return {
      comment: this.value.comment,
      candidateCardId: this.value.candidateCardId
    };
  }
}
