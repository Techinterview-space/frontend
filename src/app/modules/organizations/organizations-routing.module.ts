import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateCardsComponent } from './components/candidate-cards/candidate-cards.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { MyOrganizationsComponent } from './components/my-organizations/my-organizations.component';
import { OrgInterviewsComponent } from './components/org-interviews/org-interviews.component';
import { OrgTemplatesComponent } from './components/org-templates/org-templates.component';
import { OrganizationLabelsComponent } from './components/organization-labels/organization-labels.component';
import { OrganizationComponent } from './components/organization/organization.component';

const routes: Routes = [
  { path: 'my', component: MyOrganizationsComponent },
  { path: ':id', component: OrganizationComponent },
  { path: ':id/interviews', component: OrgInterviewsComponent },
  { path: ':id/interview-templates', component: OrgTemplatesComponent },
  { path: ':id/candidates', component: CandidatesComponent },
  { path: ':id/candidate-cards', component: CandidateCardsComponent },
  { path: ':id/labels', component: OrganizationLabelsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
