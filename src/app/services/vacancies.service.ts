import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  Vacancy,
  VacancyListItem,
  VacancyStatus,
} from "@models/vacancy.model";
import { PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";

export type VacanciesSearchParams = PageParams & {
  searchQuery?: string;
};

export type MyVacanciesSearchParams = PageParams & {
  searchQuery?: string;
  status?: VacancyStatus | null;
  deleted?: boolean;
};

export type AdminVacanciesSearchParams = MyVacanciesSearchParams;

export type MyVacanciesResponse = PaginatedList<VacancyListItem> & {
  hasAnyVacancy: boolean;
};

export interface VacancyEditRequest {
  title: string;
  companyId: string | null;
  companyName: string | null;
  hideAttachedCompany: boolean;
  hrContact: string | null;
  description: string | null;
  status: VacancyStatus;
}

@Injectable()
export class VacanciesService {
  private readonly apiUrl: string = "/api/vacancies";
  private readonly adminApiUrl: string = "/api/admin/vacancies";

  constructor(private readonly api: ApiService) {}

  search(
    params: VacanciesSearchParams,
  ): Observable<PaginatedList<VacancyListItem>> {
    return this.api.get<PaginatedList<VacancyListItem>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(params).get(),
    );
  }

  byId(id: string): Observable<Vacancy> {
    return this.api.get<Vacancy>(this.apiUrl + "/" + id);
  }

  my(params: MyVacanciesSearchParams): Observable<MyVacanciesResponse> {
    return this.api.get<MyVacanciesResponse>(
      this.apiUrl + "/my?" + new ConvertObjectToHttpParams(params).get(),
    );
  }

  create(request: VacancyEditRequest): Observable<Vacancy> {
    return this.api.post<Vacancy>(this.apiUrl, request);
  }

  update(id: string, request: VacancyEditRequest): Observable<void> {
    return this.api.patch<void>(this.apiUrl + "/" + id, request);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(this.apiUrl + "/" + id);
  }

  searchForAdmin(
    params: AdminVacanciesSearchParams,
  ): Observable<PaginatedList<VacancyListItem>> {
    return this.api.get<PaginatedList<VacancyListItem>>(
      this.adminApiUrl + "?" + new ConvertObjectToHttpParams(params).get(),
    );
  }

  changeStatusByAdmin(id: string, status: VacancyStatus): Observable<void> {
    return this.api.post<void>(this.adminApiUrl + "/" + id + "/status", {
      status,
    });
  }

  restoreByAdmin(id: string): Observable<void> {
    return this.api.post<void>(this.adminApiUrl + "/" + id + "/restore", {});
  }
}
