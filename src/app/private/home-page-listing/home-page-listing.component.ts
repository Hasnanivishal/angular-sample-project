import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-page-listing',
  templateUrl: './home-page-listing.component.html',
  styleUrls: ['./home-page-listing.component.css']
})
export class HomePageListingComponent implements OnInit {

  @Input() selectedApi: any;

  @Output() removeApi = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  // ngOnChanges() {
  //   console.log("value is///", this.selectedApi);
  // }

  removeSelectedApi(api: string) {
    this.removeApi.emit(api);
  }

}
