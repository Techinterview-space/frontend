import { z } from "zod";

export const LabelEntityDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  hexColorAsString: z.string(),
});

export type LabelEntityDto = z.infer<typeof LabelEntityDtoSchema>;

export const LabelEntityAdmiDtoSchema = LabelEntityDtoSchema.extend({
  createdById: z.number().nullable(),
  createdBy: z.string().nullable(),
});

export type LabelEntityAdmiDto = z.infer<typeof LabelEntityAdmiDtoSchema>;

export const CreateLabelEntityRequestSchema = z.object({
  title: z.string(),
  hexColor: z.string(),
});

export type CreateLabelEntityRequest = z.infer<
  typeof CreateLabelEntityRequestSchema
>;

export const UpdateLabelEntityRequestSchema =
  CreateLabelEntityRequestSchema.extend({
    id: z.number(),
  });

export type UpdateLabelEntityRequest = z.infer<
  typeof UpdateLabelEntityRequestSchema
>;
