import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  InterviewTemplate,
  InterviewTemplateSubject,
} from "@models/interview-models";
import { PaginatedList } from "@models/paginated-list";
import { defaultPageParams, PageParams } from "@models/page-params";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Label } from "@models/user-label.model";

export interface InterviewTemplateCreateRequest {
  title: string;
  overallOpinion: string | null;
  isPublic: boolean;
  organizationId: string | null;
  subjects: Array<InterviewTemplateSubject>;
  labels: Array<Label>;
}

export interface InterviewTemplateUpdateRequest
  extends InterviewTemplateCreateRequest {
  id: string;
}

@Injectable()
export class InterviewTemplatesService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/interview-templates/`;
  }

  byId(id: string): Observable<InterviewTemplate> {
    return this.api.get<InterviewTemplate>(this.apiUrl + id);
  }

  update(model: InterviewTemplateUpdateRequest): Observable<void> {
    return this.api.put(this.apiUrl, model);
  }

  create(model: InterviewTemplateCreateRequest): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  delete(id: string): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }

  all(
    pageParams: PageParams = defaultPageParams
  ): Observable<PaginatedList<InterviewTemplate>> {
    const params = new ConvertObjectToHttpParams(pageParams).get();
    return this.api.get<PaginatedList<InterviewTemplate>>(
      this.apiUrl + `?${params}`
    );
  }

  public(
    pageParams: PageParams = defaultPageParams
  ): Observable<PaginatedList<InterviewTemplate>> {
    const params = new ConvertObjectToHttpParams(pageParams).get();
    return this.api.get<PaginatedList<InterviewTemplate>>(
      this.apiUrl + `public?${params}`
    );
  }

  my(): Observable<Array<InterviewTemplate>> {
    return this.api.get<Array<InterviewTemplate>>(this.apiUrl + "my");
  }

  availableForInterview(): Observable<Array<InterviewTemplate>> {
    return this.api.get<Array<InterviewTemplate>>(
      this.apiUrl + "available-for-interview"
    );
  }
}
