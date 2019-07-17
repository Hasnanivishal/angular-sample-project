import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, Input, Host, Optional } from '@angular/core';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { ErrorComponent } from 'src/app/error/error.component';
import { HomePageListingComponent } from '../home-page-listing/home-page-listing.component';
import { LoggerService } from 'src/app/service/logger.service';

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
  @ViewChild(HomePageListingComponent, { static: true }) homePageListingComponent: HomePageListingComponent;

  currentAdIndex = -1;
  interval: any;
  usersData: any;

  constructor(private guestUserService: GuestUserService, private componentFactoryResolver: ComponentFactoryResolver,
    @Host()     // limit search for logger; hides the application-wide logger
    @Optional() // ok if the logger doesn't exist
    private loggerService: LoggerService) {
    if (loggerService) {
      loggerService.logInfo('HomeComponent');
    }
  }

  ngOnInit() {
    this.getGreetingMessage();
    this.getUserDetails();

    this.guestUserService.dynamicSampleData().subscribe(
      result => {
        this.usersData = result;
        this.loadComponent();
        this.getAds();
      }
    );

    // console.log('child component', this.homePageListingComponent);
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 10000);
  }

  loadComponent() {
    this.currentAdIndex = Math.floor(Math.random() * (this.usersData['length'] - 1 + 1));
    const userData = this.usersData[this.currentAdIndex];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);

    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DynamicComponent>componentRef.instance).data = userData;
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

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    clearInterval(this.interval);
  }

}


@Component({
  selector: 'app-dynamic-component',
  template: `
  <div class="job-ad">
    <h3>Top Users</h3>
    <h4>{{data?.name}}</h4>
    <p>({{data?.position}} / {{data.office}})</p>
  </div>
`,
  styleUrls: ['./home.component.css']
})
export class DynamicComponent {

  @Input() data: any;
  constructor() {

  }

}
