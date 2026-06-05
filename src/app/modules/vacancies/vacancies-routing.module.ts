import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@shared/guards/auth.guard";
import { VacanciesPageComponent } from "./components/vacancies-page/vacancies-page.component";
import { VacancyPageComponent } from "./components/vacancy-page/vacancy-page.component";
import { VacancyEditPageComponent } from "./components/vacancy-edit-page/vacancy-edit-page.component";
import { MyVacanciesPageComponent } from "./components/my-vacancies-page/my-vacancies-page.component";
import { vacancyResolver } from "./resolvers/vacancy.resolver";

// Literal routes ("new", "my") must precede ":id" so they are not matched as ids.
const routes: Routes = [
  { path: "", component: VacanciesPageComponent },
  {
    path: "new",
    component: VacancyEditPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "my",
    component: MyVacanciesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":id/edit",
    component: VacancyEditPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":id",
    component: VacancyPageComponent,
    resolve: { vacancyData: vacancyResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
