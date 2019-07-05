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

  removeSelectedApi(api: string) {
    this.removeApi.emit(api);
  }

} 
