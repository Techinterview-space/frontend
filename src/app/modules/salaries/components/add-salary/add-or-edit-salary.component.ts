import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserSalariesService } from '@services/user-salaries.service';
import { EditSalaryForm } from './edit-salary-form';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { AlertService } from '@shared/components/alert/services/alert.service';

@Component({
  selector: 'app-add-or-edit-salary-modal',
  templateUrl: './add-or-edit-salary.component.html',
  styleUrl: './add-or-edit-salary.component.scss'
})
export class AddOrEditSalaryComponent implements OnInit, OnDestroy {

  @Input()
  salarytoBeEdited: UserSalaryAdminDto | null = null;

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  @Output()
  salaryAdded: EventEmitter<UserSalary> = new EventEmitter();

  addSalaryForm: EditSalaryForm | null = null;
  errorMessage: string | null = null;

  readonly companyTypes: Array<CompanyTypeSelectItem> = CompanyTypeSelectItem.allItems();
  readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();
  readonly professions: Array<ProfessionSelectItem> = ProfessionSelectItem.allItems();

  constructor(
    private readonly service: UserSalariesService,
    private readonly alert: AlertService) {}

  ngOnInit(): void {
    this.addSalaryForm = new EditSalaryForm(this.salarytoBeEdited);
  }

  addSalarySubmitAction(): void {
    this.errorMessage = null;
    const data = this.addSalaryForm?.createRequestOrNull();
    if (data == null) {
      return;
    }

    if (this.salarytoBeEdited) {
      this.service
        .update(this.salarytoBeEdited.id, data)
        .pipe(untilDestroyed(this))
        .subscribe(
          (x) => {
            if (x.isSuccess && x.createdSalary) {
              this.errorMessage = null;
              this.alert.success(this.salarytoBeEdited ? 'Зарплата обновлена' : 'Зарплата успешно записана');
              this.salaryAdded.emit(x.createdSalary);
            } else {
              const error = 'За данный квартал уже есть запись';
              this.alert.error(error);
              this.errorMessage = error;
            }});
      
      return;
    }

    this.service
      .create(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        (x) => {
          if (x.isSuccess && x.createdSalary) {
            this.errorMessage = null;
            this.alert.success(this.salarytoBeEdited ? 'Зарплата обновлена' : 'Зарплата успешно записана');
            this.salaryAdded.emit(x.createdSalary);
          } else {
            const error = 'За данный квартал уже есть запись';
            this.alert.error(error);
            this.errorMessage = error;
          }});
    
  }

  ngOnDestroy(): void {
    // ignored
  }

  close(): void {
    this.closed.emit();
  }
}
