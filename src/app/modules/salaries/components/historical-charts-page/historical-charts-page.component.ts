import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { formatNumber } from "@angular/common";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { GetSalariesHistoricalChartResponse, HistoricalChartsService } from "@services/historical-charts.service";
import { SalariesChartActivatedRoute } from "../shared/salaries-activated-route";
import { SalaryChartGlobalFiltersData } from "../shared/global-filters-form-group";
import { UserSalariesService } from "@services/user-salaries.service";
import { LabelEntityDto } from "@services/label-entity.model";

@Component({
  templateUrl: "./historical-charts-page.component.html",
  styleUrls: ["./historical-charts-page.component.scss"],
})
export class HistoricalChartsPageComponent implements OnInit, OnDestroy {

  readonly activatedRoute: SalariesChartActivatedRoute;

  data: GetSalariesHistoricalChartResponse | null = null;
  filterData = new SalaryChartGlobalFiltersData();
  isAuthenticated = false;

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
    titleService.setTitle("Опрос о пользе зарплатной статистики");
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
       return;
    }

    this.cookieService.set("url", this.router.url);
    this.authService.login();
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }

  load(data: SalaryChartGlobalFiltersData | null = null): void {
    this.data = null;

    const shouldLoadSelectBoxItems =
      this.skills.length === 0 ||
      this.industries.length === 0 ||
      this.professions. length === 0 ||
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
    .salariesChart(
      {
        grade: data?.grade ?? null,
        profsInclude: data?.profsInclude ?? null,
        cities: data?.cities ?? null,
      }
    )
    .pipe(untilDestroyed(this))
    .subscribe((x) => {
      this.isAuthenticated = x.hasAuthentication;
      this.data = x;
    });
  }
}
