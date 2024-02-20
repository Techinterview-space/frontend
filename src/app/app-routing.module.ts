import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { environment } from '@environments/environment';
import { MaintenanceComponent } from '@components/maintenance/maintenance.component';

const appRoutes: Routes = [
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
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'salaries',
    loadChildren: () => import('./modules/salaries/salaries.module').then((m) => m.SalariesModule)
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

const routes: Routes = [
  { path: 'maintenance', component: MaintenanceComponent },
];

if (environment.isUnderMaintenance) {
  routes.push({ path: '**', redirectTo: 'maintenance', pathMatch: 'full' });
} else {
  routes.push(...appRoutes);
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
