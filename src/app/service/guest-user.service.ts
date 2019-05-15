import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestUserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api';

  create(Client: any) {
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.http.post(this.url + '/register', Client);
  }


  login(Client: any) {
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.http.post(this.url + '/login', Client);
  }
}
