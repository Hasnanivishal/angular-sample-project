import { TestBed } from '@angular/core/testing';
import { AuthGuardService, UnAuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { RegistrationComponent } from '../registration/registration.component';

describe('AuthGuardService', () => {
  let authGuardServiceService: AuthGuardService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, ErrorComponent, RegistrationComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule],
      providers: [
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should be created', () => {
    authGuardServiceService = TestBed.get(AuthGuardService);
    expect(authGuardServiceService).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    localStorage.setItem('authToken', 'token123');
    const result = authGuardServiceService.canActivate(<any>{}, <any>{});
    expect(result).toBeTruthy();
  });

  it('should return false if user is not authenticated', () => {
    const result = authGuardServiceService.canActivate(<any>{}, <any>{});
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalsy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });
});


describe('UnAuthGuardService', () => {
  let unAuthGuardService: UnAuthGuardService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, ErrorComponent, RegistrationComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule],
      providers: [
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should be created', () => {
    unAuthGuardService = TestBed.get(UnAuthGuardService);
    expect(unAuthGuardService).toBeTruthy();
  });

  it('should return false if user is authenticated', () => {
    const result = unAuthGuardService.canActivate(<any>{}, <any>{});
    expect(result).toBeTruthy();
  });

  it('should return true if user is not authenticated', () => {
    localStorage.setItem('authToken', 'token123');
    const result = unAuthGuardService.canActivate(<any>{}, <any>{});
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/home']);
    expect(result).toBeFalsy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });
});
