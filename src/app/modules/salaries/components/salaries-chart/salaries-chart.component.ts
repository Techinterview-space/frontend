import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SalarySourceType, UserSalary } from "@models/salaries/salary.model";
import { UserSalariesService } from "@services/user-salaries.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { SalariesChart } from "./salaries-chart";
import { AuthService } from "@shared/services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { StubSalariesChart } from "./stub-salaries-chart";
import { DeveloperGrade } from "@models/enums";
import { SalaryChartGlobalFiltersData } from "../shared/global-filters-form-group";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { SalariesChartActivatedRoute } from "../shared/salaries-activated-route";
import {
  ApiBackendAbsoluteUrl,
  ClipboardCopier,
} from "@shared/value-objects/clipboard-copier";
import { CurrentUserSalaryLabelData } from "./current-user-salary-label-data";
import { LabelEntityDto } from "@services/label-entity.model";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { FileDownloadAnchor } from "@shared/value-objects/file-download-anchor";
import { TitleService } from "@services/title.service";

@Component({
  templateUrl: "./salaries-chart.component.html",
  styleUrl: "./salaries-chart.component.scss",
})
export class SalariesChartComponent implements OnInit, OnDestroy {
  readonly isYourSalaryWithinMarketTitle = "Ваша зарплата «в рынке»?";

  salariesChart: SalariesChart | null = null;
  currentUserSalary: CurrentUserSalaryLabelData | null = null;
  filterData = new SalaryChartGlobalFiltersData();

  readonly activatedRoute: SalariesChartActivatedRoute;
  skills: Array<LabelEntityDto> = [];
  industries: Array<LabelEntityDto> = [];
  professions: Array<LabelEntityDto> = [];

  downloadedFile: File | null = null;

  showDataStub = false;
  openAddSalaryModal = false;
  openEditCurrentSalaryModal = false;
  showAdjustCurrentSalaryProfessionModal = false;
  isAuthenticated = false;
  hasPredefinedFilter = false;
  shouldShowSurveyBlock = false;
  kolesaImportedSalariesWasSelected = false;
  noImportSourceWasSelected = true;
  showSalariesPaginatedTable = false;

  gradeFilter: DeveloperGrade | null = null;

  private initialLoading = true;

