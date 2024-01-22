import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UserSalariesService } from '@services/user-salaries.service';
import { EditSalaryForm } from './edit-salary-form';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary } from '@models/salaries/salary.model';
import { AlertService } from '@shared/components/alert/services/alert.service';

@Component({
  selector: 'app-add-salary-modal',
  templateUrl: './add-salary.component.html',
  styleUrl: './add-salary.component.scss'
})
export class AddSalaryComponent implements OnInit, OnDestroy {

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
    this.addSalaryForm = new EditSalaryForm();
  }

  addSalarySubmitAction(): void {
    this.errorMessage = null;
    const data = this.addSalaryForm?.createRequestOrNull();
    if (data == null) {
      return;
    }

    this.service
      .create(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        (x) => {
          if (x.isSuccess && x.createdSalary) {
            this.errorMessage = null;
            this.alert.success('Зарплата успешно записана');
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
