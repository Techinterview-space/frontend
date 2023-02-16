import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardPartitialViewComponent } from './candidate-card-partitial-view/candidate-card-partitial-view.component';
import { SharedModule } from '@shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardInterviewsListComponent } from './card-interviews-list/card-interviews-list.component';
import { CardUserCommentComponent } from './card-user-comment/card-user-comment.component';
import { CardCommentFormComponent } from './card-comment-form/card-comment-form.component';
import { CardCvFilesListComponent } from './card-cv-files-list/card-cv-files-list.component';

const componentsToDeclareAndExport = [
  CandidateCardPartitialViewComponent,
  CardInterviewsListComponent,
  CardUserCommentComponent,
  CardCommentFormComponent,
  CardCvFilesListComponent
];

@NgModule({
  declarations: componentsToDeclareAndExport,
  exports: componentsToDeclareAndExport,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MarkdownModule.forChild(),
    NgSelectModule
  ]
})
export class CandidateCardsSharedModule {}
