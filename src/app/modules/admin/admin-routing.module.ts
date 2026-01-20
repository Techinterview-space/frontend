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
import { TelegramUserSettingsComponent } from "./components/telegram/telegram-user-settings/telegram-user-settings.component";
import { SourcedSalariesAdminPageComponent } from "./components/salaries/sourced-salaries-admin-page/sourced-salaries-admin-page.component";
import { StatDataCacheRecordsComponent } from "./components/telegram/salaries-stat-subscriptions/stat-data-cache-records.component";
import { CurrenciesPageComponent } from "./components/currencies-page/currencies-page.component";
import { GenerateQrPageComponent } from "./components/generate-qr-code-page/generate-qr-page.component";
import { CompaniesAdminPageComponent } from "./components/companies/companies-admin-page/companies-admin-page.component";
import { CompanyAdminPageComponent } from "./components/companies/company-admin-page/company-admin-page.component";
import { ReviewsToApprovePageComponent } from "./components/companies/reviews-to-approve/reviews-to-approve-page.component";
import { GitHubProfilesPageComponent } from "./components/github/github-profiles-page/github-profiles-page.component";
import { GitHubChatsPageComponent } from "./components/github/github-chats-page/github-chats-page.component";
import { GitHubJobsPageComponent } from "./components/github/github-jobs-page/github-jobs-page.component";
import { OpenAiPromptsAdminPageComponent } from "./components/openai-prompts/openai-prompts-admin-page.component";
import { CompanyReviewsStatSubscriptionsComponent } from "./components/telegram/reviews-stat-subscriptions/reviews-stat-subscriptions.component";
import { JobPostingMessageSubscriptionsComponent } from "./components/telegram/job-posting-message-subscriptions/job-posting-message-subscriptions.component";
import { HistoricalDataTemplatesComponent } from "./components/salaries/historical-data-templates/historical-data-templates.component";
import { SendEmailPageComponent } from "./components/tools/send-email-page/send-email-page.component";

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
  { path: "telegram/user-settings", component: TelegramUserSettingsComponent },
  {
    path: "telegram/stat-data-change-subscriptions",
    component: StatDataCacheRecordsComponent,
  },
  {
    path: "telegram/reviews-stat-subscriptions",
    component: CompanyReviewsStatSubscriptionsComponent,
  },
  {
    path: "telegram/job-posting-message-subscriptions",
    component: JobPostingMessageSubscriptionsComponent,
  },

  { path: "tools/background-jobs", component: BackgroundJobsComponent },
  { path: "tools/currencies", component: CurrenciesPageComponent },
  { path: "tools/generate-qr", component: GenerateQrPageComponent },
  { path: "tools/send-email", component: SendEmailPageComponent },

  { path: "companies", component: CompaniesAdminPageComponent },
  {
    path: "companies/reviews-to-approve",
    component: ReviewsToApprovePageComponent,
  },
  { path: "companies/:id", component: CompanyAdminPageComponent },

  { path: "github/profiles", component: GitHubProfilesPageComponent },
  { path: "github/chats", component: GitHubChatsPageComponent },
  { path: "github/processing-jobs", component: GitHubJobsPageComponent },

  { path: "openai-prompts", component: OpenAiPromptsAdminPageComponent },
  {
    path: "salaries/historical-data-templates",
    component: HistoricalDataTemplatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
