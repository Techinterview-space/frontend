import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { StatDataCacheChangeSubscription } from "@models/telegram";

export interface CreateTelegramSubscriptionBody {
  name: string;
  telegramChatId: number;
  professionIds: Array<number>;
  preventNotificationIfNoDifference: boolean;
}

@Injectable()
export class TelegramSubscriptionsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/telegram-subscriptions`;
  }

  search(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<StatDataCacheChangeSubscription>> {
    return this.api.get<PaginatedList<StatDataCacheChangeSubscription>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  create(
    body: CreateTelegramSubscriptionBody,
  ): Observable<StatDataCacheChangeSubscription> {
    return this.api.post<StatDataCacheChangeSubscription>(
      `${this.apiUrl}`,
      body,
    );
  }

  activate(id: string): Observable<void> {
    return this.api.put<void>(`${this.apiUrl}/${id}/activate`, {});
  }

  deactivate(id: string): Observable<void> {
    return this.api.put<void>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`, {});
  }
}
