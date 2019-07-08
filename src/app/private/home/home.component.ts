import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { ErrorComponent } from 'src/app/error/error.component';

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
  @ViewChild(DynamicComponentDirective, { static: true }) dynamicComponentDirective: DynamicComponentDirective;

  constructor(private guestUserService: GuestUserService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

    this.getGreetingMessage();
    this.getUserDetails();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);

    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }


  getUserDetails() {
    this.guestUserService.getData().subscribe(
      (result) => {
        this.fullName = result['data']['firstname'] + ' ' + result['data']['lastname'];
        this.username = result['data']['username'];
      }
    );
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


@Component({
  selector: 'app-dynamic-component',
  template: '<h6>Dynamic Component</h6>'
})
export class DynamicComponent {

  constructor() {

  }

}
