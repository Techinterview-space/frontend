import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateCardViewComponent } from './components/candidate-card-view/candidate-card-view.component';

const routes: Routes = [{ path: ':id', component: CandidateCardViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule {}
