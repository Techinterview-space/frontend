import { Injectable } from "@angular/core";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { CurrencyType } from "./admin-tools.service";

export interface CurrencyRecord {
  id: string;
  currencyDate: string;
  currencies: Record<string, number>; // JSON object with currency data (e.g., { "USD": 450.5, "EUR": 490.25 })
  createdAt: string;
  updatedAt: string;
}

export interface CreateCurrencyRecordRequest {
  currency: CurrencyType;
  value: number;
  currencyDate: string;
}

export interface CurrencyItemDto {
  currency: CurrencyType;
  value: number;
}

export interface WeeklyCurrencyChartData {
  weekStartDate: string;
  weekEndDate: string;
  averageCurrencies: CurrencyItemDto[];
}

export interface CurrencyChartResponse {
  weeklyData: WeeklyCurrencyChartData[];
  fromDate: string;
  toDate: string;
}

@Injectable({
  providedIn: "root",
})
export class CurrenciesCollectionService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/currencies/`;
  }

  getAll(
    pageParams: PageParams = defaultPageParams,
  ): Observable<PaginatedList<CurrencyRecord>> {
    return this.api.get<PaginatedList<CurrencyRecord>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(pageParams).get(),
    );
  }

  create(data: CreateCurrencyRecordRequest): Observable<CurrencyRecord> {
    return this.api.post<CurrencyRecord>(this.apiUrl, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(this.apiUrl + id);
  }

  getChartData(): Observable<CurrencyChartResponse> {
    return this.api.get<CurrencyChartResponse>(this.apiUrl + "chart");
  }
}

