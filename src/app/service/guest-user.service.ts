import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestUserService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  create(Client: any) {
    return this.http.post(this.baseUrl + 'account/register', Client);
  }


  login(Client: any) {
    return this.http.post(this.baseUrl + 'account/login', Client);
  }

  getData() {
    return this.http.get(this.baseUrl + 'userInfo/getData');
  }

  update(Client: any) {
    return this.http.post(this.baseUrl + 'userInfo/update', Client);
  }
}
