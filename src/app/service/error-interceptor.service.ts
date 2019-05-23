import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body) {
            console.log(evt.body);
          }
        }
      }
      ),
      catchError(err => {
        debugger;
        if (err.status === 401) {
          // auto logout if 401 response returned from api
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }));
  }
}
