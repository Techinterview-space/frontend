import { z } from "zod";
import { LabelSchema } from "@models/user-label.model";
import { ApplicationUserSchema } from "..";
import {
  InterviewTemplateSubjectSchema,
} from "./interview-template-subject";

export const InterviewTemplateSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  overallOpinion: z.string().nullable(),
  authorId: z.number(),
  author: ApplicationUserSchema.nullable(),
  isPublic: z.boolean(),
  organizationId: z.string().nullable(),
  subjects: z.array(InterviewTemplateSubjectSchema).nullable(),
  labels: z.array(LabelSchema),
});

export type InterviewTemplate = z.infer<typeof InterviewTemplateSchema>;
