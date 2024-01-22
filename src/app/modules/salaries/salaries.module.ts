import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalariesRoutingModule } from './salaries-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@shared/shared.module';
import { SalariesChartComponent } from './components/salaries-chart/salaries-chart.component';
import { AddOrEditSalaryComponent } from './components/add-salary/add-or-edit-salary.component';
import { SalariesByGradesChartComponent } from './components/salaries-by-grades-chart/salaries-by-grades-chart.component';
import { SalaryBlockValueComponent } from './components/salaries-chart/salary-block-value/salary-block-value.component';
import { SalaryBlockRemoteValueComponent } from './components/salaries-chart/salary-block-remote-value/salary-block-remote-value.component';
import { SalaryChartGlobalFiltersComponent } from './components/salaries-chart/salary-chart-global-filters/salary-chart-global-filters.component';

@NgModule({
  declarations: [
    SalariesChartComponent,
    AddOrEditSalaryComponent,
    SalariesByGradesChartComponent,
    SalaryBlockValueComponent,
    SalaryBlockRemoteValueComponent,
    SalaryChartGlobalFiltersComponent,
  ],
  imports: [
    CommonModule,
    SalariesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class SalariesModule { }
