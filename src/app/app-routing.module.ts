import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService, UnAuthGuardService } from './service/auth-guard.service';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', component: RegistrationComponent},
  {path: 'register', component: RegistrationComponent, canActivate: [UnAuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [UnAuthGuardService]},
  {path: 'error', component: ErrorComponent},
  {path: 'dashboard', loadChildren: './private/private.module#PrivateModule' , canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
