import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateCurrencyRecordRequest } from "@services/currencies-collection.service";
import { CurrencyType } from "@services/admin-tools.service";

export class CurrencyRecordEditForm extends FormGroup {
  constructor() {
    super({
      currency: new FormControl(CurrencyType.USD, [Validators.required]),
      value: new FormControl(null, [
        Validators.required,
        Validators.min(0.0001),
      ]),
      pubDate: new FormControl(new Date().toISOString().split("T")[0], [
        Validators.required,
      ]),
    });
  }

  createRequestOrNull(): CreateCurrencyRecordRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      currency: this.value.currency,
      value: this.value.value,
      currencyDate: this.value.pubDate,
    };
  }
}
