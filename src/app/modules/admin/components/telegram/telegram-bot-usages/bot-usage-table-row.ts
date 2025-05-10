import { TelegramBotUsage, TelegramBotUsageType } from "@models/telegram";

export class BotUsageTableRow implements TelegramBotUsage {
  constructor(item: TelegramBotUsage) {
    this.id = item.id;
    this.usageCount = item.usageCount;
    this.chatId = item.chatId;
    this.username = item.username;
    this.usageType = item.usageType;
    this.usageTypeAsString = item.usageTypeAsString;

    this.receivedMessageText =
      item.receivedMessageText != null && item.receivedMessageText.length > 50
        ? item.receivedMessageText.slice(0, 50) + "..."
        : null;

    this.receivedMessageTextOriginal = item.receivedMessageText;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }

  readonly id: number;
  readonly usageCount: number;
  readonly chatId: number;
  readonly username: string;
  readonly usageType: TelegramBotUsageType;
  readonly usageTypeAsString: string;
  readonly receivedMessageText: string | null;
  readonly receivedMessageTextOriginal: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
