import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CreateSalariesHistoricalDataRecordTemplateRequest,
  SalariesHistoricalDataRecordTemplateDto,
} from "@services/salaries-historical-data-templates.service";

export class HistoricalDataTemplateEditForm extends FormGroup {
  constructor(
    private readonly item: SalariesHistoricalDataRecordTemplateDto | null,
  ) {
    super({
      name: new FormControl(item?.name ?? null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      professionIds: new FormControl(item?.professionIds ?? [], [
        Validators.required,
      ]),
    });
  }

  hasItemToEdit(): boolean {
    return this.item != null;
  }

  getItemId(): string | null {
    return this.item?.id ?? null;
  }

  createRequestOrNull(): CreateSalariesHistoricalDataRecordTemplateRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const professionIds = this.value.professionIds as Array<number>;

    return {
      name: this.value.name,
      professionIds: professionIds ?? [],
    };
  }
}
