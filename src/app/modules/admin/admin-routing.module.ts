import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStartPageComponent } from "./components/admin-start-page/admin-start-page.component";
import { BackgroundJobsComponent } from "./components/background-jobs/background-jobs.component";
import { InterviewTemplatesAdminPageComponent } from "./components/interviews/interview-templates-admin-page/interview-templates-admin-page.component";
import { UsersAdminPageComponent } from "./components/users/users-admin-page/users-admin-page.component";
import { SalariesAdminPageComponent } from "./components/salaries/salaries-admin-page/salaries-admin-page.component";
import { SalariesNotInStatsAdminPageComponent } from "./components/salaries/salaries-not-in-stat-admin-page/salaries-not-in-stat-admin-page.component";
import { SkillsPaginatedTableComponent } from "./components/label-entities/skills-paginated-table/skills-paginated-table.component";
import { WorkIndustriesPaginatedTableComponent } from "./components/label-entities/work-industries-paginated-table/work-indusrties-paginated-table.component";
import { ProfessionsPaginatedTableComponent } from "./components/label-entities/professions-paginated-table/professions-paginated-table.component";
import { TelegramBotUsagesComponent } from "./components/telegram/telegram-bot-usages/telegram-bot-usages.component";
import { SalariesSurveyPageComponent } from "./components/salaries/salaries-survey-page/salaries-survey-page.component";

const routes: Routes = [
  { path: "", component: AdminStartPageComponent },
  { path: "users", component: UsersAdminPageComponent },
  {
    path: "interview-templates",
    component: InterviewTemplatesAdminPageComponent,
  },
  { path: "background-jobs", component: BackgroundJobsComponent },
  { path: "skills", component: SkillsPaginatedTableComponent },
  { path: "work-industries", component: WorkIndustriesPaginatedTableComponent },
  { path: "professions", component: ProfessionsPaginatedTableComponent },
  { path: "salaries", component: SalariesAdminPageComponent },
  {
    path: "salaries/not-in-stats",
    component: SalariesNotInStatsAdminPageComponent,
  },
  {
    path: "salaries/salaries-survey",
    component: SalariesSurveyPageComponent,
  },
  { path: "telegram/bot-usages", component: TelegramBotUsagesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
