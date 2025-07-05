import { formatNumber } from "@angular/common";
import {
  DevelopersByCategoryChartData,
  PeopleByGradesChartData,
  SalariesByAgeOrExperienceChart,
  SalariesByCityChart,
  SalariesByGenderChart,
  SalariesByGrade,
  SalariesByMoneyBarChart,
  SalariesChartResponse,
  SalariesSkillsChartData,
  WorkIndustriesChartData,
  CitiesDoughnutChartData,
  GradesMinMaxChartData,
  ProfessionsDistributionChartData,
  PeopleByGenderChartData,
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

  private _salariesByMoneyBarChart: SalariesByMoneyBarChart | null = null;
  get salariesByMoneyBarChart(): SalariesByMoneyBarChart | null {
    return this._salariesByMoneyBarChart;
  }

  private _salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null =
    null;
  get salariesByMoneyBarChartForRemote(): SalariesByMoneyBarChart | null {
    return this._salariesByMoneyBarChartForRemote;
  }

  private _currentUserSalary: UserSalaryAdminDto | null = null;
  get currentUserSalary(): UserSalaryAdminDto | null {
    return this._currentUserSalary;
  }

  private _salariesByExperienceChartForLocalSalaries: SalariesByAgeOrExperienceChart | null =
    null;
  get salariesByExperienceChartForLocalSalaries(): SalariesByAgeOrExperienceChart | null {
    return this._salariesByExperienceChartForLocalSalaries;
  }

  private _salariesByExperienceChartForRemoteSalaries: SalariesByAgeOrExperienceChart | null =
    null;
  get salariesByExperienceChartForRemoteSalaries(): SalariesByAgeOrExperienceChart | null {
    return this._salariesByExperienceChartForRemoteSalaries;
  }

  private _salariesByUserAgeChartForLocalSalaries: SalariesByAgeOrExperienceChart | null =
    null;
  get salariesByUserAgeChartForLocalSalaries(): SalariesByAgeOrExperienceChart | null {
    return this._salariesByUserAgeChartForLocalSalaries;
  }

  private _salariesByUserAgeChartForRemoteSalaries: SalariesByAgeOrExperienceChart | null =
    null;
  get salariesByUserAgeChartForRemoteSalaries(): SalariesByAgeOrExperienceChart | null {
    return this._salariesByUserAgeChartForRemoteSalaries;
  }

  private _salariesByCityChartForLocal: SalariesByCityChart | null = null;
  get salariesByCityChartForLocal(): SalariesByCityChart | null {
    return this._salariesByCityChartForLocal;
  }

  private _salariesByCityChartForRemote: SalariesByCityChart | null = null;
  get salariesByCityChartForRemote(): SalariesByCityChart | null {
    return this._salariesByCityChartForRemote;
  }

  private _salariesByGenderChartForLocal: SalariesByGenderChart | null = null;
  get salariesByGenderChartForLocal(): SalariesByGenderChart | null {
    return this._salariesByGenderChartForLocal;
  }

  private _salariesByGenderChartForRemote: SalariesByGenderChart | null = null;
  get salariesByGenderChartForRemote(): SalariesByGenderChart | null {
    return this._salariesByGenderChartForRemote;
  }

  readonly salariesSkillsChartData: SalariesSkillsChartData | null;
  readonly workIndustriesChartData: WorkIndustriesChartData | null;
  readonly citiesDoughnutChartData: CitiesDoughnutChartData | null;

  readonly gradesMinMaxChartData: GradesMinMaxChartData | null;
  readonly professionsDistributionChartData: ProfessionsDistributionChartData | null;
  readonly peopleByGenderChartData: PeopleByGenderChartData | null;

  readonly countOfRecords: number;

  readonly peopleByGradesChartDataForLocal: PeopleByGradesChartData | null;
  readonly peopleByGradesChartDataForRemote: PeopleByGradesChartData | null;

  readonly developersByAgeChartData: DevelopersByCategoryChartData | null;
  readonly developersByExperienceYearsChartData: DevelopersByCategoryChartData | null;

  readonly hasAuthentication: boolean;
  readonly hasRecentSurveyReply: boolean;

  readonly currencies: CurrencyData[];
  currentCurrency: CurrencyData;

  readonly totalCountInStats: number;
  readonly shouldAddOwnSalary: boolean;
  readonly rangeStart: Date;
  readonly rangeEnd: Date;

  readonly hasRemoteSalaries: boolean;

  public readonly currentCurrencyChanged$: Subject<CurrencyData> =
    new Subject();

  constructor(
    readonly data: SalariesChartResponse,
    readonly allProfessions: Array<LabelEntityDto>,
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
    this.developersByExperienceYearsChartData =
      data.developersByExperienceYearsChartData;
    this.peopleByGradesChartDataForLocal = data.peopleByGradesChartDataForLocal;
    this.peopleByGradesChartDataForRemote =
      data.peopleByGradesChartDataForRemote;

    this._salariesByExperienceChartForLocalSalaries =
      data.salariesByExperienceChartForLocalSalaries;
    this._salariesByExperienceChartForRemoteSalaries =
      data.salariesByExperienceChartForRemoteSalaries;
    this._salariesByUserAgeChartForLocalSalaries =
      data.salariesByUserAgeChartForLocalSalaries;
    this._salariesByUserAgeChartForRemoteSalaries =
      data.salariesByUserAgeChartForRemoteSalaries;

    this._salariesByCityChartForLocal = data.salariesByCityChartForLocal;
    this._salariesByCityChartForRemote = data.salariesByCityChartForRemote;

    this._salariesByGenderChartForLocal = data.salariesByGenderChartForLocal;
    this._salariesByGenderChartForRemote = data.salariesByGenderChartForRemote;

    this.salariesSkillsChartData = data.salariesSkillsChartData;
    this.workIndustriesChartData = data.workIndustriesChartData;
    this.citiesDoughnutChartData = data.citiesDoughnutChartData;

    this.gradesMinMaxChartData = data.gradesMinMaxChartData;
    this.professionsDistributionChartData =
      data.professionsDistributionChartData;
    this.peopleByGenderChartData = data.peopleByGenderChartData;

    this.recalculateData(data, allProfessions, this.currentCurrency);

    this.hasRemoteSalaries =
      data.salariesByMoneyBarChartForRemote != null &&
      data.salariesByMoneyBarChartForRemote.items.length > 0;
  }

  public setCurrentCurrency(currencyType: CurrencyType): void {
    this.currentCurrency =
      this.currencies.find((x) => x.currency === currencyType) ??
      this.getDefaultCurrency();
    this.recalculateData(this.data, this.allProfessions, this.currentCurrency);
    this.currentCurrencyChanged$.next(this.currentCurrency);
  }

  public getCurrentCurrencyLabel(): string {
    if (this.currentCurrency.currency === CurrencyType.KZT) {
      return "тг";
    }

    if (this.currentCurrency.currency === CurrencyType.USD) {
      return "usd";
    }

    return this.currentCurrency.currencyString;
  }

  private getDefaultCurrency(): CurrencyData {
    return (
      this.currencies.find((x) => x.currency === CurrencyType.KZT) ?? {
        value: 1,
        currency: CurrencyType.KZT,
        currencyString: "тг",
        pubDate: new Date(),
      }
    );
  }

  private recalculateData(
    data: SalariesChartResponse,
    allProfessions: Array<LabelEntityDto>,
    currentCurrency: CurrencyData,
  ): void {
    this._currentUserSalary = data.currentUserSalary;
    if (data.currentUserSalary != null) {
      this._currentUserSalary = { ...data.currentUserSalary };
      this._currentUserSalary!.value =
        data.currentUserSalary.value / currentCurrency.value;
    }

    this._averageSalary = data.averageSalary / currentCurrency.value;
    this._medianSalary = data.medianSalary / currentCurrency.value;

    if (data.localSalariesByGrade != null) {
      this._localSalariesByGrade = data.localSalariesByGrade.map((x) => {
        const result = { ...x };
        result.averageSalary =
          x.averageSalary != null
            ? x.averageSalary / currentCurrency.value
            : null;
        result.medianSalary =
          x.medianSalary != null
            ? x.medianSalary / currentCurrency.value
            : null;
        return result;
      });
    } else {
      this._localSalariesByGrade = [];
    }

    if (data.remoteSalariesByGrade != null) {
      this._remoteSalariesByGrade = data.remoteSalariesByGrade.map((x) => {
        const result = { ...x };
        result.averageSalary =
          x.averageSalary != null
            ? x.averageSalary / currentCurrency.value
            : null;
        result.medianSalary =
          x.medianSalary != null
            ? x.medianSalary / currentCurrency.value
            : null;
        return result;
      });
    } else {
      this._remoteSalariesByGrade = [];
    }

    this._averageRemoteSalary =
      data.averageRemoteSalary != null
        ? data.averageRemoteSalary / currentCurrency.value
        : null;

    this._medianRemoteSalary =
      data.medianRemoteSalary != null
        ? data.medianRemoteSalary / currentCurrency.value
        : null;

    this._salariesByMoneyBarChart = data.salariesByMoneyBarChart;
    this._salariesByMoneyBarChartForRemote =
      data.salariesByMoneyBarChartForRemote;
  }
}
