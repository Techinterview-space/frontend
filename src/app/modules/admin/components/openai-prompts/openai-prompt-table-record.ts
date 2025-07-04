import {
  AiEngineHelper,
  OpenAiPrompt,
  OpenAiPromptTypeHelper,
} from "@models/openai-prompt.model";

export class OpenAiPromptTableRecord {
  constructor(readonly source: OpenAiPrompt) {
    this.id = source.id;
    this.prompt = source.prompt;
    this.model = source.model;
    this.engine = AiEngineHelper.getLabel(source.engine);
    this.isActive = source.isActive;
    this.type = OpenAiPromptTypeHelper.getLabel(source.type);
    this.engine = AiEngineHelper.getLabel(source.engine);
    this.createdAt = source.createdAt;
    this.updatedAt = source.updatedAt;
  }

  readonly id: string;
  readonly type: string;
  readonly prompt: string;
  readonly model: string;
  readonly engine: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
