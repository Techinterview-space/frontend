import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DeveloperGrade } from '@models/enums';
import { CompanyType } from '@models/salaries/company-type';
import { Currency } from '@models/salaries/currency';
import { UserSalary } from '@models/salaries/salary.model';
import { UserProfession } from '@models/salaries/user-profession';

export interface CreateUserSalaryRequest {
  value: number;
  quarter: number;
  year: number;
  currency: Currency;
  company: CompanyType;
  grade: DeveloperGrade | null;
  profession: UserProfession;
}

export interface SalariesChartResponse {
  salaries: UserSalary[];
  shouldAddOwnSalary: boolean;
  rangeStart: Date;
  rangeEnd: Date;
  averageSalary: number;
  medianSalary: number;
  salariesByProfession: SalariesByProfession[];
  salariesByMoneyBarChart: SalariesByMoneyBarChart | null;
}

export interface SalariesByProfession {
  profession: UserProfession;
  salaries: UserSalary[];
}

export interface SalariesByProfessionMoneyBarChartItem {
  profession: UserProfession;
  items: Array<SalariesByMoneyBarChartItem>;
}

export interface SalariesByMoneyBarChart {
  labels: string[];
  items: Array<SalariesByMoneyBarChartItem>;
  itemsByProfession: Array<SalariesByProfessionMoneyBarChartItem>;
}

export interface SalariesByMoneyBarChartItem {
  start: number;
  end: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserSalariesService {
  private readonly root = '/api/salaries/';
  constructor(private readonly api: ApiService) {}

  all(): Observable<Array<UserSalary>> {
    // for admis
    return this.api.get<UserSalary[]>(this.root + 'all');
  }

  charts(): Observable<SalariesChartResponse> {
    // for admis
    return this.api.get<SalariesChartResponse>(this.root + 'chart');
  }

  create(data: CreateUserSalaryRequest): Observable<UserSalary> {
    return this.api.post<UserSalary>(this.root, data);
  }
}
