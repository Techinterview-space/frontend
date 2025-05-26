import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateTelegramSubscriptionBody } from "@services/telegram-subscriptions.service";
import { StatDataCacheChangeSubscription } from "@models/telegram";

export class TelegramSubscriptionEditForm extends FormGroup {
  static readonly digitsPattern = "^[\-0-9]*$";

  constructor(private readonly item: StatDataCacheChangeSubscription | null) {
    super({
      name: new FormControl(item?.name ?? null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      telegramChatId: new FormControl(item?.telegramChatId ?? null, [
        Validators.required,
        Validators.pattern(TelegramSubscriptionEditForm.digitsPattern),
        Validators.maxLength(100),
      ]),
      professionIds: new FormControl(item?.professionIds?.join(",") ?? null, [
        Validators.maxLength(500),
      ]),
      preventNotificationIfNoDifference: new FormControl(
        item?.preventNotificationIfNoDifference ?? false,
        [],
      ),
      regularity: new FormControl(item?.regularity ?? null, [
        Validators.required,
      ]),
      useAiAnalysis: new FormControl(item?.useAiAnalysis ?? false, []),
    });
  }

  hasItemToEdit(): boolean {
    return this.item != null;
  }

  getItemId(): string | null {
    return this.item?.id ?? null;
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

    const telegramChatId = parseInt(this.value.telegramChatId as string, 10);
    const regularity = parseInt(this.value.regularity as string, 10);

    return {
      name: this.value.name,
      telegramChatId: telegramChatId,
      professionIds: professionIds,
      regularity: regularity,
      useAiAnalysis: this.value.useAiAnalysis,
      preventNotificationIfNoDifference:
        this.value.preventNotificationIfNoDifference,
    };
  }
}
