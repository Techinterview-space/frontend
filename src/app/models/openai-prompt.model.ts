export enum OpenAiPromptType {
  Undefined = 0,
  Company = 1,
  Chat = 2,
}

export enum AiEngine {
  Undefined = 0,
  OpenAi = 1,
  Claude = 2,
}

export interface OpenAiPrompt {
  id: string;
  type: OpenAiPromptType;
  prompt: string;
  model: string;
  engine: AiEngine;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OpenAiPromptEditRequest {
  type: OpenAiPromptType;
  prompt: string;
  model: string;
  engine: AiEngine;
}
