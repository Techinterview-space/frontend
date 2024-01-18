import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { UserSalaryAdminDto } from '@models/salaries/salary.model';
import { TitleService } from '@services/title.service';
import { UserSalariesService } from '@services/user-salaries.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalaryAdminItem } from './salary-admin-item';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { SalariesTableFilter } from './salaries-table-filter';

@Component({
  templateUrl: './salaries-admin-page.component.html'
})
export class SalariesAdminPageComponent implements OnInit, OnDestroy {

  salaries: Array<SalaryAdminItem> | null = null;
  source: PaginatedList<UserSalaryAdminDto> | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  readonly filter = new SalariesTableFilter();

  constructor(
    private readonly service: UserSalariesService,
    private readonly titleService: TitleService,
    private readonly alert: AlertService) {}

  ngOnInit(): void {
    this.loadData();
    this.titleService.setTitle('All salaries');
  }

  loadData(page = 1): void {

    this.salaries = null;
    this.source = null;

    this.service
      .all({ 
        page,
        pageSize: defaultPageParams.pageSize,
        profession: this.filter.profession ?? null,
        company: this.filter.company ?? null,
        grade: this.filter.grade ?? null,
       })
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
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the salary record',
        'Are you sure to delete?',
        () => {
          this.service
            .delete(salary.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('Salary deleted');
              this.loadData();
            });
        }
      )
    );
  }

  clearFilter(): void {
    this.filter.profession = null;
    this.filter.company = null;
    this.loadData();
  }
}
