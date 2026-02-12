import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  CreatePublicSurveyRequest,
  MySurveyListItem,
  PublicSurvey,
  PublicSurveyResults,
  PublicSurveyStatus,
  SubmitPublicSurveyResponseRequest,
  UpdatePublicSurveyRequest,
} from "@models/public-survey.model";
import { PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";

@Injectable()
export class PublicSurveysService {
  private readonly apiUrl = `/api/public-surveys/`;

  constructor(private readonly api: ApiService) {}

  create(request: CreatePublicSurveyRequest): Observable<PublicSurvey> {
    return this.api.post<PublicSurvey>(this.apiUrl, request);
  }

  getMySurveys(
    includeDeleted?: boolean,
    status?: PublicSurveyStatus,
  ): Observable<MySurveyListItem[]> {
    const params: Record<string, string> = {};
    if (includeDeleted != null) {
      params["includeDeleted"] = String(includeDeleted);
    }
    if (status != null) {
      params["status"] = String(status);
    }
    const query = new ConvertObjectToHttpParams(params).get();
    return this.api.get<MySurveyListItem[]>(
      this.apiUrl + "my-surveys" + (query ? "?" + query : ""),
    );
  }

  getAllPublic(
    pageParams: PageParams,
  ): Observable<PaginatedList<MySurveyListItem>> {
    return this.api.get<PaginatedList<MySurveyListItem>>(
      this.apiUrl + "all?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  getBySlug(slug: string): Observable<PublicSurvey> {
    return this.api.get<PublicSurvey>(this.apiUrl + slug);
  }

  update(id: string, request: UpdatePublicSurveyRequest): Observable<PublicSurvey> {
    return this.api.patch<PublicSurvey>(this.apiUrl + id, request);
  }

  publish(id: string): Observable<PublicSurvey> {
    return this.api.post<PublicSurvey>(this.apiUrl + id + "/publish", {});
  }

  close(id: string): Observable<PublicSurvey> {
    return this.api.post<PublicSurvey>(this.apiUrl + id + "/close", {});
  }

  reopen(id: string): Observable<PublicSurvey> {
    return this.api.post<PublicSurvey>(this.apiUrl + id + "/reopen", {});
  }

  delete(id: string): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }

  restore(id: string): Observable<PublicSurvey> {
    return this.api.post<PublicSurvey>(this.apiUrl + id + "/restore", {});
  }

  submitResponse(
    slug: string,
    request: SubmitPublicSurveyResponseRequest,
  ): Observable<void> {
    return this.api.post(this.apiUrl + slug + "/responses", request);
  }

  getResults(slug: string): Observable<PublicSurveyResults> {
    return this.api.get<PublicSurveyResults>(this.apiUrl + slug + "/results");
  }
}
