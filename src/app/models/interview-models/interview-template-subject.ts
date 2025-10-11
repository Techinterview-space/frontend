import { z } from "zod";

export const InterviewTemplateSubjectSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
});

export type InterviewTemplateSubject = z.infer<
  typeof InterviewTemplateSubjectSchema
>;
