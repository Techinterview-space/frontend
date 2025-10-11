import { z } from "zod";
import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "./company-type";
import { Currency } from "./currency";
import { KazakhstanCity } from "./kazakhstan-city";
import { Gender } from "@models/enums/gender.enum";

export enum SalarySourceType {
  Undefined = 0,
  KolesaDevelopersCsv2022 = 1,
  KolesaDataAnalyticsCsv2024 = 2,
}

export const UserSalarySimpleSchema = z.object({
  value: z.number(),
  quarter: z.number(),
  year: z.number(),
  currency: z.nativeEnum(Currency),
  company: z.nativeEnum(CompanyType),
  grade: z.nativeEnum(DeveloperGrade).nullable(),
  createdAt: z.date(),
});

export type UserSalarySimple = z.infer<typeof UserSalarySimpleSchema>;

export const UserSalarySchema = UserSalarySimpleSchema.extend({
  city: z.nativeEnum(KazakhstanCity).nullable(),
  gender: z.nativeEnum(Gender).nullable(),
  age: z.number().nullable(),
  yearOfStartingWork: z.number().nullable(),
  yearsOfExperience: z.number().nullable(),
  requireAdditionalData: z.boolean(),
  skillId: z.number().nullable(),
  workIndustryId: z.number().nullable(),
  professionId: z.number().nullable(),
  sourceType: z.nativeEnum(SalarySourceType).nullable(),
});

export type UserSalary = z.infer<typeof UserSalarySchema>;

export const UserSalaryAdminDtoSchema = UserSalarySchema.extend({
  id: z.string(),
  updatedAt: z.date().nullable(),
});

export type UserSalaryAdminDto = z.infer<typeof UserSalaryAdminDtoSchema>;
