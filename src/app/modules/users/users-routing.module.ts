import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyUserLabelsComponent } from './components/my-user-labels/my-user-labels.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  { path: ':id', component: UserPageComponent },
  { path: 'me/labels', component: MyUserLabelsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
