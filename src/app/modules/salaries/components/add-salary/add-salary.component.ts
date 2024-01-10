import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '@services/title.service';
import { UserSalariesService } from '@services/user-salaries.service';
import { AddSalaryForm } from './add-salary-form';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  templateUrl: './add-salary.component.html',
  styleUrl: './add-salary.component.scss'
})
export class AddSalaryComponent implements OnInit, OnDestroy {

  addSalaryForm: AddSalaryForm | null = null;

  constructor(
    private readonly service: UserSalariesService,
    title: TitleService,
    private readonly router: Router
  ) {
    title.setTitle('Add salary');
  }

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
        this.router.navigateByUrl('/salaries');
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
