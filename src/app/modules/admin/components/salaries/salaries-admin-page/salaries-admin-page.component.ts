import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { UserSalaryAdminDto } from '@models/salaries/salary.model';
import { TitleService } from '@services/title.service';
import { AdminAllSalariesQueryParams, UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { SalaryAdminItem } from '../salary-admin-item';
import { SalariesTableFilter } from '../salaries-table-filter';

@Component({
  templateUrl: './salaries-admin-page.component.html'
})
export class SalariesAdminPageComponent implements OnInit, OnDestroy {

  salaries: Array<SalaryAdminItem> | null = null;
  source: PaginatedList<UserSalaryAdminDto> | null = null;
  readonly filter = new SalariesTableFilter();

  constructor(
    private readonly service: UserSalariesService,
    private readonly titleService: TitleService,
    private readonly alert: AlertService) {}

  ngOnInit(): void {
    this.loadData(
      { 
        page: 1,
        pageSize: defaultPageParams.pageSize,
        ...this.filter
       }
    );
    this.titleService.setTitle('All salaries');
  }

  loadData(data: AdminAllSalariesQueryParams): void {

    this.salaries = null;
    this.source = null;

    this.service
      .all(data)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.salaries = x.results.map((x) => new SalaryAdminItem(x));
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  deleteSalary(salary: SalaryAdminItem): void {
    this.service
      .delete(salary.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success('Salary deleted');
      });
  }
}
