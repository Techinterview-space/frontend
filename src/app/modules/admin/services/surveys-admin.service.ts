import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "@services/api.service";

export interface SurveyReplyAdminDto {
  id: string;
  usefulnessRating: number;
  createdByUserId: number | null;
  createdByUserEmail: string | null;
  createdAt: string;
}

@Injectable({
  providedIn: "root",
})
export class SurveysAdminService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/survey/admin/`;
  }

  getAll(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<SurveyReplyAdminDto>> {
    return this.api.get<PaginatedList<SurveyReplyAdminDto>>(
      this.apiUrl + "all?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }
}
