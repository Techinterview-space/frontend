import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalariesChartComponent } from "./components/salaries-chart/salaries-chart.component";

const routes: Routes = [
  {
    path: "",
    component: SalariesChartComponent,
    data: {
      title: "Зарплаты в IT в Казахстане",
      description:
        "Здесь можно увидеть статистику по зарплатам в IT в Казахстане. Есть множество графиков по разным критериям, а также возможность применить необходимые фильтры.",
      url: "/salaries",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalariesRoutingModule {}
