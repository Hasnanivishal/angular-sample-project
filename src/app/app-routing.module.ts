import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService, UnAuthGuardService } from './service/auth-guard.service';
import { ErrorComponent } from './error/error.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { BlogHomeComponent } from './blogs/blog-home/blog-home.component';
import { ContactComponent } from './blogs/contact/contact.component';
import { AboutComponent } from './blogs/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'blog', component: BlogComponent, children: [
      { path: 'home', component: BlogHomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent }]
  },
  { path: 'register', component: RegistrationComponent, canActivate: [UnAuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuardService] },
  { path: 'error', component: ErrorComponent },
  { path: 'dashboard', loadChildren: './private/private.module#PrivateModule', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
