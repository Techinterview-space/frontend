import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { HistoricalSurveyChartResponse } from "./historical-charts.models";

export interface MedianLocalSalaryByGrade {
  Undefined?: number;
  Trainee?: number;
  Junior?: number;
  Middle?: number;
  Senior?: number;
  Lead?: number;
}

export interface HistoricalDataPoint {
  date: Date;
  medianLocalSalary: number;
  averageLocalSalary: number;
  minLocalSalary: number | null;
  maxLocalSalary: number | null;
  totalSalaryCount: number;
  medianLocalSalaryByGrade: MedianLocalSalaryByGrade | null;
}

export interface HistoricalDataByTemplate {
  templateId: string;
  name: string | null;
  professionIds: number[] | null;
  dataPoints: HistoricalDataPoint[] | null;
}

export interface GetSalariesHistoricalChartResponse {
  templates: HistoricalDataByTemplate[] | null;
  from: Date;
  to: Date;
}

export interface SalariesChartFilterData {
  from?: Date | null;
  to?: Date | null;
}

@Injectable()
export class HistoricalChartsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/historical-charts/`;
  }

  salariesChart(
    params?: SalariesChartFilterData,
  ): Observable<GetSalariesHistoricalChartResponse> {
    const queryString = params
      ? new ConvertObjectToHttpParams(params).get()
      : "";
    const url = queryString
      ? this.apiUrl + "salaries?" + queryString
      : this.apiUrl + "salaries";
    return this.api.get<GetSalariesHistoricalChartResponse>(url);
  }

  surveyChart(
    params: SalariesChartFilterData,
  ): Observable<HistoricalSurveyChartResponse> {
    const queryString = params
      ? new ConvertObjectToHttpParams(params).get()
      : "";
    const url = queryString
      ? this.apiUrl + "survey?" + queryString
      : this.apiUrl + "survey";
    return this.api.get<HistoricalSurveyChartResponse>(url);
  }
}
