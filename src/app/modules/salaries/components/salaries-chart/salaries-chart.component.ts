import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSalary } from '@models/salaries/salary.model';
import { TitleService } from '@services/title.service';
import { UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalariesChart } from './salaries-chart';
import { AuthService } from '@shared/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: './salaries-chart.component.html',
  styleUrl: './salaries-chart.component.scss'
})
export class SalariesChartComponent implements OnInit, OnDestroy {

  salariesChart: SalariesChart | null = null;

  openAddSalaryModal = false;

  constructor(
    private readonly service: UserSalariesService,
    title: TitleService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService) {
      title.setTitle('Salaries');
    }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.load();
      return;
    }

    console.log('Saving url to cookie', this.router.url);
    this.cookieService.set('url', this.router.url);
    this.authService.login();
  }

  load(): void {
    this.service.charts()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.salariesChart = new SalariesChart(x);
        if (x.shouldAddOwnSalary) {
          this.openAddSalaryModal = true;
        }
      });
  }

  openAddSalaryAction(): void {
    this.openAddSalaryModal = true;
  }

  closeAddSalaryAction(): void {
    this.openAddSalaryModal = false;
  }

  onSalaryAdded(salary: UserSalary): void {
    this.openAddSalaryModal = false;
    this.load();
  }

  ngOnDestroy(): void {
    // ignored
  }
}
