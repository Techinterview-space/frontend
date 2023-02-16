import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesDashboardsRoutingModule } from './candidates-dashboards-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CandidatesBoardComponent } from './components/candidates-board/candidates-board.component';
import { BoardComponent } from './components/board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { MarkdownModule } from 'ngx-markdown';
import { BoardCardViewComponent } from './components/board-card-view/board-card-view.component';
import { AddCandidateCardDialogComponent } from './components/add-candidate-card-dialog/add-candidate-card-dialog.component';
import { CandidateCardsSharedModule } from '@modules/candidate-cards-shared/candidate-cards-shared.module';

@NgModule({
  declarations: [
    CandidatesBoardComponent,
    BoardComponent,
    CardModalComponent,
    BoardCardViewComponent,
    AddCandidateCardDialogComponent
  ],
  imports: [
    CommonModule,
    CandidatesDashboardsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MarkdownModule.forChild(),
    CandidateCardsSharedModule,
  ]
})
export class CandidatesDashboardsModule {}
