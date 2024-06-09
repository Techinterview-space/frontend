import { formatNumber } from "@angular/common";
import {
  DevelopersByCategoryChartData,
  PeopleByGradesChartData,
  SalariesByGrade,
  SalariesByMoneyBarChart,
  SalariesChartResponse,
} from "@services/user-salaries.service";
import { SalariesPerProfession } from "../salaries-per-profession";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { LabelEntityDto } from "@services/label-entity.model";
import { CurrencyData, CurrencyType } from "@services/admin-tools.service";

export class SalariesChart implements SalariesChartResponse {

  readonly averageSalary: number;
  readonly medianSalary: number;

  readonly averageRemoteSalary: number | null;
  readonly medianRemoteSalary: number | null;

  readonly localSalariesByGrade: Array<SalariesByGrade>;
  readonly remoteSalariesByGrade: Array<SalariesByGrade>;

  readonly countOfRecords: number;
  readonly salaries: Array<UserSalary>;

  readonly salariesByMoneyBarChart: SalariesByMoneyBarChart | null;
  readonly salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null;

  readonly salariesPerProfessionForLocal: Array<SalariesPerProfession> | null;
  readonly salariesPerProfessionForRemote: Array<SalariesPerProfession> | null;

  readonly currentUserSalary: UserSalaryAdminDto | null = null;

  readonly peopleByGradesChartDataForLocal: PeopleByGradesChartData | null;
  readonly peopleByGradesChartDataForRemote: PeopleByGradesChartData | null;

  readonly developersByAgeChartData: DevelopersByCategoryChartData | null;
  readonly developersByExperienceYearsChartData: DevelopersByCategoryChartData | null;

  readonly hasRemoteSalaries: boolean;
  readonly hasAuthentication: boolean;
  readonly hasRecentSurveyReply: boolean;

  readonly currencies: CurrencyData[];
  currentCurrency: CurrencyData;

  readonly totalCountInStats: number;
  readonly shouldAddOwnSalary: boolean;
  readonly rangeStart: Date;
  readonly rangeEnd: Date;

  constructor(
    readonly data: SalariesChartResponse,
    readonly allProfessions: Array<LabelEntityDto>
  ) {

    this.currencies = data.currencies;
    this.currentCurrency = this.getDefaultCurrency();

    this.hasRecentSurveyReply = data.hasRecentSurveyReply;

    this.averageSalary = data.averageSalary;
    this.medianSalary = data.averageSalary;

    this.localSalariesByGrade = data.localSalariesByGrade ?? [];
    this.remoteSalariesByGrade = data.remoteSalariesByGrade ?? [];

    this.averageRemoteSalary = data.averageRemoteSalary;
    this.medianRemoteSalary = data.medianRemoteSalary;

    this.countOfRecords = data.totalCountInStats;
    this.salaries = data.salaries;

    this.salariesByMoneyBarChart = data.salariesByMoneyBarChart;
    this.salariesByMoneyBarChartForRemote =
      data.salariesByMoneyBarChartForRemote;

    const salariesPerProfession = SalariesPerProfession.from(
      data.salaries,
      allProfessions
    );

    this.salariesPerProfessionForLocal = salariesPerProfession.local;
    this.salariesPerProfessionForRemote = salariesPerProfession.remote;
    this.hasRemoteSalaries = this.salariesPerProfessionForRemote.length > 0;
    this.hasAuthentication = data.hasAuthentication;

    this.currentUserSalary = data.currentUserSalary;

    this.peopleByGradesChartDataForLocal = data.peopleByGradesChartDataForLocal;
    this.peopleByGradesChartDataForRemote =
      data.peopleByGradesChartDataForRemote;

    this.developersByAgeChartData = data.developersByAgeChartData;
    this.developersByExperienceYearsChartData =
      data.developersByExperienceYearsChartData;

    this.totalCountInStats = data.totalCountInStats;
    this.shouldAddOwnSalary = data.shouldAddOwnSalary;
    this.rangeStart = data.rangeStart;
    this.rangeEnd = data.rangeEnd;
  }

  public setCurrentCurrency(currencyType: CurrencyType): void {
    this.currentCurrency = this.currencies.find((x) => x.currency === currencyType) ?? this.getDefaultCurrency();
  }

  private getDefaultCurrency(): CurrencyData {
    return this.currencies.find((x) => x.currency === CurrencyType.KZT)
    ?? {
      value: 1,
      currency: CurrencyType.KZT,
      currencyString: "тг",
      pubDate: new Date(),
    };
  }
}
