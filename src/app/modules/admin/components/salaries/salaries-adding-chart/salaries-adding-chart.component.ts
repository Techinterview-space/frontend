import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '@services/title.service';
import { SalariesAddingTrendAdminChart, UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalariesAddingChart } from './salaries-adding-chart';

@Component({
  templateUrl: './salaries-adding-chart.component.html',
  styleUrl: './salaries-adding-chart.component.scss'
})
export class SalariesAddingChartComponent implements OnInit, OnDestroy {

  data: SalariesAddingTrendAdminChart | null = null;
  chart: SalariesAddingChart | null = null;

  constructor(
    private readonly service: UserSalariesService,
    private readonly titleService: TitleService) {
      this.titleService.setTitle('All salaries chart');
    }

  ngOnInit(): void {

    this.chart = null;
    this.service
      .addingSalariesaTrendAdminChart()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.data = x;
        this.chart = new SalariesAddingChart('canvas', this.data);
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
