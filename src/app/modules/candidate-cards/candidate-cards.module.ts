import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidate-cards-routing.module';
import { CandidateCardViewComponent } from './components/candidate-card-view/candidate-card-view.component';
import { SharedModule } from '@shared/shared.module';
import { CandidateCardsSharedModule } from '@modules/candidate-cards-shared/candidate-cards-shared.module';

@NgModule({
  declarations: [CandidateCardViewComponent],
  imports: [CommonModule, CandidatesRoutingModule, SharedModule, CandidateCardsSharedModule]
})
export class CandidateCardsModule {}
