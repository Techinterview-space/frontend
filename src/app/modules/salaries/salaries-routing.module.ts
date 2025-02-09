import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalariesChartComponent } from "./components/salaries-chart/salaries-chart.component";
import { SalariesSurveyPageComponent } from "./components/salaries-survey-page/salaries-survey-page.component";
import { HistoricalChartsPageComponent } from "./components/historical-charts-page/historical-charts-page.component";
import { AddSalaryComponent } from "./components/add-salary/add-salary.component";

const routes: Routes = [
  {
    path: "",
    component: SalariesChartComponent,
  },
  {
    path: "add-new",
    component: AddSalaryComponent,
  },
  {
    path: "survey",
    component: SalariesSurveyPageComponent,
  },
  {
    path: "historical-data",
    component: HistoricalChartsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalariesRoutingModule {}
