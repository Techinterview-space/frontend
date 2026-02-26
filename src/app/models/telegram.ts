import { z } from "zod";

export enum TelegramBotType {
  Undefined = 0,
  Salaries = 1,
  GithubProfile = 2,
  ChannelStats = 3,
}

export const TelegramBotTypeLabel: Record<TelegramBotType, string> = {
  [TelegramBotType.Undefined]: "Не определен",
  [TelegramBotType.Salaries]: "Salaries",
  [TelegramBotType.GithubProfile]: "Github Profile",
  [TelegramBotType.ChannelStats]: "Channel Stats",
};

export const TelegramBotConfigurationSchema = z.object({
  id: z.string(),
  botType: z.nativeEnum(TelegramBotType),
  botTypeAsString: z.string(),
  displayName: z.string(),
  botUsername: z.string().nullable(),
  isEnabled: z.boolean(),
  hasToken: z.boolean(),
  maskedToken: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TelegramBotConfiguration = z.infer<
  typeof TelegramBotConfigurationSchema
>;

export interface CreateTelegramBotConfigurationRequest {
  botType: TelegramBotType;
  displayName: string;
  token: string;
  isEnabled: boolean;
  botUsername: string;
}

export interface UpdateTelegramBotConfigurationRequest {
  displayName: string;
  token: string;
  isEnabled: boolean;
  botUsername: string;
}

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
