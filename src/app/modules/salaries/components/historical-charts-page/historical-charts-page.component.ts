import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import {
  GetSalariesHistoricalChartResponse,
  HistoricalChartsService,
} from "@services/historical-charts.service";
import { SalariesChartActivatedRoute } from "../shared/salaries-activated-route";
import { SalaryChartGlobalFiltersData } from "../shared/global-filters-form-group";
import { UserSalariesService } from "@services/user-salaries.service";
import { LabelEntityDto } from "@services/label-entity.model";
import { DeveloperGrade } from "@models/enums";
import {
  ApiBackendAbsoluteUrl,
  ClipboardCopier,
} from "@shared/value-objects/clipboard-copier";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { HistoricalSurveyChartResponse } from "@services/historical-charts.models";

@Component({
  templateUrl: "./historical-charts-page.component.html",
  styleUrls: ["./historical-charts-page.component.scss"],
})
export class HistoricalChartsPageComponent implements OnInit, OnDestroy {
  readonly activatedRoute: SalariesChartActivatedRoute;

  data: GetSalariesHistoricalChartResponse | null = null;
  surveyData: HistoricalSurveyChartResponse | null = null;

  filterData = new SalaryChartGlobalFiltersData();
  isAuthenticated = false;
  shouldAddOwnSalary = false;

  skills: Array<LabelEntityDto> = [];
  industries: Array<LabelEntityDto> = [];
  professions: Array<LabelEntityDto> = [];
  private initialLoading = true;

  constructor(
    private readonly service: HistoricalChartsService,
    private readonly salariesService: UserSalariesService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly titleService: TitleService,
    private readonly gtag: GoogleAnalyticsService,
    activatedRouteSource: ActivatedRoute
  ) {
    titleService.setTitle("Исторические данные");
    this.activatedRoute = new SalariesChartActivatedRoute(activatedRouteSource);
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.activatedRoute
        .getQueryParams()
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.filterData = x;
          this.load(this.filterData);
        });

      this.service
        .surveyChart()
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.surveyData = x;
        });

      return;
    }

    this.cookieService.set("url", this.router.url);
    this.authService.login();
  }

  closeSurveyBlock(): void {
    this.surveyData = null;
    this.service
        .surveyChart()
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.surveyData = x;
        });

    this.gtag.event("survey_closed", "historical_data");
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }

  applyGlobalFilters(data: SalaryChartGlobalFiltersData): void {
    if (this.filterData.equals(data)) {
      return;
    }

    this.filterData = data;
    const selectedGrade = data.grade ? DeveloperGrade[data.grade] : "empty";
    this.gtag.event(
      "salaries_filters_applied",
      "historical_data",
      selectedGrade
    );
    this.load(data);
  }

  resetGlobalFilters(): void {
    const newFilterData = new SalaryChartGlobalFiltersData();
    if (this.filterData.equals(newFilterData)) {
      return;
    }

    this.filterData = newFilterData;
    this.gtag.event("salaries_filters_reset", "historical_data");

    if (this.router.url.indexOf("?") > 0) {
      this.router.navigateByUrl(
        this.router.url.substring(0, this.router.url.indexOf("?"))
      );
      return;
    }

    this.load();
  }

  share(data: SalaryChartGlobalFiltersData): void {
    this.filterData = data;
    this.gtag.event("salaries_share_clicked", "historical_data");

    const currentUrl = new ApiBackendAbsoluteUrl("/chart-share").asString();
    const shareUrl = `${currentUrl}?${new ConvertObjectToHttpParams(
      this.filterData
    ).get()}`;
    new ClipboardCopier(shareUrl).execute();
  }

  load(data: SalaryChartGlobalFiltersData | null = null): void {
    this.data = null;

    const shouldLoadSelectBoxItems =
      this.skills.length === 0 ||
      this.industries.length === 0 ||
      this.professions.length === 0 ||
      this.initialLoading;

    if (shouldLoadSelectBoxItems) {
      this.salariesService
        .selectBoxItems()
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.skills = x.skills;
          this.industries = x.industries;
          this.professions = x.professions;

          this.loadChartWithFilter(data);
          this.initialLoading = false;
        });

      return;
    }

    this.loadChartWithFilter(data);
  }

  loadChartWithFilter(data: SalaryChartGlobalFiltersData | null = null): void {
    this.service
      .salariesChart({
        grade: data?.grade ?? null,
        profsInclude: data?.profsInclude ?? null,
        cities: data?.cities ?? null,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.isAuthenticated = x.hasAuthentication;
        this.data = x;
        this.shouldAddOwnSalary = x.shouldAddOwnSalary;
      });
  }
}
