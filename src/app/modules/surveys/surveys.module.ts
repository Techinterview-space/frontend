import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { SurveysRoutingModule } from "./surveys-routing.module";
import { SurveyCreatePageComponent } from "./components/survey-create-page/survey-create-page.component";
import { SurveyEditPageComponent } from "./components/survey-edit-page/survey-edit-page.component";
import { SurveyViewPageComponent } from "./components/survey-view-page/survey-view-page.component";
import { SurveyResultsPageComponent } from "./components/survey-results-page/survey-results-page.component";
import { MySurveysPageComponent } from "./components/my-surveys-page/my-surveys-page.component";

@NgModule({
  declarations: [
    SurveyCreatePageComponent,
    SurveyEditPageComponent,
    SurveyViewPageComponent,
    SurveyResultsPageComponent,
    MySurveysPageComponent,
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SurveysModule {}
