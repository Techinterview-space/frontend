import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export enum CurrencyType {
  Undefined = 0,
  KZT,
  RUB,
  USD,
  EUR,
  KGS,
  SAR,
  AED,
  CAD,
}

export interface CurrencyData {
  value: number;
  currency: CurrencyType;
  currencyString: string;
  pubDate: Date;
}

@Injectable()
export class AdminToolsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/admin-tools/`;
  }

  getCurrencies(): Observable<CurrencyData[]> {
    return this.api.get<CurrencyData[]>(this.apiUrl + "currencies");
  }

  getConfigs(): Observable<object> {
    return this.api.get<object>(this.apiUrl + "configs");
  }
}
