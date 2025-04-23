import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateTelegramSubscriptionBody } from "@services/telegram-subscriptions.service";

export class TelegramSubscriptionCreateForm extends FormGroup {
  static readonly digitsPattern = "^[\-0-9]*$";

  constructor() {
    super({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      telegramChatId: new FormControl(null, [
        Validators.required,
        Validators.pattern(TelegramSubscriptionCreateForm.digitsPattern),
        Validators.maxLength(100),
      ]),
      professionIds: new FormControl(null, [Validators.maxLength(500)]),
      preventNotificationIfNoDifference: new FormControl(false, []),
    });
  }

  createRequestOrNull(): CreateTelegramSubscriptionBody | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const professionIdsAsString = this.value.professionIds as string;

    let professionIds: Array<number> = [];
    if (professionIdsAsString != null) {
      professionIds = professionIdsAsString
        .split(",")
        .map((x) => parseInt(x, 10))
        .filter((x) => !isNaN(x));
    }

    const telegramChatIdAsString = this.value.telegramChatId as string;
    const telegramChatId = parseInt(telegramChatIdAsString, 10);

    return {
      name: this.value.name,
      telegramChatId: telegramChatId,
      professionIds: professionIds,
      preventNotificationIfNoDifference:
        this.value.preventNotificationIfNoDifference,
    };
  }
}
