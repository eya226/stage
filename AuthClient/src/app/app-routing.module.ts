import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RoleGuard } from './core/guards/role.guard';

import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { DashboardComponent as Post1DashboardComponent } from './post1/dashboard/dashboard.component';
import { DashboardComponent as Post2DashboardComponent } from './post2/dashboard/dashboard.component';
import { DashboardComponent as Post3DashboardComponent } from './post3/dashboard/dashboard.component';
import { DashboardComponent as Post4DashboardComponent } from './post4/dashboard/dashboard.component';
import { DashboardComponent as Post5DashboardComponent } from './post5/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'post1',
    component: Post1DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'post1' }
  },
  {
    path: 'post2',
    component: Post2DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'post2' }
  },
  {
    path: 'post3',
    component: Post3DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'post3' }
  },
  {
    path: 'post4',
    component: Post4DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'post4' }
  },
  {
    path: 'post5',
    component: Post5DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'post5' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
