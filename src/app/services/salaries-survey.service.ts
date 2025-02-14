import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export interface SalariesStatSurveyReply {
  id: string;
  createdAt: Date;
  usefulnessRating: number;
}

export interface SalariesSurveyStatDataItem {
  countOfReplies: number;
  partitionInPercent: number;
}

export interface SalariesSurveyReplyDataItem {
  ratingValue: number;
  data: SalariesSurveyStatDataItem;
}

export interface SalariesSurveyStatData {
  countOfRecords: number;
  usefulnessData: Array<SalariesSurveyReplyDataItem>;
  expectationData: Array<SalariesSurveyReplyDataItem>;
}

export interface GetUserSalariesSurveyDataResponse {
  hasRecentSurveyReply: boolean;
  lastSurveyReplyDate: Date | null;
}

@Injectable()
export class SurveyService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/survey/`;
  }

  getUserSalariesSurveyDataResponse(): Observable<GetUserSalariesSurveyDataResponse> {
    return this.api.get<GetUserSalariesSurveyDataResponse>(
      this.apiUrl + "salaries-user-stat-data",
    );
  }

  salariesSatGapeReply(
    usefulnessRating: number,
  ): Observable<SalariesStatSurveyReply> {
    return this.api.post<SalariesStatSurveyReply>(
      this.apiUrl + "salaries-stat-page-reply",
      {
        usefulnessRating: usefulnessRating,
      },
    );
  }

  getSalariesStatSurveyData(): Observable<SalariesSurveyStatData> {
    return this.api.get<SalariesSurveyStatData>(this.apiUrl + "salaries-stats");
  }
}
