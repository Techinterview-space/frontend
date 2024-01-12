import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { ProfessionSelectItem } from '@shared/select-boxes/profession-select-item';
import { UserSalary } from '@models/salaries/salary.model';
import { SalariesChart } from '../salaries-chart/salaries-chart';

@Component({
  selector: 'app-salaries-by-grades-chart',
  templateUrl: './salaries-by-grades-chart.component.html',
  styleUrl: './salaries-by-grades-chart.component.scss'
})
export class SalariesByGradesChartComponent implements OnInit, OnDestroy {

  @Input()
  chart: SalariesChart | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // ignored
  }
}
