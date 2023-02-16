import { Component, Input, OnInit } from '@angular/core';
import { EmploymentStatus, EmploymentStatusEnum } from '@models/organizations/employment-status.enum';

@Component({
  selector: 'app-employment-status',
  templateUrl: './employment-status.component.html'
})
export class EmploymentStatusComponent implements OnInit {
  title = '';
  style = '';

  @Input()
  status: EmploymentStatus | null = null;

  ngOnInit(): void {
    this.title = this.status != null ? EmploymentStatusEnum.label(this.status) : '';
    this.style = this.status != null ? EmploymentStatusEnum.cssClass(this.status) : '';
  }
}
