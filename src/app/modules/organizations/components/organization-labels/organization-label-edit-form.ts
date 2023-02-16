import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Label } from '@models/user-label.model';
import { RandomHexColor } from '@shared/value-objects/random-hex-color';

export class OrganizationLabelEditForm extends FormGroup {
  private readonly itemId: number | null;
  constructor(item: Label | null, organizationId: string | null) {
    super({
      title: new FormControl(item?.title, [Validators.required, Validators.maxLength(50)]),
      hexColor: new FormControl(item?.hexColor ?? new RandomHexColor().toString(), [
        Validators.required,
        Validators.maxLength(7)
      ]),
      organizationId: new FormControl(item?.organizationId ?? organizationId ?? null),
    });

    this.itemId = item?.id ?? null;
  }

  requestOrNull(): Label | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      id: this.itemId,
      title: this.value.title,
      hexColor: this.value.hexColor,
      organizationId: this.value.organizationId,
    } as Label;
  }
}
