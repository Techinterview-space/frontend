import { z } from "zod";

export const GitHubProfileSchema = z.object({
  username: z.string(),
  version: z.number(),
  requestsCount: z.number(),
  dataSyncedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

export const GitHubChatSchema = z.object({
  id: z.string(),
  chatId: z.number(),
  username: z.string(),
  isAdmin: z.boolean(),
  messagesCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GitHubChat = z.infer<typeof GitHubChatSchema>;

export const GitHubProcessingJobSchema = z.object({
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GitHubProcessingJob = z.infer<typeof GitHubProcessingJobSchema>;
