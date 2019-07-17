import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './service/jwt-interceptor.service';
import { ErrorInterceptor } from './service/error-interceptor.service';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { CcMarkDownDirective } from './directives/cc-mark-down.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BlogComponent } from './blogs/blog/blog.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BlogContentComponent } from './blogs/blog-content/blog-content.component';
import { COMMON_VALUE, COMPONENT_LEVEL_VALUE, COMPONENT_LEVEL_SELF, COMPONENT_LEVEL_SKIP_SELF } from './app.config';




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ErrorComponent,
    CcMarkDownDirective,
    BlogComponent,
    GetStartedComponent,
    BlogContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: COMMON_VALUE, useValue: 'AppModule' },
    { provide: COMPONENT_LEVEL_VALUE, useValue: 'AppModule' },
    { provide: COMPONENT_LEVEL_SELF, useValue: 'AppModule' },
    { provide: COMPONENT_LEVEL_SKIP_SELF, useValue: 'AppModule' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
