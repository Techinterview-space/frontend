import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BackgroundJobsComponent } from "./components/background-jobs/background-jobs.component";
import { HealthCheckTableComponent } from "./components/health-check-table/health-check-table.component";
import { JobsTableComponent } from "./components/jobs-table/jobs-table.component";
import { InterviewTemplatesAdminPageComponent } from "./components/interviews/interview-templates-admin-page/interview-templates-admin-page.component";
import { UsersAdminPageComponent } from "./components/users/users-admin-page/users-admin-page.component";
import { AdminStartPageComponent } from "./components/admin-start-page/admin-start-page.component";
import { SalariesAdminPageComponent } from "./components/salaries/salaries-admin-page/salaries-admin-page.component";
import { SalariesAdminPaginatedTableComponent } from "./components/salaries/salaries-admin-paginated-table/salaries-admin-paginated-table.component";
import { SalariesNotInStatsAdminPageComponent } from "./components/salaries/salaries-not-in-stat-admin-page/salaries-not-in-stat-admin-page.component";
import { SkillsPaginatedTableComponent } from "./components/label-entities/skills-paginated-table/skills-paginated-table.component";
import { WorkIndustriesPaginatedTableComponent } from "./components/label-entities/work-industries-paginated-table/work-indusrties-paginated-table.component";
import { ProfessionsPaginatedTableComponent } from "./components/label-entities/professions-paginated-table/professions-paginated-table.component";
import { TelegramBotUsagesComponent } from "./components/telegram/telegram-bot-usages/telegram-bot-usages.component";
import { SalariesSurveyPageComponent } from "./components/salaries/salaries-survey-page/salaries-survey-page.component";

@NgModule({
  declarations: [
    BackgroundJobsComponent,
    HealthCheckTableComponent,
    JobsTableComponent,
    InterviewTemplatesAdminPageComponent,
    UsersAdminPageComponent,
    AdminStartPageComponent,
    SalariesAdminPageComponent,
    SalariesAdminPaginatedTableComponent,
    SalariesNotInStatsAdminPageComponent,
    SkillsPaginatedTableComponent,
    WorkIndustriesPaginatedTableComponent,
    ProfessionsPaginatedTableComponent,
    TelegramBotUsagesComponent,
    SalariesSurveyPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
