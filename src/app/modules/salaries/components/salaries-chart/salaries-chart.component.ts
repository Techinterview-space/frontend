import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSalary } from '@models/salaries/salary.model';
import { UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalariesChart } from './salaries-chart';
import { AuthService } from '@shared/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { StubSalariesChart } from './stub-salaries-chart';
import { DeveloperGrade } from '@models/enums';
import { SalaryChartGlobalFiltersData } from './salary-chart-global-filters/global-filters-form-group';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { SalariesChartActivatedRoute } from './salaries-activated-route';
import { ApiBackendAbsoluteUrl, ClipboardCopier } from '@shared/value-objects/clipboard-copier';
import { CurrentUserSalaryLabelData } from './current-user-salary-label-data';
import { MetaTagService } from '@services/meta-tag.service';
import { LabelEntityDto } from '@services/label-entity.model';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';

@Component({
  templateUrl: './salaries-chart.component.html',
  styleUrl: './salaries-chart.component.scss'
})
export class SalariesChartComponent implements OnInit, OnDestroy {

  readonly isYourSalaryWithinMarketTitle = 'Ваша зарплата «в рынке»?';

  salariesChart: SalariesChart | null = null;
  currentUserSalary: CurrentUserSalaryLabelData | null = null;
  filterData = new SalaryChartGlobalFiltersData();

  readonly activatedRoute: SalariesChartActivatedRoute;
  skills: Array<LabelEntityDto> = [];
  industries: Array<LabelEntityDto> = [];
  professions: Array<LabelEntityDto> = [];

  showDataStub = false;
  openAddSalaryModal = false;
  openEditCurrentSalaryModal = false;
  showAdjustCurrentSalaryProfessionModal = false;
  isAuthenticated = false;
  hasPredefinedFilter = false;

  gradeFilter: DeveloperGrade | null = null;

  constructor(
    private readonly service: UserSalariesService,
    private readonly meta: MetaTagService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly gtag: GoogleAnalyticsService,
    activatedRouteSource: ActivatedRoute) {
      this.activatedRoute = new SalariesChartActivatedRoute(activatedRouteSource);
      this.meta.updateChartMetaTags(
        'Зарплаты в IT в Казахстане',
        'Здесь можно увидеть статистику по зарплатам в IT в Казахстане. Есть множество графиков по разным критериям, а также возможность применить необходимые фильтры.',
        '/salaries'
      );
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

    if (this.skills.length === 0 || this.industries.length === 0) {
      this.service.selectBoxItems()
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.skills = x.skills;
          this.industries = x.industries;
          this.professions = x.professions;
        });
    }

    this.service.charts({
      grade: data?.grade ?? null,
      profsInclude: data?.profsInclude ?? null,
      cities: data?.cities ?? null,
    })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        if (x.shouldAddOwnSalary) {
          this.openAddSalaryModal = this.isAuthenticated;
          this.showDataStub = true;
          this.salariesChart = new StubSalariesChart(x);
        } else {
          this.salariesChart = new SalariesChart(x, this.professions);
          this.currentUserSalary = x.currentUserSalary != null
            ? new CurrentUserSalaryLabelData(x.currentUserSalary)
            : null;

          const developerProfessionId = 1;
          this.showDataStub = false;
          this.showAdjustCurrentSalaryProfessionModal =
            x.currentUserSalary != null &&
            x.currentUserSalary.professionId === developerProfessionId;
        }
      });
  }

  openAddSalaryAction(): void {
    if (this.authService.isAuthenticated()) {
      this.openAddSalaryModal = true;
      this.gtag.event('salaries_chart_view', 'salary_add_modal_opened');
      return;
    }

    this.cookieService.set('url', this.router.url);
    this.authService.login();
  }

  openEditSalaryAction(): void {
    if (this.salariesChart?.currentUserSalary) {
      this.openEditCurrentSalaryModal = true;
      this.gtag.event('salaries_chart_view', 'salary_edit_modal_opened');
      return;
    }
  }

  closeAddSalaryAction(): void {
    this.openAddSalaryModal = false;
    this.gtag.event('salaries_chart_view', 'salary_add_modal_closed_without_adding');
  }

  closeEditSalaryAction(): void {
    this.openEditCurrentSalaryModal = false;
    this.gtag.event('salaries_chart_view', 'salary_edit_modal_closed_without_editing');
  }

  onSalaryAdded(salary: UserSalary): void {
    this.openAddSalaryModal = false;
    this.gtag.event('salaries_chart_view', 'salary_added');
    this.load();
  }

  onSalaryUpdated(salary: UserSalary): void {
    this.openEditCurrentSalaryModal = false;
    this.gtag.event('salaries_chart_view', 'salary_updated');
    this.load();
  }

  applyGlobalFilters(data: SalaryChartGlobalFiltersData): void {

    if (this.filterData.equals(data)) {
        return;
    }

    this.filterData = data;
    const selectedGrade = data.grade ? DeveloperGrade[data.grade] : 'empty';
    this.gtag.event('salaries_chart_view', 'filters_applied', selectedGrade);
    this.load(data);
  }

  resetGlobalFilters(): void {

    const newFilterData = new SalaryChartGlobalFiltersData();
    if (this.filterData.equals(newFilterData)) {
      return;
    }

    this.filterData = newFilterData;
    this.gtag.event('salaries_chart_view', 'filters_reset');

    if (this.router.url.indexOf('?') > 0) {
      this.router.navigateByUrl(this.router.url.substring(0, this.router.url.indexOf('?')));
      return;
    }

    this.load();
  }

  share(data: SalaryChartGlobalFiltersData): void {
    this.filterData = data;
    this.gtag.event('salaries_chart_view', 'share_clicked');

    const currentUrl = new ApiBackendAbsoluteUrl('/chart-share').asString();
    const shareUrl = `${currentUrl}?${new ConvertObjectToHttpParams(this.filterData).get()}`;
    new ClipboardCopier(shareUrl).execute();
  }

  ngOnDestroy(): void {
    this.meta.returnDefaultMetaTags();
  }
}
