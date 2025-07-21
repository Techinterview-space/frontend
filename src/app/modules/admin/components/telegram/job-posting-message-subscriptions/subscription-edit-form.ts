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

  createRequestOrNull(): CreateJobPostingMessageSubscriptionBody | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const telegramChatId = parseInt(this.value.telegramChatId as string, 10);
    const regularity = parseInt(this.value.regularity as string, 10);

    return {
      name: this.value.name,
      telegramChatId: telegramChatId,
      regularity: regularity,
      useAiAnalysis: this.value.useAiAnalysis,
    };
  }
}