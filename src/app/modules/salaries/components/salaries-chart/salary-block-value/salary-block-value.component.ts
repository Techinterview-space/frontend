import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-salary-block-value',
  templateUrl: './salary-block-value.component.html',
  styleUrl: './salary-block-value.component.scss'
})
export class SalaryBlockValueComponent {

  @Input()
  title: string = '';

  @Input()
  value: string = '';
}
