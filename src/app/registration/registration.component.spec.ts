import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestUserService } from '../service/guest-user.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpResponse } from '@angular/common/http';
import { JwtInterceptor } from '../service/jwt-interceptor.service';
import { ErrorInterceptor } from '../service/error-interceptor.service';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { APP_BASE_HREF } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ErrorComponent } from '../error/error.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';

xdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let guestUserService: any;
  let guestUserServiceSpy: any;

  beforeEach(async(() => {
    guestUserService = jasmine.createSpyObj('GuestUserService', ['create']);

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent, LoginComponent, ErrorComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: GuestUserService, useValue: guestUserService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make form invalid if submitted with any user inputs', () => {
    component.submitRegistrationForm();
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('should validate first name', () => {
    const firstName = component.profileForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTruthy();

    firstName.setValue('1222222222%^&$$$');
    expect(firstName.hasError('required')).toBeFalsy();
    expect(firstName.hasError('pattern')).toBeTruthy();

    firstName.setValue('Vishal');
    expect(firstName.hasError('required')).toBeFalsy();
    expect(firstName.hasError('pattern')).toBeFalsy();
  });

  it('should validate last name', () => {
    const lastName = component.profileForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTruthy();

    lastName.setValue('1222222222%^&$$$');
    expect(lastName.hasError('required')).toBeFalsy();
    expect(lastName.hasError('pattern')).toBeTruthy();

    lastName.setValue('Hasnani');
    expect(lastName.hasError('required')).toBeFalsy();
    expect(lastName.hasError('pattern')).toBeFalsy();
  });

  it('should validate user name', () => {
    const username = component.profileForm.controls['username'];
    expect(username.valid).toBeFalsy();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();

    username.setValue('hasnani vishal @ gmail .com');
    expect(username.hasError('required')).toBeFalsy();
    expect(username.hasError('email')).toBeTruthy();

    username.setValue('hasnanivishal@gmail.com');
    expect(username.hasError('required')).toBeFalsy();
    expect(username.hasError('email')).toBeFalsy();
  });

  it('should validate password', () => {
    const password = component.profileForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('123');
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeTruthy();

    password.setValue('12345678');
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeFalsy();
  });

  it('should validate confirm password', () => {
    const confirmPassword = component.profileForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeFalsy();

    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTruthy();

    const password = component.profileForm.controls['password'];
    password.setValue('12345679');

    confirmPassword.setValue('12345678');
    expect(confirmPassword.hasError('required')).toBeFalsy();
    expect(confirmPassword.hasError('mustMatch')).toBeTruthy();

    confirmPassword.setValue('12345679');
    expect(confirmPassword.hasError('required')).toBeFalsy();
    expect(confirmPassword.hasError('mustMatch')).toBeFalsy();
  });


  it('should validate validateAllFields method', () => {
     component.validateAllFields(component.profileForm);

     const firstName = component.profileForm.controls['firstName'];
     expect(firstName.hasError('required')).toBeTruthy();

     const lastName = component.profileForm.controls['lastName'];
     expect(lastName.hasError('required')).toBeTruthy();

     const username = component.profileForm.controls['username'];
     expect(username.hasError('required')).toBeTruthy();

     const password = component.profileForm.controls['password'];
     expect(password.hasError('required')).toBeTruthy();

     const confirmPassword = component.profileForm.controls['confirmPassword'];
     expect(confirmPassword.hasError('required')).toBeTruthy();
  });


  it('should Successfully Submit Registration Form', async(inject([Router], (router) => {
    // tslint:disable-next-line:max-line-length
    guestUserServiceSpy = guestUserService.create.and.returnValue(of(new HttpResponse({ status: 200, body: { result: 'Registered Successfully' } })));

    spyOn(router, 'navigate');
    spyOn(component, 'submitRegistrationForm').and.callThrough();

    component.profileForm.controls['firstName'].setValue('Vishal');
    component.profileForm.controls['lastName'].setValue('Hasnani');
    component.profileForm.controls['username'].setValue('hasnani@vishal.com');
    component.profileForm.controls['password'].setValue('12345678');
    component.profileForm.controls['confirmPassword'].setValue('12345678');

    component.submitRegistrationForm();

    expect(component.submitRegistrationForm).toHaveBeenCalled();
    expect(component.profileForm.invalid).toBe(false);

    expect(guestUserService).toBeDefined();
    expect(guestUserServiceSpy).toBeDefined();
    expect(guestUserServiceSpy).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
     })
  ));

  it('should UnSuccessfully Submit Registration Form', async(inject([Router], (router) => {
    guestUserServiceSpy = guestUserService.create.and.returnValue(throwError(new Error('Some Error occured!')));

    spyOn(router, 'navigate');
    spyOn(component, 'submitRegistrationForm').and.callThrough();

    component.profileForm.controls['firstName'].setValue('Vishal');
    component.profileForm.controls['lastName'].setValue('Hasnani');
    component.profileForm.controls['username'].setValue('hasnani@vishal.com');
    component.profileForm.controls['password'].setValue('12345678');
    component.profileForm.controls['confirmPassword'].setValue('12345678');

    component.submitRegistrationForm();

    expect(component.submitRegistrationForm).toHaveBeenCalled();
    expect(component.profileForm.invalid).toBe(false);

    expect(guestUserService).toBeDefined();
    expect(guestUserServiceSpy).toBeDefined();
    expect(guestUserServiceSpy).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/error']);
    })
  ));
});
