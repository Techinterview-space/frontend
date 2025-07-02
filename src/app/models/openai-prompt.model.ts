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
  id: OpenAiPromptType;
  prompt: string;
  model: string;
  engine: AiEngine;
  createdAt: string;
  updatedAt: string;
}

export interface OpenAiPromptEditRequest {
  id: OpenAiPromptType | null;
  prompt: string;
  model: string;
  engine: AiEngine;
}
