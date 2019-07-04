import { Component, OnInit } from '@angular/core';
import { GuestUserService } from 'src/app/service/guest-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullName: any;
  username: any;
  time: string;
  apiList = ['Introduction', 'SetUp', 'Architecture', 'Cheat Sheet'];
  selectedApi: any = 'Introduction';

  constructor(private guestUserService: GuestUserService) { }

  ngOnInit() {
    this.getGreetingMessage();
    this.getUserDetails();
  }

  getUserDetails() {
    // this.guestUserService.getData().subscribe(
    //   (result) => {
    //     this.fullName = result['data']['firstname'] + ' ' + result['data']['lastname'];
    //     this.username = result['data']['username'];
    //   }
    // );
  }

  getGreetingMessage() {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      this.time = 'Morning';
    } else if (curHr < 18) {
      this.time = 'Afternoon';
    } else {
      this.time = 'Evening';
    }
  }

  listClick(event, newValue) {
    this.selectedApi = newValue;
  }

  removeSelectedApi(event) {
    this.apiList.splice(this.apiList.indexOf(event), 1);
    this.selectedApi = 'Introduction';
  }

}
