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
import { TelegramUserSettingsComponent } from "./components/telegram/telegram-user-settings/telegram-user-settings.component";
import { SourcedSalariesAdminPageComponent } from "./components/salaries/sourced-salaries-admin-page/sourced-salaries-admin-page.component";
import { StatDataCacheRecordsComponent } from "./components/telegram/stat-data-change-subscriptions/stat-data-cache-records.component";
import { CurrenciesPageComponent } from "./components/currencies-page/currencies-page.component";
import { GenerateQrPageComponent } from "./components/generate-qr-code-page/generate-qr-page.component";

const routes: Routes = [
  { path: "", component: AdminStartPageComponent },
  { path: "users", component: UsersAdminPageComponent },
  {
    path: "interview-templates",
    component: InterviewTemplatesAdminPageComponent,
  },
  { path: "skills", component: SkillsPaginatedTableComponent },
  { path: "work-industries", component: WorkIndustriesPaginatedTableComponent },
  { path: "professions", component: ProfessionsPaginatedTableComponent },
  { path: "salaries", component: SalariesAdminPageComponent },
  {
    path: "salaries/not-in-stats",
    component: SalariesNotInStatsAdminPageComponent,
  },
  {
    path: "salaries/imported-salaries",
    component: SourcedSalariesAdminPageComponent,
  },
  { path: "telegram/bot-usages", component: TelegramBotUsagesComponent },
  { path: "telegram/user-settings", component: TelegramUserSettingsComponent },
  {
    path: "telegram/stat-data-change-subscriptions",
    component: StatDataCacheRecordsComponent,
  },

  { path: "tools/background-jobs", component: BackgroundJobsComponent },
  { path: "tools/currencies", component: CurrenciesPageComponent },
  { path: "tools/generate-qr", component: GenerateQrPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
