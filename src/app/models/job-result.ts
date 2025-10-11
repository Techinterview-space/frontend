import { z } from "zod";

export const JobResultSchema = z.object({
  count: z.number(),
});

export type JobResult = z.infer<typeof JobResultSchema>;
