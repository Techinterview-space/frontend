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
import { CompaniesAdminPageComponent } from "./components/companies/companies-admin-page/companies-admin-page.component";
import { CompanyAdminPageComponent } from "./components/companies/company-admin-page/company-admin-page.component";
import { ReviewsToApprovePageComponent } from "./components/companies/reviews-to-approve/reviews-to-approve-page.component";
import { InlineRepliesStatsComponent } from "./components/telegram/inline-replies-stats/inline-replies-stats.component";
import { GitHubProfilesPageComponent } from "./components/github/github-profiles-page/github-profiles-page.component";
import { GitHubChatsPageComponent } from "./components/github/github-chats-page/github-chats-page.component";
import { GitHubJobsPageComponent } from "./components/github/github-jobs-page/github-jobs-page.component";

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
  {
    path: "telegram/inline-replies-stats",
    component: InlineRepliesStatsComponent,
  },

  { path: "tools/background-jobs", component: BackgroundJobsComponent },
  { path: "tools/currencies", component: CurrenciesPageComponent },
  { path: "tools/generate-qr", component: GenerateQrPageComponent },

  { path: "companies", component: CompaniesAdminPageComponent },
  {
    path: "companies/reviews-to-approve",
    component: ReviewsToApprovePageComponent,
  },
  { path: "companies/:id", component: CompanyAdminPageComponent },

  { path: "github/profiles", component: GitHubProfilesPageComponent },
  { path: "github/chats", component: GitHubChatsPageComponent },
  { path: "github/processing-jobs", component: GitHubJobsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
