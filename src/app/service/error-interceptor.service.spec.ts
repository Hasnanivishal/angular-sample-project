// import { TestBed } from '@angular/core/testing';
// import { ErrorInterceptor } from './error-interceptor.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';


// fdescribe('ErrorInterceptorService', () => {

//     let errorInterceptor: ErrorInterceptor;

//     beforeEach(() => TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule],
//         providers: [ErrorInterceptor,
//             {
//                 provide: HTTP_INTERCEPTORS,
//                 useClass: ErrorInterceptor,
//                 multi: true
//             }]
//     }));

//     it('should be created', () => {
//         errorInterceptor = TestBed.get(ErrorInterceptor);
//         expect(errorInterceptor).toBeTruthy();
//     });

//     it('should remove request from HttpRequestArray', () => {
//         errorInterceptor.requests = [ new HttpRequest<any>('GET', '/'), new HttpRequest<any>('POST', '/', null),
//         new HttpRequest<any>('GET', '/'), new HttpRequest<any>('GET', '/') ];

//         errorInterceptor.removeRequest(new HttpRequest<any>('POST', '/', null));

//         expect(errorInterceptor.requests).not.toContain(new HttpRequest<any>('POST', '/', null));

//     });
// });
