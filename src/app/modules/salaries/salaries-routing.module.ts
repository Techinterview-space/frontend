import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalariesChartComponent } from './components/salaries-chart/salaries-chart.component';
import { AddSalaryComponent } from './components/add-salary/add-salary.component';

const routes: Routes = [
  { path: '', component: SalariesChartComponent },
  { path: 'add-salary', component: AddSalaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalariesRoutingModule {}
