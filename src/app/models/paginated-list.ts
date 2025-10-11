import { z } from "zod";

export const PaginatedModelSchema = z.object({
  totalItems: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  linkPrefix: z.string(),
});

export type PaginatedModel = z.infer<typeof PaginatedModelSchema>;

export const PaginatedListSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  PaginatedModelSchema.extend({
    results: z.array(itemSchema),
  });

export type PaginatedList<T> = PaginatedModel & {
  results: Array<T>;
};
