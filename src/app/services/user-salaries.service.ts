import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DeveloperGrade } from '@models/enums';
import { CompanyType } from '@models/salaries/company-type';
import { Currency } from '@models/salaries/currency';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { UserProfession } from '@models/salaries/user-profession';
import { PageParams, defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';

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

  averageRemoteSalary: number | null;
  medianRemoteSalary: number | null;

  salariesByMoneyBarChart: SalariesByMoneyBarChart | null;
  salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null;
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

export interface CreateSalaryRecordResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  createdSalary: UserSalary | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserSalariesService {
  private readonly root = '/api/salaries/';
  constructor(private readonly api: ApiService) {}

  all(pageParams: PageParams = defaultPageParams): Observable<PaginatedList<UserSalaryAdminDto>> {
    return this.api.get<PaginatedList<UserSalaryAdminDto>>(this.root + 'all?' + new ConvertObjectToHttpParams(pageParams).get());
  }

  charts(): Observable<SalariesChartResponse> {
    return this.api.get<SalariesChartResponse>(this.root + 'chart');
  }

  create(data: CreateUserSalaryRequest): Observable<CreateSalaryRecordResponse> {
    return this.api.post<CreateSalaryRecordResponse>(this.root, data);
  }

  delete(dataId: string): Observable<void> {
    return this.api.delete<void>(this.root + dataId);
  }
}
