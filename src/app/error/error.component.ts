import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor() { }
  htmlValue: any;

  onValueChange(event: { markDown: any; html: any; }) {
    console.log(event.markDown); // this should print markdown which user entered
    console.log(event.html);
    this.htmlValue = event.html; // this should print html output for the markdown
  }
}
