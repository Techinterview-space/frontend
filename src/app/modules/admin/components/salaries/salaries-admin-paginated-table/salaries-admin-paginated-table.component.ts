import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { UserSalaryAdminDto } from '@models/salaries/salary.model';
import { AdminAllSalariesQueryParams } from '@services/user-salaries.service';
import { SalaryAdminItem } from './salary-admin-item';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { SalariesTableFilter } from './salaries-table-filter';

@Component({
  selector: 'app-salaries-admin-paginated-table',
  templateUrl: './salaries-admin-paginated-table.component.html'
})
export class SalariesAdminPaginatedTableComponent {

  @Input()
  salaries: Array<SalaryAdminItem> = [];

  @Input()
  source: PaginatedList<UserSalaryAdminDto> | null = null;

  @Output()
  loadDataRequested: EventEmitter<AdminAllSalariesQueryParams> = new EventEmitter<AdminAllSalariesQueryParams>();

  @Output()
  deleteRequested: EventEmitter<SalaryAdminItem> = new EventEmitter<SalaryAdminItem>();

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  readonly filter = new SalariesTableFilter();

  constructor() {}

  loadData(page = 1): void {
    this.loadDataRequested.emit({ 
      page,
      pageSize: defaultPageParams.pageSize,
      profession: this.filter.profession ?? null,
      company: this.filter.company ?? null,
      grade: this.filter.grade ?? null,
     });
  }

  openDeleteDialog(salary: SalaryAdminItem): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the salary record',
        'Are you sure to delete?',
        () => {
          this.deleteRequested.emit(salary);
          this.loadData();
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
