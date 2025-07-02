export interface OpenAiPrompt {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpenAiPromptCreateRequest {
  title: string;
  content: string;
}

export interface OpenAiPromptUpdateRequest {
  id: number;
  title: string;
  content: string;
}