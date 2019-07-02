import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-page-listing',
  templateUrl: './home-page-listing.component.html',
  styleUrls: ['./home-page-listing.component.css']
})
export class HomePageListingComponent implements OnInit {

  @Input() selectedApi: any;
  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    console.log("value is///", this.selectedApi);
  }

}
