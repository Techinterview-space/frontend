import { Injectable } from "@angular/core";
import { ApplicationUser } from "@models/application-user";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export enum UsefulnessReplyType {
    Undefined = 0,
    Yes = 1,
    No = 2,
    NotSure = 3,
}

export enum ExpectationReplyType {
    Undefined = 0,
    Expected = 1,
    ExpectedHigher = 2,
    ExpectedLower = 3,
}

export interface SalariesStatSurveyData {
    usefulnessReply: UsefulnessReplyType;
    expectationReply: ExpectationReplyType;
}

export interface SalariesStatSurveyReply extends SalariesStatSurveyData {
    id: string;
    createdAt: Date;
}

@Injectable()
export class SurveyService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/survey/`;
  }

  salariesSatGapeReply(data: SalariesStatSurveyData): Observable<SalariesStatSurveyReply> {
    return this.api.post<SalariesStatSurveyReply>(this.apiUrl + 'salaries-stat-page-reply', data);
  }
}
