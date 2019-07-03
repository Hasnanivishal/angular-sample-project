import { Component, ChangeDetectorRef } from '@angular/core';
import { GuestUserService } from './service/guest-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private cdref: ChangeDetectorRef, public guestUserService: GuestUserService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
 