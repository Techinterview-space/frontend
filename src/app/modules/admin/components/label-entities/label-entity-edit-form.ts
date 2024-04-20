import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CreateLabelEntityRequest,
  LabelEntityAdmiDto,
  UpdateLabelEntityRequest,
} from "@services/label-entity.model";
import { RandomHexColor } from "@shared/value-objects/random-hex-color";

export class LabelEntityEditForm extends FormGroup {
  private readonly itemId: number | null;
  constructor(item: LabelEntityAdmiDto | null) {
    super({
      title: new FormControl(item?.title, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      hexColor: new FormControl(
        item?.hexColorAsString ?? new RandomHexColor().toString(),
        [Validators.required, Validators.maxLength(7)]
      ),
    });

    this.itemId = item?.id ?? null;
  }

  randomizeColor(): void {
    this.get("hexColor")?.setValue(new RandomHexColor().toString());
  }

  createRequestOrNull(): CreateLabelEntityRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      title: this.value.title,
      hexColor: this.value.hexColor,
    };
  }

  updateRequestOrNull(): UpdateLabelEntityRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      id: this.itemId!,
      title: this.value.title,
      hexColor: this.value.hexColor,
    };
  }
}
