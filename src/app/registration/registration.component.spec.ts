import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { GuestUserService } from '../service/guest-user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../service/jwt-interceptor.service';
import { ErrorInterceptor } from '../service/error-interceptor.service';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { APP_BASE_HREF } from '@angular/common';
import { Observable, of  } from 'rxjs';


fdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  //let guestUserService: GuestUserService;
  let guestUserServiceSpy;

  beforeEach(async(() => {

    // Create a fake TwainService object with a `getQuote()` spy
   const guestUserService = jasmine.createSpyObj('GuestUserService', ['create']);

    // Make the spy return a synchronous Observable with the test data
    guestUserServiceSpy = guestUserService.create.and.returnValue( of({
      "result":"Passed"
    }) );

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent, LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule
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

    // guestUserService = TestBed.get(GuestUserService); 
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('firstName field validity', () => {
    let firstName = component.profileForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    firstName.setValue("");
    expect(firstName.hasError('required')).toBeTruthy();

    firstName.setValue("1222222222%^&$$$");
    expect(firstName.hasError('pattern')).toBeTruthy();

    firstName.setValue("Vishal Hasnani");
    expect(firstName.hasError('pattern')).toBeFalsy();
  });

  it('username field validity', () => {
    let username = component.profileForm.controls['username'];
    expect(username.valid).toBeFalsy();

    username.setValue("");
    expect(username.hasError('required')).toBeTruthy();

    username.setValue("vishal hansnai @ gamil . com");
    expect(username.hasError('email')).toBeTruthy();

    username.setValue("VishalHasnani@gmail.com");
    expect(username.hasError('email')).toBeFalsy();
  });

  it('MustMatch function', () => {
    let password = component.profileForm.controls['password'];
    let confirmPassword = component.profileForm.controls['confirmPassword'];
    password.setValue("12345678910");
    confirmPassword.setValue("12345678910");
    component.MustMatch('password', 'confirmPassword');
    expect(confirmPassword.hasError('mustMatch')).toBeFalsy();
  });

  it('validate All Fields', () => {
    component.validateAllFields(component.profileForm);
  });


  // it('should submit Registration Form', inject([Router], (router: Router) => {

  //   spyOn(component, 'submitRegistrationForm');
  //   //spyOn(guestUserService, 'create').and.returnValue(of({'result': 'passed'}));
  //   spyOn(router, 'navigate').and.stub();

  //   //expect(guestUserService).toBeDefined();

  //   component.profileForm.controls['firstName'].setValue('Vishal');
  //   component.profileForm.controls['lastName'].setValue('Hasnani');
  //   component.profileForm.controls['username'].setValue('hasnani@vishal.com');
  //   component.profileForm.controls['password'].setValue('12345678');
  //   component.profileForm.controls['confirmPassword'].setValue('12345678');

   
  //   debugger;
  //   component.submitRegistrationForm();

  //   expect(guestUserServiceSpy.calls.any()).toBe(true, 'create called');
  //   expect(component.submitRegistrationForm).toHaveBeenCalled();
  //   expect(component.profileForm.invalid).toBe(false);
    
  //  // expect(router.navigate).toHaveBeenCalledWith(['/login']);


  // }));





});
