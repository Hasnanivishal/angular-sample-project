import { Component, OnInit } from '@angular/core';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullName: any;
  username: any;
  time: string;

  constructor(private guestUserService: GuestUserService, private router: Router) { }

  ngOnInit() {

    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      this.time = 'Morning';
    } else if (curHr < 18) {
      this.time = 'Afternoon';
    } else {
      this.time = 'Evening';
    }


    this.guestUserService.getData().subscribe(
      (result) => {
        console.log(result);
        this.fullName = result['data']['firstname'] + ' ' + result['data']['lastname'];
        this.username = result['data']['username'];
      }
    );
  }

  logout() {
    //debugger;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
