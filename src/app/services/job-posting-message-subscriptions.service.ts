import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { JobPostingMessageSubscription } from "@models/telegram";

export interface CreateJobPostingMessageSubscriptionBody {
  telegramChatId: number;
  name: string;
  professionIds: Array<number>;
}

@Injectable()
export class JobPostingMessageSubscriptionsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/job-posting-message-subscriptions`;
  }

  search(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<JobPostingMessageSubscription>> {
    return this.api.get<PaginatedList<JobPostingMessageSubscription>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  create(
    body: CreateJobPostingMessageSubscriptionBody,
  ): Observable<JobPostingMessageSubscription> {
    return this.api.post<JobPostingMessageSubscription>(`${this.apiUrl}`, body);
  }

  activate(id: string): Observable<void> {
    return this.api.post<void>(`${this.apiUrl}/${id}/activate`, {});
  }

  deactivate(id: string): Observable<void> {
    return this.api.post<void>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`, {});
  }
}
