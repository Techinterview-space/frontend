export interface TelegramBotUsage {
  id: number;
  usageCount: number;
  chatId: number;
  username: string;
  usageType: TelegramBotUsageType;
  usageTypeAsString: string;
  receivedMessageText: string | null;
  createdAt: string;
  updatedAt: string;
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

export interface TelegramUserSettings {
  id: string;
  chatId: number;
  userId: number;
  username: string;
  sendBotRegularStatsUpdates: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StatDataCacheChangeSubscription {
  id: string;
  name: string;
  telegramChatId: number;
  professionIds: Array<number>;
  preventNotificationIfNoDifference: boolean;
  useAiAnalysis: boolean;
  lastMessageSent: Date | null;
  regularity: SubscriptionRegularityType;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TelegramInlineReplyStats {
  usersStats: {
    username: string;
    count: number;
  }[];
  chatsStats: {
    chatId: number;
    chatName: string;
    count: number;
  }[];
}
