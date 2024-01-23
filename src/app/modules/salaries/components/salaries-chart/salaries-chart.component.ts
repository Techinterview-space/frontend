import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  templateUrl: './salaries-chart.component.html',
  styleUrl: './salaries-chart.component.scss'
})
export class SalariesChartComponent implements OnInit, OnDestroy {

  readonly isYourSalaryWithinMarketTitle = 'Ваша зарплата «в рынке»?';

  salariesChart: SalariesChart | null = null;
  filterData = new SalaryChartGlobalFiltersData();

  showDataStub = false;
  openAddSalaryModal = false;
  openEditCurrentSalaryModal = false;
  isAuthenticated = false;

  gradeFilter: DeveloperGrade | null = null;

  constructor(
    private readonly service: UserSalariesService,
    title: TitleService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly gtag: GoogleAnalyticsService) {
      title.setTitle('Salaries');
    }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.load();
      return;
    }

    this.showDataStub = true;
    this.salariesChart = new StubSalariesChart();
  }

  load(data: SalaryChartGlobalFiltersData | null = null): void {
    this.salariesChart = null;
    this.service.charts({
      grade: data?.grade ?? null,
    })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        if (x.shouldAddOwnSalary) {
          this.openAddSalaryModal = true;
          this.showDataStub = true;
          this.salariesChart = new StubSalariesChart();
        } else {
          this.salariesChart = new SalariesChart(x);
          this.showDataStub = false;
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
    this.load();
  }

  ngOnDestroy(): void {
    // ignored
  }
}