  constructor(
    private readonly service: UserSalariesService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly gtag: GoogleAnalyticsService,
    activatedRouteSource: ActivatedRoute
  ) {
    this.activatedRoute = new SalariesChartActivatedRoute(activatedRouteSource);
    title.setTitle("Зарплаты в IT в Казахстане");
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.activatedRoute
      .getQueryParams()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.filterData = x;
        this.hasPredefinedFilter =
          this.filterData.grade != null ||
          this.filterData.profsInclude?.length > 0 ||
          this.filterData.cities?.length > 0;

        this.load(this.filterData);
      });
  }

  load(data: SalaryChartGlobalFiltersData | null = null): void {
    this.salariesChart = null;
    this.openAddSalaryModal = false;
    this.currentUserSalary = null;
    this.showSalariesPaginatedTable = false;

    const shouldLoadSelectBoxItems =
      this.skills.length === 0 ||
      this.industries.length === 0 ||
      this.initialLoading;

    if (shouldLoadSelectBoxItems) {
      this.service
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

  openAddSalaryAction(): void {
    if (this.isAuthenticated) {
      this.openAddSalaryModal = true;
      this.gtag.event("salary_add_modal_opened", "salary_chart");
      return;
    }

    this.cookieService.set("url", this.router.url);
    this.authService.login();
  }

  openEditSalaryAction(): void {
    if (this.salariesChart?.currentUserSalary) {
      this.openEditCurrentSalaryModal = true;
      this.gtag.event("salary_edit_modal_opened", "salary_chart");
      return;
    }
  }

  closeAddSalaryAction(): void {
    this.openAddSalaryModal = false;
    this.gtag.event("salary_add_modal_closed_without_adding", "salary_chart");
  }

  closeEditSalaryAction(): void {
    this.openEditCurrentSalaryModal = false;
    this.gtag.event("salary_edit_modal_closed_without_editing", "salary_chart");
  }

  onSalaryAdded(salary: UserSalary): void {
    this.openAddSalaryModal = false;
    this.gtag.event("salary_added", "salary_chart");
    this.load();
  }

  onSalaryUpdated(salary: UserSalary): void {
    this.openEditCurrentSalaryModal = false;
    this.gtag.event("salary_updated", "salary_chart");
    this.load();
  }

  applyGlobalFilters(data: SalaryChartGlobalFiltersData): void {
    if (this.filterData.equals(data)) {
      return;
    }

    this.filterData = data;
    const selectedGrade = data.grade ? DeveloperGrade[data.grade] : "empty";
    const selectedSourceType = data.salarySourceType
      ? SalarySourceType[data.salarySourceType]
      : "empty";

    this.gtag.event(
      "salaries_filters_applied_grade",
      "salary_chart",
      selectedGrade
    );
    this.gtag.event(
      "salaries_filters_applied_sourcetype",
      "salary_chart",
      selectedSourceType
    );

    this.load(data);
  }

  resetGlobalFilters(): void {
    const newFilterData = new SalaryChartGlobalFiltersData();
    if (this.filterData.equals(newFilterData)) {
      return;
    }

    this.filterData = newFilterData;
    this.gtag.event("salaries_filters_reset", "salary_chart");

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
    this.gtag.event("salaries_share_clicked", "salary_chart");

    const currentUrl = new ApiBackendAbsoluteUrl("/chart-share").asString();
    const shareUrl = `${currentUrl}?${new ConvertObjectToHttpParams(
      this.filterData
    ).get()}`;
    new ClipboardCopier(shareUrl).execute();
  }

  ngOnDestroy(): void {
    // ignore
  }

  downloadCsv(): void {
    this.gtag.event("salaries_csv_download", "salary_chart");

    if (this.downloadedFile != null) {
      new FileDownloadAnchor(this.downloadedFile).execute(null);
      return;
    }

    this.service
      .downloadCsv()
      .pipe(untilDestroyed(this))
      .subscribe((file) => {
        this.downloadedFile = file;
        new FileDownloadAnchor(this.downloadedFile).execute(null);
      });
  }

  closeSurveyBlock(): void {
    this.shouldShowSurveyBlock = false;
  }

  private loadChartWithFilter(
    data: SalaryChartGlobalFiltersData | null = null
  ): void {
    const filterToApply = {
      grade: data?.grade ?? null,
      profsInclude: data?.profsInclude ?? null,
      cities: data?.cities ?? null,
      skills: data?.skills ?? null,
      salarySourceType: data?.salarySourceType ?? null,
      quarterTo: data?.quarterTo ?? null,
      yearTo: data?.yearTo ?? null,
    };

    this.service
      .charts(filterToApply)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.isAuthenticated = x.hasAuthentication;
        if (x.shouldAddOwnSalary) {
          this.openAddSalaryModal = this.isAuthenticated;
          this.showDataStub = true;
          this.salariesChart = new StubSalariesChart(x);
        } else {
          this.salariesChart = new SalariesChart(x, this.professions);
          this.currentUserSalary =
            x.currentUserSalary != null
              ? new CurrentUserSalaryLabelData(x.currentUserSalary)
              : null;

          // mgorbatyuk: 1 is a 'Developer' which I going to get rid off.
          const developerProfessionId = 1;
          this.showDataStub = false;
          this.shouldShowSurveyBlock = !x.hasRecentSurveyReply;
          this.showSalariesPaginatedTable = true;
          this.showAdjustCurrentSalaryProfessionModal =
            x.currentUserSalary != null &&
            x.currentUserSalary.professionId === developerProfessionId;

          this.noImportSourceWasSelected =
            filterToApply.salarySourceType == null;
          this.kolesaImportedSalariesWasSelected =
            filterToApply.salarySourceType ==
            SalarySourceType.KolesaDevelopersCsv2022;

          console.log(filterToApply.salarySourceType);
        }
      });
  }
}
