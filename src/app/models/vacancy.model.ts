import { z } from "zod";

export enum VacancyStatus {
  Undefined = 0,
  Draft = 1,
  Public = 2,
  Closed = 3,
}

export const VacancySchema = z.object({
  id: z.string(),
  title: z.string(),
  hrContact: z.string().nullable(),
  description: z.string().nullable(),
  status: z.nativeEnum(VacancyStatus),
  companyId: z.string().nullable(),
  // Effective display name: the free-text override if set, otherwise the linked company's name.
  companyName: z.string().nullable(),
  // Raw free-text override the recruiter typed (e.g. "NDA"); drives the edit form.
  companyNameText: z.string().nullable(),
  hideAttachedCompany: z.boolean(),
  companySlug: z.string().nullable(),
  companyIsDeleted: z.boolean(),
  authorId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type Vacancy = z.infer<typeof VacancySchema>;

export const VacancyListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.nativeEnum(VacancyStatus),
  companyId: z.string().nullable(),
  companyName: z.string().nullable(),
  companyNameText: z.string().nullable(),
  hideAttachedCompany: z.boolean(),
  companySlug: z.string().nullable(),
  companyIsDeleted: z.boolean(),
  authorId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type VacancyListItem = z.infer<typeof VacancyListItemSchema>;

export class VacancyStatusEnum {
  static readonly editableStatuses: Array<VacancyStatus> = [
    VacancyStatus.Draft,
    VacancyStatus.Public,
    VacancyStatus.Closed,
  ];

  static readonly adminMoveStatuses: Array<VacancyStatus> = [
    VacancyStatus.Draft,
    VacancyStatus.Closed,
  ];

  static label(status: VacancyStatus): string {
    switch (status) {
      case VacancyStatus.Draft:
        return "Черновик";
      case VacancyStatus.Public:
        return "Опубликована";
      case VacancyStatus.Closed:
        return "Закрыта";
      default:
        return "Неизвестно";
    }
  }

  static badgeCss(status: VacancyStatus): string {
    switch (status) {
      case VacancyStatus.Public:
        return "text-bg-success";
      case VacancyStatus.Closed:
        return "text-bg-secondary";
      case VacancyStatus.Draft:
      default:
        return "text-bg-warning";
    }
  }
}
