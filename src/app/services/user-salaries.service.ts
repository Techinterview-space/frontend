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
import { KazakhstanCity } from '@models/salaries/kazakhstan-city';
import { NumberExtended } from '@shared/value-objects';

export interface CreateUserSalaryRequest extends EditUserSalaryRequest {
  value: number;
  quarter: number;
  year: number;
  currency: Currency;
  company: CompanyType;
}

export interface EditUserSalaryRequest {
  grade: DeveloperGrade;
  profession: UserProfession;
  city: KazakhstanCity | null;
  skillId: number | null;
}

export interface SalariesChartResponse {
  salaries: UserSalary[];
  totalCountInStats: number;
  shouldAddOwnSalary: boolean;
  rangeStart: Date;
  rangeEnd: Date;
  averageSalary: number;
  medianSalary: number;

  averageRemoteSalary: number | null;
  medianRemoteSalary: number | null;

  salariesByMoneyBarChart: SalariesByMoneyBarChart | null;
  salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null;

  currentUserSalary: UserSalaryAdminDto | null;
}

export interface SalariesByProfessionMoneyBarChartItem {
  profession: UserProfession;
  items: Array<number>;
}

export interface SalariesByMoneyBarChart {
  labels: string[];
  items: Array<number>;
  itemsByProfession: Array<SalariesByProfessionMoneyBarChartItem>;
}

export interface CreateSalaryRecordResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  createdSalary: UserSalary | null;
}

export interface AdminAllSalariesQueryParams extends PageParams {
  page: number;
  pageSize: number;
  profession: UserProfession | null;
  company: CompanyType | null;
  grade: DeveloperGrade | null;
  order_type: SalariesAdminOrderingType | null;
}

export interface SalariesChartFilterData {
  grade: DeveloperGrade | null;
  profsInclude: Array<UserProfession> | null;
  cities: Array<KazakhstanCity> | null;
}

export interface SalariesAddingTrendAdminChart {
  labels: string[];
  items: Array<{
    count: number,
    startedAt: Date,
  }>;

  salariesPerUser: number;
}

export enum SalariesAdminOrderingType {
  Undefined = 0,
  CreatedAtAsc = 1,
  CreatedAtDesc = 2,
  ValueAsc = 3,
  ValueDesc = 4,
}

@Injectable({
  providedIn: 'root'
})
export class UserSalariesService {
  private readonly root = '/api/salaries/';
  constructor(private readonly api: ApiService) {}

  all(pageParams: AdminAllSalariesQueryParams): Observable<PaginatedList<UserSalaryAdminDto>> {
    return this.api.get<PaginatedList<UserSalaryAdminDto>>(
      this.root + 'all?' + new ConvertObjectToHttpParams(pageParams).get());
  }

  salariesNotInStats(pageParams: AdminAllSalariesQueryParams): Observable<PaginatedList<UserSalaryAdminDto>> {
    return this.api.get<PaginatedList<UserSalaryAdminDto>>(
      this.root + 'not-in-stats?' + new ConvertObjectToHttpParams(pageParams).get());
  }

  addingSalariesaTrendAdminChart(): Observable<SalariesAddingTrendAdminChart> {
    return this.api.get<SalariesAddingTrendAdminChart>(this.root + 'salaries-adding-trend-chart');
  }

  charts(filters: SalariesChartFilterData): Observable<SalariesChartResponse> {
    return this.api.get<SalariesChartResponse>(
      this.root + 'chart?' + new ConvertObjectToHttpParams(filters).get());
  }

  create(data: CreateUserSalaryRequest): Observable<CreateSalaryRecordResponse> {
    return this.api.post<CreateSalaryRecordResponse>(this.root, data);
  }

  update(id: string, data: EditUserSalaryRequest): Observable<CreateSalaryRecordResponse> {
    return this.api.post<CreateSalaryRecordResponse>(this.root + id, data);
  }

  approve(dataId: string): Observable<void> {
    return this.api.post<void>(this.root + dataId + '/approve', {});
  }

  excludeFromStats(dataId: string): Observable<void> {
    return this.api.post<void>(this.root + dataId + '/exclude-from-stats', {});
  }

  delete(dataId: string): Observable<void> {
    return this.api.delete<void>(this.root + dataId);
  }
}
