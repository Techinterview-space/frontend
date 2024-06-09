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
import { Subject } from "rxjs";

export class SalariesChart implements SalariesChartResponse {

  private _averageSalary = 0;
  get averageSalary(): number {
    return this._averageSalary;
  }

  private _medianSalary = 0;
  get medianSalary(): number {
    return this._medianSalary;
  }

  private _averageRemoteSalary: number | null = null;
  get averageRemoteSalary(): number | null {
    return this._averageRemoteSalary;
  }

  private _medianRemoteSalary: number | null = null;
  get medianRemoteSalary(): number | null {
    return this._medianRemoteSalary;
  }

  private _localSalariesByGrade: Array<SalariesByGrade> = [];
  get localSalariesByGrade(): Array<SalariesByGrade> {
    return this._localSalariesByGrade;
  }

  private _remoteSalariesByGrade: Array<SalariesByGrade> = [];
  get remoteSalariesByGrade(): Array<SalariesByGrade> {
    return this._remoteSalariesByGrade;
  }

  private _salaries: Array<UserSalary> = [];
  get salaries(): Array<UserSalary> {
    return this._salaries;
  }

  private _salariesByMoneyBarChart: SalariesByMoneyBarChart | null = null;
  get salariesByMoneyBarChart(): SalariesByMoneyBarChart | null {
    return this._salariesByMoneyBarChart;
  }

  private _salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null = null;
  get salariesByMoneyBarChartForRemote(): SalariesByMoneyBarChart | null {
    return this._salariesByMoneyBarChartForRemote;
  }

  private _salariesPerProfessionForLocal: Array<SalariesPerProfession> | null = null;
  get salariesPerProfessionForLocal(): Array<SalariesPerProfession> | null {
    return this._salariesPerProfessionForLocal;
  }

  private _salariesPerProfessionForRemote: Array<SalariesPerProfession> | null = null;
  get salariesPerProfessionForRemote(): Array<SalariesPerProfession> | null {
    return this._salariesPerProfessionForRemote;
  }

  private _currentUserSalary: UserSalaryAdminDto | null = null;
  get currentUserSalary(): UserSalaryAdminDto | null {
    return this._currentUserSalary;
  }

  readonly countOfRecords: number;

  readonly peopleByGradesChartDataForLocal: PeopleByGradesChartData | null;
  readonly peopleByGradesChartDataForRemote: PeopleByGradesChartData | null;

  readonly developersByAgeChartData: DevelopersByCategoryChartData | null;
  readonly developersByExperienceYearsChartData: DevelopersByCategoryChartData | null;

  get hasRemoteSalaries(): boolean {
    return this._salariesPerProfessionForRemote != null && this._salariesPerProfessionForRemote.length > 0
  }

  readonly hasAuthentication: boolean;
  readonly hasRecentSurveyReply: boolean;

  readonly currencies: CurrencyData[];
  currentCurrency: CurrencyData;

  readonly totalCountInStats: number;
  readonly shouldAddOwnSalary: boolean;
  readonly rangeStart: Date;
  readonly rangeEnd: Date;

  public readonly currentCurrencyChanged$: Subject<CurrencyData> = new Subject();

  constructor(
    readonly data: SalariesChartResponse,
    readonly allProfessions: Array<LabelEntityDto>
  ) {

    this.hasAuthentication = data.hasAuthentication;
    this.currencies = data.currencies;
    this.currentCurrency = this.getDefaultCurrency();

    this.hasRecentSurveyReply = data.hasRecentSurveyReply;
    this.totalCountInStats = data.totalCountInStats;
    this.shouldAddOwnSalary = data.shouldAddOwnSalary;
    this.rangeStart = data.rangeStart;
    this.rangeEnd = data.rangeEnd;
    this.countOfRecords = data.totalCountInStats;

    this.developersByAgeChartData = data.developersByAgeChartData;
    this.developersByExperienceYearsChartData = data.developersByExperienceYearsChartData;
    this.peopleByGradesChartDataForLocal = data.peopleByGradesChartDataForLocal;
    this.peopleByGradesChartDataForRemote = data.peopleByGradesChartDataForRemote;

    this.recalculateData(data, allProfessions, this.currentCurrency);
  }

  public setCurrentCurrency(currencyType: CurrencyType): void {
    this.currentCurrency = this.currencies.find((x) => x.currency === currencyType) ?? this.getDefaultCurrency();
    this.recalculateData(this.data, this.allProfessions, this.currentCurrency);
    this.currentCurrencyChanged$.next(this.currentCurrency);
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

  private recalculateData(
    data: SalariesChartResponse,
    allProfessions: Array<LabelEntityDto>,
    currentCurrency: CurrencyData
  ): void {

    this._salaries = data.salaries.map((x) => {
      x.value = x.value / currentCurrency.value;
      return x;
    });

    this._currentUserSalary = data.currentUserSalary;
    if (data.currentUserSalary != null) {
      this._currentUserSalary!.value = data.currentUserSalary.value / currentCurrency.value;
    }

    this._averageSalary = data.averageSalary / currentCurrency.value;
    this._medianSalary = data.averageSalary / currentCurrency.value;

    if (data.localSalariesByGrade != null) {
      this._localSalariesByGrade = data.localSalariesByGrade.map((x) => {
        const result = { ...x };
        result.averageSalary = x.averageSalary != null ? x.averageSalary / currentCurrency.value : null;
        result.medianSalary = x.medianSalary != null ? x.medianSalary / currentCurrency.value : null;
        return result;
      });
    } else {
      this._localSalariesByGrade = [];
    }

    if (data.remoteSalariesByGrade != null) {
      this._remoteSalariesByGrade = data.remoteSalariesByGrade.map((x) => {
        const result = { ...x };
        result.averageSalary = x.averageSalary != null ? x.averageSalary / currentCurrency.value : null;
        result.medianSalary = x.medianSalary != null ? x.medianSalary / currentCurrency.value : null;
        return result;
      });
    } else {
      this._remoteSalariesByGrade = [];
    }

    this._averageRemoteSalary = data.averageRemoteSalary != null
      ? data.averageRemoteSalary / currentCurrency.value
      : null;

    this._medianRemoteSalary = data.medianRemoteSalary != null
      ? data.medianRemoteSalary / currentCurrency.value
      : null;

    this._salariesByMoneyBarChart = data.salariesByMoneyBarChart;
    this._salariesByMoneyBarChartForRemote = data.salariesByMoneyBarChartForRemote;

    const salariesPerProfession = SalariesPerProfession.from(this._salaries, allProfessions);

    this._salariesPerProfessionForLocal = salariesPerProfession.local;
    this._salariesPerProfessionForRemote = salariesPerProfession.remote;
  }
}
