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

  get userExistingSalaryLabel() : string {

    if (this.showDataStub) {
      return 'Здесь будут отображаться возможные действия';
    }

    if (this.salariesChart == null || this.salariesChart.currentUserSalary == null) {
      return '';
    }

    const salary = this.salariesChart.currentUserSalary;
    return `Вы указали зарплату за ${salary.quarter}.${salary.year}. Вы можете `;
  }

  constructor(
    private readonly service: UserSalariesService,
    title: TitleService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService) {
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
      return;
    }

    this.cookieService.set('url', this.router.url);
    this.authService.login();
  }

  openEditSalaryAction(): void {
    if (this.salariesChart?.currentUserSalary) {
      this.openEditCurrentSalaryModal = true;
      return;
    }
  }

  closeAddSalaryAction(): void {
    this.openAddSalaryModal = false;
  }

  closeEditSalaryAction(): void {
    this.openEditCurrentSalaryModal = false;
  }

  onSalaryAdded(salary: UserSalary): void {
    this.openAddSalaryModal = false;
    this.load();
  }

  onSalaryUpdated(salary: UserSalary): void {
    this.openEditCurrentSalaryModal = false;
    this.load();
  }

  applyGlobalFilters(data: SalaryChartGlobalFiltersData): void {

    if (this.filterData.equals(data)) {
        return;
    }

    this.filterData = data;
    this.load(data);
  }

  resetGlobalFilters(): void {

    const newFilterData = new SalaryChartGlobalFiltersData();
    if (this.filterData.equals(newFilterData)) {
      return;
    }

    this.filterData = newFilterData;
    this.load();
  }

  ngOnDestroy(): void {
    // ignored
  }
}
