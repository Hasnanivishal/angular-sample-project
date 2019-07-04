import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor.service';
import { of } from 'rxjs';

describe('JwtInterceptorService', () => {

  let jwtInterceptor: JwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      },
        JwtInterceptor]
    });
  });

  it('should be created', () => {
    jwtInterceptor = TestBed.get(JwtInterceptor);
    expect(jwtInterceptor).toBeTruthy();
  });

  it('should set header authorization if token available in local storage', (() => {
    const token = 'token_value';
    localStorage.setItem('authToken', token);
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('authorization')).toBeTruthy();
        expect(request.headers.get('authorization')).toEqual(token);
        return of({});
      }
    };
    const req = new HttpRequest<any>('GET', '/');
    jwtInterceptor.intercept(req, next).subscribe(obj => { });
  }));

  it('should set header authorization if token available in local storage', (() => {
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('authorization')).toBeFalsy();
        return of({});
      }
    };
    const req = new HttpRequest<any>('GET', '/');
    jwtInterceptor.intercept(req, next).subscribe(obj => { });
  }));


  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });
});
