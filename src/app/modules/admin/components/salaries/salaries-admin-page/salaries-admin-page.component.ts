import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { UserSalary } from '@models/salaries/salary.model';
import { TitleService } from '@services/title.service';
import { UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalaryAdminItem } from './salary-admin-item';

@Component({
  templateUrl: './salaries-admin-page.component.html'
})
export class SalariesAdminPageComponent implements OnInit, OnDestroy {

  salaries: Array<SalaryAdminItem> | null = null;
  source: PaginatedList<UserSalary> | null = null;

  constructor(private readonly service: UserSalariesService, private readonly titleService: TitleService) {}

  ngOnInit(): void {
    this.loadData();
    this.titleService.setTitle('All salaries');
  }

  loadData(page = 1): void {
    this.service
      .all({ ...defaultPageParams, page })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.salaries = x.results.map((x) => new SalaryAdminItem(x));
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  openDeleteDialog(salary: SalaryAdminItem): void {
    // TODO mgorbatyuk: implement
  }
}
