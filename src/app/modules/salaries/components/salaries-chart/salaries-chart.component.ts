import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSalary } from '@models/salaries/salary.model';
import { TitleService } from '@services/title.service';
import { SalariesChartResponse, UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  templateUrl: './salaries-chart.component.html',
  styleUrl: './salaries-chart.component.scss'
})
export class SalariesChartComponent implements OnInit, OnDestroy {

  salariesChart: SalariesChartResponse | null = null;

  constructor(
    private readonly service: UserSalariesService,
    title: TitleService,
    private readonly router: Router) {
      title.setTitle('Salaries');
    }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.charts()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.salariesChart = x;

        if (this.salariesChart.shouldAddOwnSalary) {
          this.router.navigateByUrl('/salaries/add-salary');
          return;
        }
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
