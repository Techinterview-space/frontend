import { z } from "zod";

export const OpenAiBodyReportMetadataSchema = z.object({
  reportDate: z.string(),
  currency: z.string(),
  periodType: z.string(),
});

export type OpenAiBodyReportMetadata = z.infer<
  typeof OpenAiBodyReportMetadataSchema
>;

export const OpenAiBodyReportRoleSalaryDataSchema = z.object({
  average: z.number(),
  median: z.number(),
  min: z.number().nullable(),
  max: z.number().nullable(),
  count: z.number(),
});

export type OpenAiBodyReportRoleSalaryData = z.infer<
  typeof OpenAiBodyReportRoleSalaryDataSchema
>;

export const OpenAiBodyReportRoleHistoricalDataSchema = z.object({
  date: z.string(),
  average: z.number(),
  percentChange: z.number(),
});

export type OpenAiBodyReportRoleHistoricalData = z.infer<
  typeof OpenAiBodyReportRoleHistoricalDataSchema
>;

export const OpenAiBodyReportRoleSchema = z.object({
  roleName: z.string(),
  currentSalary: OpenAiBodyReportRoleSalaryDataSchema,
  historicalData: z.array(OpenAiBodyReportRoleHistoricalDataSchema),
});

export type OpenAiBodyReportRole = z.infer<typeof OpenAiBodyReportRoleSchema>;

export const OpenAiReportSchema = z.object({
  reportMetadata: OpenAiBodyReportMetadataSchema,
  roles: z.array(OpenAiBodyReportRoleSchema),
});

export type OpenAiReport = z.infer<typeof OpenAiReportSchema>;

export const OpenAiAnalysisSchema = z.object({
  analysis: z.string(),
  bearer: z.string(),
  report: OpenAiReportSchema,
});

export type OpenAiAnalysis = z.infer<typeof OpenAiAnalysisSchema>;

export const OpenAiChatChoiseSchema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  }),
});

export type OpenAiChatChoise = z.infer<typeof OpenAiChatChoiseSchema>;

export const OpenAiChatResultSchema = z.object({
  isSuccess: z.boolean(),
  choises: z.array(OpenAiChatChoiseSchema),
  model: z.string(),
});

export type OpenAiChatResult = z.infer<typeof OpenAiChatResultSchema>;
