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
import { TelegramUserSettingsComponent } from "./components/telegram/telegram-user-settings/telegram-user-settings.component";
import { SourcedSalariesAdminPageComponent } from "./components/salaries/sourced-salaries-admin-page/sourced-salaries-admin-page.component";
import { StatDataCacheRecordsComponent } from "./components/telegram/stat-data-change-subscriptions/stat-data-cache-records.component";
import { GenerateQrPageComponent } from "./components/generate-qr-code-page/generate-qr-page.component";
import { CurrenciesPageComponent } from "./components/currencies-page/currencies-page.component";
import { RatingPageComponent } from "./components/admin-start-page/components/rating-page/rating-page.component";
import { AdminDashboardService } from "./services/admin-dashboard.service";
import { CompaniesAdminPageComponent } from "./components/companies/companies-admin-page/companies-admin-page.component";
import { CompanyAdminPageComponent } from "./components/companies/company-admin-page/company-admin-page.component";

const adminServices = [AdminDashboardService];

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
    SourcedSalariesAdminPageComponent,
    SkillsPaginatedTableComponent,
    WorkIndustriesPaginatedTableComponent,
    ProfessionsPaginatedTableComponent,
    TelegramBotUsagesComponent,
    TelegramUserSettingsComponent,
    StatDataCacheRecordsComponent,
    CurrenciesPageComponent,
    GenerateQrPageComponent,
    RatingPageComponent,
    CompaniesAdminPageComponent,
    CompanyAdminPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: adminServices,
  exports: [RatingPageComponent],
})
export class AdminModule {}
