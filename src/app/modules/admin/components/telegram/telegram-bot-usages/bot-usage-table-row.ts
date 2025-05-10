import { TelegramBotUsage, TelegramBotUsageType } from "@models/telegram";

export class BotUsageTableRow implements TelegramBotUsage {
  constructor(item: TelegramBotUsage) {
    this.id = item.id;
    this.usageCount = item.usageCount;
    this.chatId = item.chatId;
    this.username = item.username;
    this.channelName = item.channelName;
    this.channelId = item.channelId;
    this.usageType = item.usageType;
    this.usageTypeAsString = item.usageTypeAsString;

    this.receivedMessageText =
      item.receivedMessageText != null && item.receivedMessageText.length > 50
        ? item.receivedMessageText.slice(0, 50) + "..."
        : null;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }

  readonly id: number;
  readonly usageCount: number;
  readonly chatId: number | null;
  readonly username: string;
  readonly channelName: string | null;
  readonly channelId: number | null;
  readonly usageType: TelegramBotUsageType;
  readonly usageTypeAsString: string;
  readonly receivedMessageText: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
