import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GuestUserService } from './guest-user.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private guestUserService: GuestUserService, private router: Router) { }

  private requests: HttpRequest<any>[] = [];

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);

    }
    console.log(i, this.requests.length);
    this.guestUserService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger;
    this.requests.push(req);
    this.guestUserService.isLoading.next(true);

    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            if (err.status === 401) {
              // auto logout if 401 response returned from api
            }
            if (err.error) {
              this.router.navigate(['/error']);
              return throwError(new Error(err.error.message));
            } else {
              const error = err.message || err.statusText;
              return throwError(new Error(`${error}`));
            }
          },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
