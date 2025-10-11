import { z } from "zod";

export enum TelegramBotUsageType {
  Undefined = 0,
  DirectMessage = 1,
  GroupMention = 2,
  SupergroupMention = 3,
  InlineQuery = 4,
}

export enum SubscriptionRegularityType {
  Undefined = 0,
  Weekly = 1,
  Monthly = 2,
}

export const TelegramBotUsageSchema = z.object({
  id: z.number(),
  usageCount: z.number(),
  chatId: z.number(),
  username: z.string(),
  usageType: z.nativeEnum(TelegramBotUsageType),
  usageTypeAsString: z.string(),
  receivedMessageText: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TelegramBotUsage = z.infer<typeof TelegramBotUsageSchema>;

export const TelegramUserSettingsSchema = z.object({
  id: z.string(),
  chatId: z.number(),
  userId: z.number(),
  username: z.string(),
  sendBotRegularStatsUpdates: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TelegramUserSettings = z.infer<typeof TelegramUserSettingsSchema>;

export const SalariesStatSubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  telegramChatId: z.number(),
  professionIds: z.array(z.number()),
  preventNotificationIfNoDifference: z.boolean(),
  useAiAnalysis: z.boolean(),
  lastMessageSent: z.date().nullable(),
  regularity: z.nativeEnum(SubscriptionRegularityType),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SalariesStatSubscription = z.infer<
  typeof SalariesStatSubscriptionSchema
>;

export const CompanyReviewsStatSubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  telegramChatId: z.number(),
  useAiAnalysis: z.boolean(),
  lastMessageSent: z.date().nullable(),
  regularity: z.nativeEnum(SubscriptionRegularityType),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CompanyReviewsStatSubscription = z.infer<
  typeof CompanyReviewsStatSubscriptionSchema
>;

export const JobPostingMessageSubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  telegramChatId: z.number(),
  professionIds: z.array(z.number()),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type JobPostingMessageSubscription = z.infer<
  typeof JobPostingMessageSubscriptionSchema
>;

export const TelegramInlineReplyStatsSchema = z.object({
  usersStats: z.array(
    z.object({
      username: z.string(),
      count: z.number(),
    }),
  ),
  chatsStats: z.array(
    z.object({
      chatId: z.number(),
      chatName: z.string(),
      count: z.number(),
    }),
  ),
});

export type TelegramInlineReplyStats = z.infer<
  typeof TelegramInlineReplyStatsSchema
>;
