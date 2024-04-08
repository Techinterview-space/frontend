import { Component, Input } from '@angular/core';
import { SalariesChart } from '../salaries-chart';

@Component({
  selector: 'app-salary-block-remote-value',
  templateUrl: './salary-block-remote-value.component.html',
  styleUrl: './salary-block-remote-value.component.scss'
})
export class SalaryBlockRemoteValueComponent {

  @Input()
  source: SalariesChart | null= null;

  get median(): string {
    return this.source?.medianRemoteSalary ?? '';
  }

  get average(): string {
    return this.source?.averageRemoteSalary ?? '';
  }
}
