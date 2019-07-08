import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor() { }
  htmlValue: any;

  onValueChange(event: { markDown: any; html: any; }) {
    console.log(event.markDown); // this should print markdown which user entered
    console.log(event.html); // this should print html output for the markdown
  }
}
