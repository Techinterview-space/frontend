import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TelegramUserSettings } from "@models/telegram";
import {
  CreateTelegramUserSettingsBody,
  UpdateTelegramUserSettingsBody,
} from "@services/telegram-bot.service";

export class TelegramUserSettingsEditForm extends FormGroup {
  static readonly digitsPattern = "^[0-9]*$";

  constructor(item: TelegramUserSettings | null) {
    super({
      username: new FormControl(item?.username, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      chatId: new FormControl(item?.chatId, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(TelegramUserSettingsEditForm.digitsPattern),
      ]),
      userId: new FormControl(item?.userId, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(TelegramUserSettingsEditForm.digitsPattern),
      ]),
      sendBotRegularStatsUpdates: new FormControl(
        item?.sendBotRegularStatsUpdates,
        [],
      ),
    });
  }

  updateRequestOrNull(): UpdateTelegramUserSettingsBody | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      sendBotRegularStatsUpdates: this.value.sendBotRegularStatsUpdates,
    };
  }

  createRequestOrNull(): CreateTelegramUserSettingsBody | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    return {
      chatId: this.value.chatId,
      userId: this.value.userId,
      username: this.value.username,
      sendBotRegularStatsUpdates: this.value.sendBotRegularStatsUpdates,
    };
  }
}
