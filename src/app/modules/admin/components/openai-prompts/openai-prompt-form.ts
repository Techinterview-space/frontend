import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  OpenAiPrompt,
  OpenAiPromptCreateRequest,
  OpenAiPromptUpdateRequest,
} from "@models/openai-prompt.model";

export class OpenAiPromptForm extends FormGroup {
  constructor(prompt: OpenAiPrompt | null) {
    super({
      title: new FormControl(prompt?.title ?? "", [
        Validators.required,
        Validators.maxLength(255),
      ]),
      content: new FormControl(prompt?.content ?? "", [
        Validators.required,
        Validators.maxLength(5000),
      ]),
    });
  }

  get title(): FormControl {
    return this.get("title") as FormControl;
  }

  get content(): FormControl {
    return this.get("content") as FormControl;
  }

  createRequestOrNull(): OpenAiPromptCreateRequest | null {
    if (!this.valid) {
      return null;
    }

    return {
      title: this.title.value,
      content: this.content.value,
    };
  }

  updateRequestOrNull(id: number): OpenAiPromptUpdateRequest | null {
    if (!this.valid) {
      return null;
    }

    return {
      id: id,
      title: this.title.value,
      content: this.content.value,
    };
  }
}