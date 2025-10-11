import { z } from "zod";

export const PageParamsSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export type PageParams = z.infer<typeof PageParamsSchema>;

export const defaultPageParams: PageParams = {
  pageSize: 20,
  page: 1,
};
