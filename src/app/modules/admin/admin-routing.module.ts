import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStartPageComponent } from './components/admin-start-page/admin-start-page.component';
import { BackgroundJobsComponent } from './components/background-jobs/background-jobs.component';
import { InterviewTemplatesAdminPageComponent } from './components/interviews/interview-templates-admin-page/interview-templates-admin-page.component';
import { AllOrganizationsAdminComponent } from './components/organizations/all-organizations-admin/all-organizations-admin.component';
import { UsersAdminPageComponent } from './components/users/users-admin-page/users-admin-page.component';

const routes: Routes = [
  { path: '', component: AdminStartPageComponent },
  { path: 'users', component: UsersAdminPageComponent },
  { path: 'interview-templates', component: InterviewTemplatesAdminPageComponent },
  { path: 'background-jobs', component: BackgroundJobsComponent },
  { path: 'organizations', component: AllOrganizationsAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
