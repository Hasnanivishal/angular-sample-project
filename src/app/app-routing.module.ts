import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService, UnAuthGuardService } from './service/auth-guard.service';
import { ErrorComponent } from './error/error.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { BlogContentComponent } from './blogs/blog-content/blog-content.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'blogcontent/:id', component: BlogContentComponent },
  { path: 'getstarted', component: GetStartedComponent },
  { path: 'register', component: GetStartedComponent, canActivate: [UnAuthGuardService], data: { component_name: 'register' } },
  { path: 'login', component: GetStartedComponent, canActivate: [UnAuthGuardService], data: { component_name: 'login' } },
  { path: 'error', component: ErrorComponent },
  { path: 'dashboard', loadChildren: './private/private.module#PrivateModule', canActivate: [AuthGuardService] },

  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Empty-Path handler for weburl/ only
  { path: '**', component: ErrorComponent } // WildCard for weburl/anything except above
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
