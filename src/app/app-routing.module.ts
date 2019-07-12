import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService, UnAuthGuardService } from './service/auth-guard.service';
import { ErrorComponent } from './error/error.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { GetStartedComponent } from './get-started/get-started.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'getstarted', component: GetStartedComponent },
  { path: 'register', component: GetStartedComponent, canActivate: [UnAuthGuardService], data: { component_name: 'register' } },
  { path: 'login', component: GetStartedComponent, canActivate: [UnAuthGuardService], data: { component_name: 'login' } },
  { path: 'error', component: ErrorComponent },
  { path: 'dashboard', loadChildren: './private/private.module#PrivateModule', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
