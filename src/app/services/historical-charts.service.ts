import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { DeveloperGrade } from "@models/enums";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { HistoricalSurveyChartResponse } from "./historical-charts.models";

export interface SalariesCountWeekByWeekChartItem {
  totalCount: number;
  localMedian: number;
  localAverage: number;
  remoteMedian: number;
  remoteAverage: number;
}

export interface SalariesCountWeekByWeekChartGradeItem
  extends SalariesCountWeekByWeekChartItem {
  grade: DeveloperGrade;
}

export interface SalariesCountWeekByWeekChart {
  weekEnds: Array<Date>;
  totalCountItems: Array<SalariesCountWeekByWeekChartItem>;
  gradeItems: Array<SalariesCountWeekByWeekChartGradeItem>;
  hasGradeItems: boolean;
}

export interface GetSalariesHistoricalChartResponse {
  from: Date;
  to: Date;
  chartFrom: Date;
  chartTo: Date;

  hasAuthentication: boolean;
  shouldAddOwnSalary: boolean;

  salariesCountWeekByWeekChart: SalariesCountWeekByWeekChart | null;
}

export interface SalariesChartFilterData {
  grade: DeveloperGrade | null;
  profsInclude: Array<number> | null;
  cities: Array<KazakhstanCity> | null;
  skills: Array<number> | null;
}

@Injectable()
export class HistoricalChartsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/historical-charts/`;
  }

  salariesChart(
    params: SalariesChartFilterData
  ): Observable<GetSalariesHistoricalChartResponse> {
    return this.api.get<GetSalariesHistoricalChartResponse>(
      this.apiUrl + "salaries?" + new ConvertObjectToHttpParams(params).get()
    );
  }

  surveyChart(
    params: SalariesChartFilterData
  ): Observable<HistoricalSurveyChartResponse> {
    return this.api.get<HistoricalSurveyChartResponse>(
      this.apiUrl + "survey?" + new ConvertObjectToHttpParams(params).get()
    );
  }
}
