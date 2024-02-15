import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateWorkIndustryRequest, UpdateWorkIndustryRequest, WorkIndustryAdmiDto } from '@services/work-industry.service';
import { RandomHexColor } from '@shared/value-objects/random-hex-color';

export class WorkIndustryEditForm extends FormGroup {
  private readonly itemId: number | null;
  constructor(item: WorkIndustryAdmiDto | null) {
    super({
      title: new FormControl(item?.title, [Validators.required, Validators.maxLength(50)]),
      hexColor: new FormControl(item?.hexColorAsString ?? new RandomHexColor().toString(), [
        Validators.required,
        Validators.maxLength(7)
      ]),
    });

    this.itemId = item?.id ?? null;
  }

  randomizeColor(): void {
    this.get('hexColor')?.setValue(new RandomHexColor().toString());
  }

  createRequestOrNull(): CreateWorkIndustryRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      title: this.value.title,
      hexColor: this.value.hexColor,
    };
  }

  updateRequestOrNull(): UpdateWorkIndustryRequest | null {
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
