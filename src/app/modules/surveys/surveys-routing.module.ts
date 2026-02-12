import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@shared/guards/auth.guard";
import { SurveyCreatePageComponent } from "./components/survey-create-page/survey-create-page.component";
import { SurveyEditPageComponent } from "./components/survey-edit-page/survey-edit-page.component";
import { SurveyViewPageComponent } from "./components/survey-view-page/survey-view-page.component";
import { SurveyResultsPageComponent } from "./components/survey-results-page/survey-results-page.component";
import { MySurveysPageComponent } from "./components/my-surveys-page/my-surveys-page.component";
import { PublicSurveysPageComponent } from "./components/public-surveys-page/public-surveys-page.component";

const routes: Routes = [
  {
    path: "new",
    component: SurveyCreatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "public",
    component: PublicSurveysPageComponent,
  },
  {
    path: "my-surveys",
    component: MySurveysPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":slug/edit",
    component: SurveyEditPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":slug/results",
    component: SurveyResultsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":slug",
    component: SurveyViewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}
