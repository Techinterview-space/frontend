import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  OpenAiPrompt,
  OpenAiPromptEditRequest,
  OpenAiPromptType,
  AiEngine,
} from "@models/openai-prompt.model";

export class OpenAiPromptForm extends FormGroup {
  constructor(private readonly prompt: OpenAiPrompt | null) {
    super({
      id: new FormControl(prompt?.id ?? "", [Validators.required]),
      prompt: new FormControl(prompt?.prompt ?? "", [
        Validators.required,
        Validators.maxLength(5000),
      ]),
      model: new FormControl(prompt?.model ?? "", [
        Validators.required,
        Validators.maxLength(200),
      ]),
      engine: new FormControl(prompt?.engine ?? "", [Validators.required]),
    });
  }

  getEditRequestOrNull(): OpenAiPromptEditRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    var idAsNumber = Number(this.value.id);
    if (isNaN(idAsNumber)) {
      return null;
    }

    var engineAsNumber = Number(this.value.engine);
    if (isNaN(engineAsNumber)) {
      return null;
    }

    return {
      id: idAsNumber as OpenAiPromptType,
      prompt: this.value.prompt,
      model: this.value.model,
      engine: engineAsNumber as AiEngine,
    };
  }
}
