import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesBoardComponent } from './components/candidates-board/candidates-board.component';

const routes: Routes = [{ path: ':id/recruitment-pipeline', component: CandidatesBoardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesDashboardsRoutingModule {}
