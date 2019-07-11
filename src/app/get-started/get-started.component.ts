import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  @ViewChild('signUp', { static: true }) signUp: ElementRef;
  @ViewChild('signIn', { static: true }) signIn: ElementRef;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      if (result.component_name && result.component_name === 'login') {
        this.signIn.nativeElement.checked = true;
      } else {
        this.signUp.nativeElement.checked = true;
      }
    });
  }

}
