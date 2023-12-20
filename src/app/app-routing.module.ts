import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { AdminComponent } from './componets/admin/admin.component';
import { PrivateComponent } from './componets/private/private.component';
import { LoginComponent } from './componets/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';

const routes: Routes = [
  { path: '**', pathMatch: 'full', redirectTo: 'path' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[RolGuard], data:{expectedRole: 'admin'} },
  { path: 'private', component: PrivateComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
