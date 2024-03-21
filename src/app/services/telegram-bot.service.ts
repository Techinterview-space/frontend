import { Injectable } from '@angular/core';
import { ApplicationUser } from '@models/application-user';
import { defaultPageParams, PageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TelegramBotUsage } from '@models/telegram';

@Injectable()
export class TelegramBotService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/telegram-bot/`;
  }

  botUsages(pageParams: PageParams = defaultPageParams): Observable<PaginatedList<TelegramBotUsage>> {
    return this.api.get<PaginatedList<TelegramBotUsage>>(
      this.apiUrl + 'bot-usages' + '?' + new ConvertObjectToHttpParams(pageParams).get()
    );
  }
}
