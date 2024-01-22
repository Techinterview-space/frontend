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

  readonly canvasId = 'canvas_' + Math.random().toString(36).substring(7);

  constructor(
    private readonly service: UserSalariesService,
    private readonly titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle('All salaries chart');
    this.chart = null;
    this.service
      .addingSalariesaTrendAdminChart()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.data = x;
      });
  }

  ngAfterViewInit() {
    if (this.data != null) {
      this.chart = new SalariesAddingChart(this.canvasId, this.data);
      /*var chartEl = document.getElementById(this.canvasId);
      if (chartEl != null && chartEl.parentElement != null) {
        chartEl.style.height = chartEl?.parentElement.style.height ?? '100%';
      }*/
    } else {
      this.chart = null;
    }
  }

  ngOnDestroy(): void {
    // ignored
  }
}
