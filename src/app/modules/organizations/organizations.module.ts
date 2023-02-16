import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@shared/shared.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { MyOrganizationsComponent } from './components/my-organizations/my-organizations.component';
import { OrgTemplatesComponent } from './components/org-templates/org-templates.component';
import { OrgInterviewsComponent } from './components/org-interviews/org-interviews.component';
import { CandidateCardsComponent } from './components/candidate-cards/candidate-cards.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { OrganizationLabelsComponent } from './components/organization-labels/organization-labels.component';

@NgModule({
  declarations: [
    OrganizationComponent,
    MyOrganizationsComponent,
    OrgTemplatesComponent,
    OrgInterviewsComponent,
    CandidateCardsComponent,
    CandidatesComponent,
    OrganizationLabelsComponent
  ],
  imports: [CommonModule, OrganizationsRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, NgSelectModule]
})
export class OrganizationsModule {}
