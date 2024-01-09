import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'interviews',
    loadChildren: () => import('./modules/interviews/interviews.module').then((m) => m.InterviewsModule)
  },
  {
    path: 'organizations',
    loadChildren: () => import('./modules/organizations/organizations.module').then((m) => m.OrganizationsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'boards',
    loadChildren: () =>
      import('./modules/candidates-dashboards/candidates-dashboards.module').then((m) => m.CandidatesDashboardsModule)
  },
  {
    path: 'candidate-cards',
    loadChildren: () => import('./modules/candidate-cards/candidate-cards.module').then((m) => m.CandidateCardsModule)
  },
  {
    path: 'salaries',
    loadChildren: () => import('./modules/salaries/salaries.module').then((m) => m.SalariesModule)
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
