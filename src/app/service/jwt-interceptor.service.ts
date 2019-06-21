import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: token
        }
      });
    }
    console.log("Request is",request );
    return next.handle(request);
  }
}
