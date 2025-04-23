export interface TelegramBotUsage {
  id: number;
  usageCount: number;
  username: string;
  channelName: string | null;
  channelId: number | null;
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
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
