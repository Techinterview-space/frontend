import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  JobPostingMessageSubscription,
  SubscriptionRegularityType,
} from "@models/telegram";
import { OpenAiAnalysis, OpenAiReport } from "@models/open-ai.model";

export interface CreateJobPostingMessageSubscriptionBody
  extends EditJobPostingMessageSubscriptionBody {
  telegramChatId: number;
}

export interface EditJobPostingMessageSubscriptionBody {
  name: string;
  useAiAnalysis: boolean;
  regularity: SubscriptionRegularityType;
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

  update(
    id: string,
    body: EditJobPostingMessageSubscriptionBody,
  ): Observable<JobPostingMessageSubscription> {
    return this.api.post<JobPostingMessageSubscription>(
      `${this.apiUrl}/${id}`,
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

  getOpenAiAnalysis(id: string): Observable<OpenAiAnalysis> {
    return this.api.get<OpenAiAnalysis>(
      `${this.apiUrl}/${id}/open-ai-analysis`,
    );
  }

  getOpenAiReport(id: string): Observable<OpenAiReport> {
    return this.api.get<OpenAiReport>(`${this.apiUrl}/${id}/open-ai-report`);
  }

  sendUpdates(id: string): Observable<void> {
    return this.api.post<void>(`${this.apiUrl}/${id}/send-updates`, {});
  }
}