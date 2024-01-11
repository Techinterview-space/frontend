import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UserSalariesService } from '@services/user-salaries.service';
import { AddSalaryForm } from './add-salary-form';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary } from '@models/salaries/salary.model';

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

  addSalaryForm: AddSalaryForm | null = null;

  readonly companyTypes: Array<CompanyTypeSelectItem> = CompanyTypeSelectItem.allItems();
  readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.allGrades();
  readonly professions: Array<ProfessionSelectItem> = ProfessionSelectItem.allItems();

  constructor(
    private readonly service: UserSalariesService) {}

  ngOnInit(): void {
    this.addSalaryForm = new AddSalaryForm();
  }

  addSalarySubmitAction(): void {
    const data = this.addSalaryForm?.createRequestOrNull();
    if (data == null) {
      return;
    }

    this.service
      .create(data)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.salaryAdded.emit(x);
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  close(): void {
    this.closed.emit();
  }
}
