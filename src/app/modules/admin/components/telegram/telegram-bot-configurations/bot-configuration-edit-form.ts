import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CreateTelegramBotConfigurationRequest,
  TelegramBotConfiguration,
  TelegramBotType,
  UpdateTelegramBotConfigurationRequest,
} from "@models/telegram";

export class BotConfigurationEditForm extends FormGroup {
  private readonly _isEdit: boolean;

  constructor(item: TelegramBotConfiguration | null) {
    const isEdit = item != null;

    super({
      botType: new FormControl(
        { value: item?.botType ?? TelegramBotType.Undefined, disabled: isEdit },
        [Validators.required, Validators.min(1)],
      ),
      displayName: new FormControl(item?.displayName ?? "", [
        Validators.required,
        Validators.maxLength(200),
      ]),
      botUsername: new FormControl(item?.botUsername ?? "", [
        Validators.maxLength(32),
      ]),
      isEnabled: new FormControl(item?.isEnabled ?? false, []),
      token: new FormControl(null, isEdit ? [] : [Validators.required]),
    });

    this._isEdit = isEdit;
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  createRequestOrNull(): CreateTelegramBotConfigurationRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      botType: this.getRawValue().botType,
      displayName: this.value.displayName,
      token: this.value.token,
      isEnabled: this.value.isEnabled,
      botUsername: this.value.botUsername ?? "",
    };
  }

  updateRequestOrNull(): UpdateTelegramBotConfigurationRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      displayName: this.value.displayName,
      token: this.value.token ?? "",
      isEnabled: this.value.isEnabled,
      botUsername: this.value.botUsername ?? "",
    };
  }
}
