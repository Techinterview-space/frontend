import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  TelegramBotUsage,
  TelegramInlineReplyStats,
  TelegramUserSettings,
} from "@models/telegram";

export interface UpdateTelegramUserSettingsBody {
  sendBotRegularStatsUpdates: boolean;
}

export interface CreateTelegramUserSettingsBody
  extends UpdateTelegramUserSettingsBody {
  chatId: number;
  userId: number;
  username: string;
}

@Injectable()
export class TelegramBotService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/telegram-bot/`;
  }

  botUsages(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<TelegramBotUsage>> {
    return this.api.get<PaginatedList<TelegramBotUsage>>(
      this.apiUrl +
        "bot-usages" +
        "?" +
        new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  getUserSettings(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<TelegramUserSettings>> {
    return this.api.get<PaginatedList<TelegramUserSettings>>(
      this.apiUrl +
        "bot-user-settings" +
        "?" +
        new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  createUserSettings(
    data: CreateTelegramUserSettingsBody,
  ): Observable<TelegramUserSettings> {
    return this.api.post<TelegramUserSettings>(
      this.apiUrl + "bot-user-settings",
      data,
    );
  }

  updateUserSettings(
    id: string,
    data: UpdateTelegramUserSettingsBody,
  ): Observable<TelegramUserSettings> {
    return this.api.put<TelegramUserSettings>(
      this.apiUrl + "bot-user-settings/" + id,
      data,
    );
  }

  deleteUserSettings(id: string): Observable<void> {
    return this.api.delete<void>(this.apiUrl + "bot-user-settings/" + id);
  }
}
