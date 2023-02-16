import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateCard } from '@models/organizations/candidate-card.model';

export class CandidateCvUploadForm extends FormGroup {
  constructor(card: CandidateCard) {
    super({
      cardId: new FormControl(card.id, [Validators.required]),
      file: new FormControl(null, [Validators.required])
    });
  }

  onFileAttachmentChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.get('file')!.setValue(file);
    }
  }

  clearFileControl(): void {
    this.get('file')!.setValue(null);
  }

  getFile(): File | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return this.get('file')!.value as File;
  }
}
