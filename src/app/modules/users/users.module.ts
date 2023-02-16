import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SharedModule } from '@shared/shared.module';
import { MyUserLabelsComponent } from './components/my-user-labels/my-user-labels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [UserPageComponent, MyUserLabelsComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, NgSelectModule]
})
export class UsersModule {}
