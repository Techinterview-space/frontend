import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { UserSalaryAdminDto } from '@models/salaries/salary.model';
import { AdminAllSalariesQueryParams, SalariesAdminOrderingType } from '@services/user-salaries.service';
import { SalaryAdminItem } from '../salary-admin-item';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { SalariesTableFilter } from '../salaries-table-filter';

@Component({
  selector: 'app-salaries-admin-paginated-table',
  templateUrl: './salaries-admin-paginated-table.component.html'
})
export class SalariesAdminPaginatedTableComponent {

  @Input()
  salaries: Array<SalaryAdminItem> | null = null;

  @Input()
  source: PaginatedList<UserSalaryAdminDto> | null = null;

  @Input()
  filter: SalariesTableFilter | null = null;

  @Input()
  showApproveButton = false;

  @Input()
  showExcludeButton = false;

  @Output()
  loadDataRequested: EventEmitter<AdminAllSalariesQueryParams> = new EventEmitter<AdminAllSalariesQueryParams>();

  @Output()
  approveRequested: EventEmitter<SalaryAdminItem> = new EventEmitter<SalaryAdminItem>();

  @Output()
  excludeRequested: EventEmitter<SalaryAdminItem> = new EventEmitter<SalaryAdminItem>();

  @Output()
  deleteRequested: EventEmitter<SalaryAdminItem> = new EventEmitter<SalaryAdminItem>();

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor() {}

  loadData(page = 1): void {
    this.loadDataRequested.emit({ 
      page,
      pageSize: defaultPageParams.pageSize,
      profession: this.filter?.profession ?? null,
      company: this.filter?.company ?? null,
      grade: this.filter?.grade ?? null,
      order_type: this.filter?.order_type ?? null,
     });
  }

  openDeleteDialog(salary: SalaryAdminItem): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the salary record',
        'Are you sure to delete?',
        () => {
          this.deleteRequested.emit(salary);
        }
      )
    );
  }

  openApproveDialog(salary: SalaryAdminItem): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Approve the salary record',
        'Are you sure to approve?',
        () => {
          this.approveRequested.emit(salary);
        }
      )
    );
  }

  openExcludeDialog(salary: SalaryAdminItem): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Exclude the salary from stats',
        'Are you sure to exclude?',
        () => {
          this.excludeRequested.emit(salary);
        }
      )
    );
  }

  clearFilter(): void {
    if (this.filter) {
      this.filter.profession = null;
      this.filter.company = null;
      this.filter.grade = null;
      this.filter.order_type = SalariesAdminOrderingType.CreatedAtDesc;
    }

    this.loadData();
  }
}
