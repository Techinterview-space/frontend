import { z } from "zod";

export const KeyValueSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export type KeyValue = z.infer<typeof KeyValueSchema>;

export const HealthReportSchema = z.object({
  status: z.string(),
  errors: z.array(KeyValueSchema),
});

export type HealthReport = z.infer<typeof HealthReportSchema>;
