export interface TelegramBotUsage {
  id: number;
  usageCount: number;
  username: string;
  channelName: string | null;
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
