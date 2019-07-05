import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/login/login.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import { Location, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatMenuModule, MatIconModule, MatCardModule, MatButtonModule, MatDividerModule,
  MatListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomePageListingComponent } from '../home-page-listing/home-page-listing.component';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let location: Location;
  let router: Router;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, LoginComponent, ErrorComponent, RegistrationComponent, HomeComponent, ProfileComponent,
        HomePageListingComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard/profile', component: ProfileComponent },
          { path: 'dashboard/home', component: HomeComponent },
          { path: 'login', component: LoginComponent },
        ]),
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('authToken', '1@3$5^7*9)');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain router outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });


  it('should navigate to profile page if clicked profile navigation', fakeAsync(() => {
    const profileLink = fixture.debugElement.query(By.css('.profile')).nativeElement;
    expect(profileLink.text).toEqual('Profile');
    expect(profileLink.pathname).toEqual('/dashboard/profile');
    profileLink.click();
    tick();
    expect(location.path()).toBe('/dashboard/profile');
  }
  ));

  it('should navigate to home page if clicked home navigation', fakeAsync(() => {
    const homeLink = fixture.debugElement.query(By.css('.home')).nativeElement;
    expect(homeLink.text).toEqual('Home');
    expect(homeLink.pathname).toEqual('/dashboard/home');
    homeLink.click();
    tick();
    expect(location.path()).toBe('/dashboard/home');
  }
  ));

  it('should contain logout button', () => {
    const logoutLink = fixture.debugElement.query(By.css('.logout')).nativeElement;
    expect(logoutLink.text).toEqual('Logout');
  });


  it('should Successfully logout', fakeAsync(() => {
    spyOn(component, 'logout').and.callThrough();
    expect(localStorage.getItem('authToken')).toEqual('1@3$5^7*9)');
    component.logout();
    tick();
    expect(localStorage.length).toEqual(0);
    expect(component.logout).toHaveBeenCalled();
    expect(location.path()).toBe('/login');
    fixture.detectChanges();
  }));
});
