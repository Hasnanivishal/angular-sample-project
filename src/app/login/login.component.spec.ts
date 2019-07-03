import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
import { RegistrationComponent } from '../registration/registration.component';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let guestUserService: any;
    let guestUserServiceSpy: any;

    beforeEach(async(() => {
        guestUserService = jasmine.createSpyObj('GuestUserService', ['login']);

        TestBed.configureTestingModule({
            declarations: [LoginComponent, ErrorComponent, RegistrationComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                HttpClientModule,
                AppRoutingModule,
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should make form invalid if submitted with any user inputs', () => {
        component.submitRegistrationForm();
        expect(component.loginForm.valid).toBeFalsy();
    });

    it('should validate user name', () => {
        const username = component.loginForm.controls['username'];
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
        const password = component.loginForm.controls['password'];
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


    it('should validate validateAllFields method', () => {
        component.validateAllFields(component.loginForm);

        const username = component.loginForm.controls['username'];
        expect(username.hasError('required')).toBeTruthy();

        const password = component.loginForm.controls['password'];
        expect(password.hasError('required')).toBeTruthy();
    });


    it('should Successfully Submit Registration Form', async(inject([Router], (router: { navigate: any; }) => {
        // tslint:disable-next-line:max-line-length
        guestUserServiceSpy = guestUserService.login.and.returnValue(of({ token: 'DummyTokenIsSent' }));

        spyOn(router, 'navigate');
        spyOn(component, 'submitRegistrationForm').and.callThrough();

        component.loginForm.controls['username'].setValue('hasnani@vishal.com');
        component.loginForm.controls['password'].setValue('12345678');

        component.submitRegistrationForm();

        expect(component.submitRegistrationForm).toHaveBeenCalled();
        expect(component.loginForm.invalid).toBe(false);

        expect(guestUserService).toBeDefined();
        expect(guestUserServiceSpy).toBeDefined();
        expect(guestUserServiceSpy).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard/home']);
    })
    ));

    it('should UnSuccessfully Submit Registration Form', async(inject([Router], (router: { navigate: any; }) => {
        guestUserServiceSpy = guestUserService.login.and.returnValue(throwError(new Error('Some Error occured!')));

        spyOn(router, 'navigate');
        spyOn(component, 'submitRegistrationForm').and.callThrough();

        component.loginForm.controls['username'].setValue('hasnani@vishal.com');
        component.loginForm.controls['password'].setValue('12345678');

        component.submitRegistrationForm();

        expect(component.submitRegistrationForm).toHaveBeenCalled();
        expect(component.loginForm.invalid).toBe(false);

        expect(guestUserService).toBeDefined();
        expect(guestUserServiceSpy).toBeDefined();
        expect(guestUserServiceSpy).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/error']);
    })
    ));
});
