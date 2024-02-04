import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSalary } from '@models/salaries/salary.model';
import { TitleService } from '@services/title.service';
import { UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalariesChart } from './salaries-chart';
import { AuthService } from '@shared/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { StubSalariesChart } from './stub-salaries-chart';
import { DeveloperGrade } from '@models/enums';
import { SalaryChartGlobalFiltersData } from './salary-chart-global-filters/global-filters-form-group';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { UserProfession } from '@models/salaries/user-profession';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { SalariesChartActivatedRoute } from './salaries-activated-route';
import { AbsoluteLink, ClipboardCopier } from '@shared/value-objects/clipboard-copier';
import { environment } from '@environments/environment';
import { CurrentUserSalaryLabelData } from './current-user-salary-label-data';
import { Skill, SkillsService } from '@services/skills.service';

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
  skills: Array<Skill> = [];

  showDataStub = false;
  openAddSalaryModal = false;
  openEditCurrentSalaryModal = false;
  showAdjustCurrentSalaryProfessionModal = false;
  isAuthenticated = false;

  gradeFilter: DeveloperGrade | null = null;

  constructor(
    private readonly service: UserSalariesService,
    title: TitleService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly gtag: GoogleAnalyticsService,
    activatedRouteSource: ActivatedRoute,
    private readonly skillsService: SkillsService) {
      title.setTitle('Salaries');
      this.activatedRoute = new SalariesChartActivatedRoute(activatedRouteSource);
    }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.activatedRoute
      .getQueryParams()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.filterData = x;
        this.load(x);
      });
  }

  load(data: SalaryChartGlobalFiltersData | null = null): void {
    this.salariesChart = null;
    this.openAddSalaryModal = false;
    this.currentUserSalary = null;

    this.service.charts({
      grade: data?.grade ?? null,
      profsInclude: data?.profsToInclude ?? null,
      cities: data?.cities ?? null,
    })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        if (x.shouldAddOwnSalary) {
          this.openAddSalaryModal = this.isAuthenticated;
          this.showDataStub = true;
          this.salariesChart = new StubSalariesChart(x);
        } else {
          this.salariesChart = new SalariesChart(x);
          this.currentUserSalary = x.currentUserSalary != null
            ? new CurrentUserSalaryLabelData(x.currentUserSalary)
            : null;

          this.showDataStub = false;
          this.showAdjustCurrentSalaryProfessionModal =
            x.currentUserSalary != null &&
            x.currentUserSalary.profession === UserProfession.Developer;

          if (this.skills.length === 0) {
            this.skillsService.allForSelectBoxes()
              .pipe(untilDestroyed(this))
              .subscribe((skills) => {
                this.skills = skills;
              });
          }
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

    const currentUrl = new AbsoluteLink(this.router.url).asString();
    const shareUrlPart = this.activatedRoute.prepareQueryParamsAsString(this.filterData);

    const shareUrl = `${currentUrl}${shareUrlPart}`;
    new ClipboardCopier(shareUrl).execute();
  }

  ngOnDestroy(): void {
    // ignored
  }
}
