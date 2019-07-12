import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GuestUserService } from 'src/app/service/guest-user.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.css']
})
export class BlogContentComponent implements OnInit {

  @Input() blogId: any;
  @Input() blogContents: any;
  @Output() closeSelectedBlog = new EventEmitter<boolean>();
  selectedblog: any;



  constructor() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.selectedblog = this.blogContents.filter((data: { [x: string]: any; }) => data['id'] === this.blogId)[0];
  }

  ngOnInit() {
  }

  closeBlog() {
    this.closeSelectedBlog.emit(true);
  }
}
