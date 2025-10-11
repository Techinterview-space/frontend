import { z } from "zod";
import { SelectItem } from "@shared/select-boxes/select-item";

export const AiHtmlAnalysisSchema = z.object({
  test: z.string(),
  html: z.string(),
  model: z.string(),
  createdAt: z.date(),
});

export type AiHtmlAnalysis = z.infer<typeof AiHtmlAnalysisSchema>;

export const CompanyReviewSchema = z.object({
  id: z.string(),
  cultureAndValues: z.number(),
  codeQuality: z.number().nullable(),
  workLifeBalance: z.number(),
  compensationAndBenefits: z.number(),
  careerOpportunities: z.number(),
  management: z.number(),
  totalRating: z.number(),
  pros: z.string(),
  cons: z.string(),
  iWorkHere: z.boolean(),
  userEmployment: z.nativeEnum(CompanyEmploymentType), // CompanyEmploymentType
  companyId: z.string(),
  companyName: z.string().nullable(),
  companySlug: z.string().nullable(),
  likesCount: z.number(),
  dislikesCount: z.number(),
  likesRate: z.number().nullable(),
  createdAt: z.date(),
  approvedAt: z.date().nullable(),
  outdatedAt: z.date().nullable(),
});

export type CompanyReview = z.infer<typeof CompanyReviewSchema>;

export const CompanyRatingHistorySchema = z.object({
  rating: z.number(),
  createdAt: z.date(),
});

export type CompanyRatingHistory = z.infer<typeof CompanyRatingHistorySchema>;

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  links: z.array(z.string()),
  logoUrl: z.string(),
  rating: z.number(),
  reviewsCount: z.number(),
  viewsCount: z.number(),
  slug: z.string(),
  reviews: z.array(CompanyReviewSchema),
  ratingHistory: z.array(CompanyRatingHistorySchema),
  userIsAllowedToAddReview: z.boolean(),
  aiAnalysis: AiHtmlAnalysisSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type Company = z.infer<typeof CompanySchema>;

export enum CompanyEmploymentType {
  Undefined = 0,
  FullTime = 1,
  PartTime = 2,
  Internship = 3,
  IndividualContractor = 4,
}

export class CompanyEmploymentTypeEnum {
  static readonly employmentTypes: Array<CompanyEmploymentType> = [
    CompanyEmploymentType.FullTime,
    CompanyEmploymentType.PartTime,
    CompanyEmploymentType.Internship,
    CompanyEmploymentType.IndividualContractor,
  ];

  static options(): Array<SelectItem<CompanyEmploymentType>> {
    return CompanyEmploymentTypeEnum.employmentTypes.map((x) => {
      let label: string | null = null;
      switch (x) {
        case CompanyEmploymentType.Undefined:
          label = "Не указано";
          break;
        case CompanyEmploymentType.IndividualContractor:
          label = "Контрактор (фрилансер)";
          break;
        case CompanyEmploymentType.Internship:
          label = "Стажировка";
          break;
        case CompanyEmploymentType.PartTime:
          label = "Частичная занятость";
          break;
        case CompanyEmploymentType.FullTime:
          label = "Полная занятость";
          break;

        default:
          label = x;
          break;
      }

      return {
        label: label,
        value: label,
        item: x,
      };
    });
  }
}
