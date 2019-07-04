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
import { PrivateRoutingModule } from '../private-routing.module';
import {
  MatMenuModule, MatIconModule, MatCardModule, MatButtonModule, MatDividerModule,
  MatListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomePageListingComponent } from '../home-page-listing/home-page-listing.component';
import { By } from '@angular/platform-browser';
import { NgModuleFactoryLoader } from '@angular/core';


class PrivateModule { }

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, LoginComponent, ErrorComponent, RegistrationComponent, HomeComponent, ProfileComponent,
        HomePageListingComponent],
      imports: [
        RouterTestingModule,
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
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
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


  // tslint:disable-next-line:max-line-length
  // it('should navigate to profile page if clicked profile navigation', async(inject([Router, Location], (router: Router, location: Location) => {
  //   spyOn(router, 'navigate');
  //   fixture.detectChanges();
  //   fixture.debugElement.query(By.css('.home')).nativeElement.click();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toEqual('');
  //   });

  // })
  // ));

  it('should navigate to home page if clicked home navigation', fakeAsync(() => {
    debugger;
    const router = TestBed.get(Router);
    const location = TestBed.get(Location);

    router.initialNavigation();

    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = { lazyModule: PrivateModule };

    router.resetConfig([
      { path: 'dashboard', loadChildren: 'lazyModule' },
    ]);

    const profileLink = fixture.debugElement.query(By.css('.profile')).nativeElement;
    expect(profileLink.text).toEqual('Profile');
    expect(profileLink.pathname).toEqual('/dashboard/profile');
    profileLink.click();

    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/dashboard/profile');

  }));


  xit('should Successfully logout', async(inject([Router], (router) => {
    spyOn(router, 'navigate');
    spyOn(component, 'logout').and.callThrough();
    expect(localStorage.getItem('authToken')).toEqual('1@3$5^7*9)');
    component.logout();
    expect(localStorage.length).toEqual(0);
    expect(component.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  })
  ));
});
