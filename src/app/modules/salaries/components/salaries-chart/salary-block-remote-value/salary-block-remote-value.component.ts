import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-salary-block-remote-value',
  templateUrl: './salary-block-remote-value.component.html',
  styleUrl: './salary-block-remote-value.component.scss'
})
export class SalaryBlockRemoteValueComponent {

  @Input()
  title: string = '';

  @Input()
  value: string = '';
}
