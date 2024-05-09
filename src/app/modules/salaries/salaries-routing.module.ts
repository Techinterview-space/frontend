import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalariesChartComponent } from "./components/salaries-chart/salaries-chart.component";
import { SalariesSurveyPageComponent } from "./components/salaries-survey-page/salaries-survey-page.component";

const routes: Routes = [
  {
    path: "",
    component: SalariesChartComponent,
  },
  {
    path: "survey",
    component: SalariesSurveyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalariesRoutingModule {}
