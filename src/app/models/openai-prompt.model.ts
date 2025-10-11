import { z } from "zod";

export enum OpenAiPromptType {
  Undefined = 0,
  Company = 1,
  Chat = 2,
  SalariesWeeklyUpdate = 3,
  CompanyReviewsWeeklyUpdate = 4,
}

export class OpenAiPromptTypeHelper {
  static getLabel(type: OpenAiPromptType): string {
    switch (type) {
      case OpenAiPromptType.Company:
        return "Компания";
      case OpenAiPromptType.Chat:
        return "Чат";
      case OpenAiPromptType.SalariesWeeklyUpdate:
        return "Зарплаты (еженедельно)";
      case OpenAiPromptType.CompanyReviewsWeeklyUpdate:
        return "Отзывы (еженедельно)";
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

export const OpenAiPromptSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(OpenAiPromptType),
  prompt: z.string(),
  model: z.string(),
  engine: z.nativeEnum(AiEngine),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type OpenAiPrompt = z.infer<typeof OpenAiPromptSchema>;

export const OpenAiPromptEditRequestSchema = z.object({
  type: z.nativeEnum(OpenAiPromptType),
  prompt: z.string(),
  model: z.string(),
  engine: z.nativeEnum(AiEngine),
});

export type OpenAiPromptEditRequest = z.infer<
  typeof OpenAiPromptEditRequestSchema
>;
