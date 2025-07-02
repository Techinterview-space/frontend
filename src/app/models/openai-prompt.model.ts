export enum OpenAiPromptType {
  Undefined = 0,
  Company = 1,
  Chat = 2,
}

export class OpenAiPromptTypeHelper {
  static getLabel(type: OpenAiPromptType): string {
    switch (type) {
      case OpenAiPromptType.Company:
        return "Компания";
      case OpenAiPromptType.Chat:
        return "Чат";
      default:
        return "Неизвестный тип";
    }
  }
}

export enum AiEngine {
  Undefined = 0,
  OpenAi = 1,
  Claude = 2,
}

export class AiEngineHelper {
  static getLabel(engine: AiEngine): string {
    switch (engine) {
      case AiEngine.OpenAi:
        return "OpenAI";
      case AiEngine.Claude:
        return "Claude";
      default:
        return "Неизвестный движок";
    }
  }
}

export interface OpenAiPrompt {
  id: string;
  type: OpenAiPromptType;
  prompt: string;
  model: string;
  engine: AiEngine;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpenAiPromptEditRequest {
  type: OpenAiPromptType;
  prompt: string;
  model: string;
  engine: AiEngine;
}
