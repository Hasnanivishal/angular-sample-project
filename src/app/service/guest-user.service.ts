import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestUserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/account';

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

  getData() {
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.http.get(this.url + '/getData');
  }

  update(Client: any) {
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.http.post(this.url + '/update', Client);
  }
}
