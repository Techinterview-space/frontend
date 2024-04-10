import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { InterviewEditPageComponent } from './components/interview-edit-page/interview-edit-page.component';
import { InterviewPageComponent } from './components/interview-page/interview-page.component';
import { InterviewTemplateEditPageComponent } from './components/interview-template-edit-page/interview-template-edit-page.component';
import { InterviewTemplatePageComponent } from './components/interview-template-page/interview-template-page.component';
import { MyInterviewTemplatesComponent } from './components/my-interview-templates/my-interview-templates.component';
import { MyInterviewsComponent } from './components/my-interviews/my-interviews.component';
import { PublicInterviewTemplatesComponent } from './components/public-interview-templates/public-interview-templates.component';
import { InterviewsHomeComponent } from './components/interviews-home/interviews-home.component';

const routes: Routes = [
  { path: '', component: InterviewsHomeComponent },

  { path: 'templates/public', component: PublicInterviewTemplatesComponent },
  { path: 'templates/my', component: MyInterviewTemplatesComponent, canActivate: [AuthGuard] },
  { path: 'templates/create', component: InterviewTemplateEditPageComponent, canActivate: [AuthGuard] },
  { path: 'templates/:id', component: InterviewTemplatePageComponent },
  { path: 'templates/:id/edit', component: InterviewTemplateEditPageComponent, canActivate: [AuthGuard] },

  { path: 'my', component: MyInterviewsComponent, canActivate: [AuthGuard] },
  { path: 'create', component: InterviewEditPageComponent, canActivate: [AuthGuard] },
  { path: 'create/for-candidate-card/:cardId', component: InterviewEditPageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: InterviewPageComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: InterviewEditPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewsRoutingModule {}
