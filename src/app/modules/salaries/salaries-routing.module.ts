import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalariesChartComponent } from "./components/salaries-chart/salaries-chart.component";
import { HistoricalChartsPageComponent } from "./components/historical-charts-page/historical-charts-page.component";
import { AddSalaryComponent } from "./components/add-salary/add-salary.component";
import { CurrenciesChartPageComponent } from "./components/currencies-chart-page/currencies-chart-page.component";
import { SalariesOverviewComponent } from "./components/salaries-overview/salaries-overview.component";

const routes: Routes = [
  {
    path: "",
    component: SalariesChartComponent,
  },
  {
    path: "overview",
    component: SalariesOverviewComponent,
  },
  {
    path: "add-new",
    component: AddSalaryComponent,
  },
  {
    path: "historical-data",
    component: HistoricalChartsPageComponent,
  },
  {
    path: "currencies-chart",
    component: CurrenciesChartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalariesRoutingModule {}
