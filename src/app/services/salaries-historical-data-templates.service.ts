import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export interface SalariesHistoricalDataRecordTemplateDto {
  id: string;
  name: string | null;
  professionIds: number[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSalariesHistoricalDataRecordTemplateRequest {
  name: string;
  professionIds: number[];
}

export interface UpdateSalariesHistoricalDataRecordTemplateRequest {
  name: string;
  professionIds: number[];
}

@Injectable()
export class SalariesHistoricalDataTemplatesService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/salaries-historical-data-templates`;
  }

  search(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<SalariesHistoricalDataRecordTemplateDto>> {
    return this.api.get<PaginatedList<SalariesHistoricalDataRecordTemplateDto>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  create(
    body: CreateSalariesHistoricalDataRecordTemplateRequest,
  ): Observable<SalariesHistoricalDataRecordTemplateDto> {
    return this.api.post<SalariesHistoricalDataRecordTemplateDto>(
      `${this.apiUrl}`,
      body,
    );
  }

  update(
    id: string,
    body: UpdateSalariesHistoricalDataRecordTemplateRequest,
  ): Observable<SalariesHistoricalDataRecordTemplateDto> {
    return this.api.post<SalariesHistoricalDataRecordTemplateDto>(
      `${this.apiUrl}/${id}`,
      body,
    );
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`, {});
  }

  deleteAllRecords(id: string): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}/records`, {});
  }
}
