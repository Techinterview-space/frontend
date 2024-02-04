import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackgroundJobsComponent } from './components/background-jobs/background-jobs.component';
import { HealthCheckTableComponent } from './components/health-check-table/health-check-table.component';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { InterviewTemplatesAdminPageComponent } from './components/interviews/interview-templates-admin-page/interview-templates-admin-page.component';
import { UsersAdminPageComponent } from './components/users/users-admin-page/users-admin-page.component';
import { AllOrganizationsAdminComponent } from './components/organizations/all-organizations-admin/all-organizations-admin.component';
import { AdminStartPageComponent } from './components/admin-start-page/admin-start-page.component';
import { SalariesAdminPageComponent } from './components/salaries/salaries-admin-page/salaries-admin-page.component';
import { SalariesAddingChartComponent } from './components/salaries/salaries-adding-chart/salaries-adding-chart.component';
import { SalariesAdminPaginatedTableComponent } from './components/salaries/salaries-admin-paginated-table/salaries-admin-paginated-table.component';
import { SalariesNotInStatsAdminPageComponent } from './components/salaries/salaries-not-in-stat-admin-page/salaries-not-in-stat-admin-page.component';
import { SkillsPaginatedTableComponent } from './components/skills/skills-paginated-table/skills-paginated-table.component';

@NgModule({
  declarations: [
    BackgroundJobsComponent,
    HealthCheckTableComponent,
    JobsTableComponent,
    InterviewTemplatesAdminPageComponent,
    UsersAdminPageComponent,
    AllOrganizationsAdminComponent,
    AdminStartPageComponent,
    SalariesAdminPageComponent,
    SalariesAddingChartComponent,
    SalariesAdminPaginatedTableComponent,
    SalariesNotInStatsAdminPageComponent,
    SkillsPaginatedTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule]
})
export class AdminModule {}
