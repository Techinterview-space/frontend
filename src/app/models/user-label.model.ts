import { z } from "zod";

export const LabelSchema = z.object({
  id: z.number().nullable(),
  title: z.string(),
  hexColor: z.string(),
  createdById: z.number().nullable(),
  organizationId: z.string().nullable(),
});

export type Label = z.infer<typeof LabelSchema>;
