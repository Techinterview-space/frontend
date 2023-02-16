import { FormGroup, FormControl, Validators } from '@angular/forms';

export class DeclineForm extends FormGroup {
  constructor() {
    super({
      comment: new FormControl('', [Validators.required])
    });
  }

  onSubmit(successCallback: (comment: string) => void): void {
    if (!this.valid) {
      this.markAllAsTouched();
      return;
    }

    successCallback(this.comment);
  }

  private get comment(): string {
    return this.value.comment as string;
  }
}
