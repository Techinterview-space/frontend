import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DeveloperGrade } from '@models/enums';
import { CompanyType } from '@models/salaries/company-type';
import { Currency } from '@models/salaries/currency';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { PageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';
import { KazakhstanCity } from '@models/salaries/kazakhstan-city';
import { LabelEntityDto } from './label-entity.model';

export interface CreateUserSalaryRequest extends EditUserSalaryRequest {
  value: number;
  quarter: number;
  year: number;
  currency: Currency;
}

export interface EditUserSalaryRequest {
  grade: DeveloperGrade;
  city: KazakhstanCity | null;
  skillId: number | null;
  workIndustryId: number | null;
  professionId: number | null;
  company: CompanyType;
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
  peopleByGradesChartDataForLocal: PeopleByGradesChartData | null;
  peopleByGradesChartDataForRemote: PeopleByGradesChartData | null;
}

export interface PeopleByGradesChartData {
  allCount: number;
  data: Array<{
    grade: DeveloperGrade;
    count: number;
  }>;
}

export interface SalariesByProfessionMoneyBarChartItem {
  profession: number;
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
  profession: number | null;
  company: CompanyType | null;
  grade: DeveloperGrade | null;
  order_type: SalariesAdminOrderingType | null;
}

export interface SalariesChartFilterData {
  grade: DeveloperGrade | null;
  profsInclude: Array<number> | null;
  cities: Array<KazakhstanCity> | null;
}

export interface SalariesAddingTrendAdminChart {
  labels: string[];
  items: Array<{
    count: number,
    startedAt: Date,
  }>;

  salariesPerUser: number;
  usersWhoLeftSalary: number;
  allUsersCount: number;
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

  selectBoxItems(): Observable<{
    skills: LabelEntityDto[],
    industries: LabelEntityDto[],
    professions: LabelEntityDto[]
  }> {
    return this.api.get<{
      skills: LabelEntityDto[],
      industries: LabelEntityDto[],
      professions: LabelEntityDto[]
    }>(this.root + 'select-box-items');
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
