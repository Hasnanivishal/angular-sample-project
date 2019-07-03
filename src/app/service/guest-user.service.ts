import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestUserService {

  public isLoading = new BehaviorSubject(false);
  
  constructor(private http: HttpClient) { }

  // url = 'http://localhost:3000/api/account';
  url = 'https://vishal-hasnani-node.herokuapp.com/api/account';

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
    this.url = 'https://vishal-hasnani-node.herokuapp.com/api/userInfo';
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.http.get(this.url + '/getData');
  }

  update(Client: any) {
    // tslint:disable-next-line:no-debugger
    this.url = ''; // 'https://vishal-hasnani-node.herokuapp.com/api/userInfo';
    return this.http.post(this.url + '/update', Client);
  }
}
