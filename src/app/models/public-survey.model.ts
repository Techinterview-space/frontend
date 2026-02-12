import { SelectItem } from "@shared/select-boxes/select-item";

export enum PublicSurveyStatus {
  Undefined = 0,
  Draft = 1,
  Published = 2,
  Closed = 3,
}

export class PublicSurveyStatusEnum {
  static label(item: PublicSurveyStatus): string {
    switch (item) {
      case PublicSurveyStatus.Draft:
        return "Черновик";
      case PublicSurveyStatus.Published:
        return "Опубликован";
      case PublicSurveyStatus.Closed:
        return "Закрыт";
      default:
        return "Не указано";
    }
  }

  static options(): Array<SelectItem<PublicSurveyStatus>> {
    return [
      PublicSurveyStatus.Draft,
      PublicSurveyStatus.Published,
      PublicSurveyStatus.Closed,
    ].map((x) => ({
      label: PublicSurveyStatusEnum.label(x),
      value: PublicSurveyStatusEnum.label(x),
      item: x,
    }));
  }
}

export interface PublicSurveyOption {
  id: string;
  text: string;
  order: number;
}

export interface PublicSurveyQuestion {
  id: string;
  text: string;
  allowMultipleChoices: boolean;
  options: PublicSurveyOption[];
  hasUserResponded: boolean;
  totalResponses: number;
}

export interface PublicSurvey {
  id: string;
  title: string;
  description: string;
  slug: string;
  authorId: number;
  status: PublicSurveyStatus;
  createdAt: Date;
  publishedAt: Date | null;
  deletedAt: Date | null;
  isAuthor: boolean;
  question: PublicSurveyQuestion;
}

export interface MySurveyListItem {
  id: string;
  title: string;
  slug: string;
  status: PublicSurveyStatus;
  createdAt: Date;
  publishedAt: Date | null;
  deletedAt: Date | null;
  totalResponses: number;
  questionCount: number;
}

export interface PublicSurveyOptionResult {
  id: string;
  text: string;
  responseCount: number;
  percentage: number;
}

export interface PublicSurveyResults {
  totalResponses: number;
  options: PublicSurveyOptionResult[];
}

export interface CreatePublicSurveyRequest {
  title: string;
  description?: string;
  slug: string;
  question: string;
  allowMultipleChoices: boolean;
  options: string[];
}

export interface UpdatePublicSurveyOptionRequest {
  text: string;
  order: number;
}

export interface UpdatePublicSurveyRequest {
  title?: string;
  description?: string;
  slug?: string;
  question?: string;
  allowMultipleChoices?: boolean;
  options?: UpdatePublicSurveyOptionRequest[];
}

export interface SubmitPublicSurveyResponseRequest {
  optionIds: string[];
}
