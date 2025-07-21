import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateJobPostingMessageSubscriptionBody } from "@services/job-posting-message-subscriptions.service";
import { JobPostingMessageSubscription } from "@models/telegram";

export class JobPostingMessageSubscriptionEditForm extends FormGroup {
  static readonly digitsPattern = "^[\-0-9]*$";

  constructor(private readonly item: JobPostingMessageSubscription | null) {
    super({
      name: new FormControl(item?.name ?? null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      telegramChatId: new FormControl(item?.telegramChatId ?? null, [
        Validators.required,
        Validators.pattern(JobPostingMessageSubscriptionEditForm.digitsPattern),
        Validators.maxLength(100),
      ]),
      professionIds: new FormControl(item?.professionIds?.join(",") ?? null, [
        Validators.maxLength(500),
      ]),
    });
  }

  hasItemToEdit(): boolean {
    return this.item != null;
  }

  getItemId(): string | null {
    return this.item?.id ?? null;
  }

  createRequestOrNull(): CreateJobPostingMessageSubscriptionBody | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const telegramChatId = parseInt(this.value.telegramChatId as string);

    const professionIdsAsString = this.value.professionIds as string;
    let professionIds: Array<number> = [];
    if (professionIdsAsString != null) {
      professionIds = professionIdsAsString
        .split(",")
        .map((x) => parseInt(x, 10))
        .filter((x) => !isNaN(x));
    }

    return {
      name: this.value.name,
      telegramChatId: telegramChatId,
      professionIds: professionIds,
    };
  }
}
