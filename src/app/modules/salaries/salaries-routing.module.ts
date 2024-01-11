import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalariesChartComponent } from './components/salaries-chart/salaries-chart.component';

const routes: Routes = [
  { path: '', component: SalariesChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalariesRoutingModule {}
