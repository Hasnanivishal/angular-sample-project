import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { GuestUserService } from 'src/app/service/guest-user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '100%',
        opacity: 1,
        backgroundColor: 'white',
        cursor: 'pointer'
      })),
      state('closed', style({
        width: '98%',
        opacity: 0.5,
        // backgroundColor: 'grey',
        cursor: 'pointer'
      })),
      transition('* => *', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class BlogComponent implements OnInit {

  isOpen = true;
  blogs: any;
  blogId: any;
  blogContents: any;

  constructor(private guestUserService: GuestUserService) { }

  ngOnInit() {
    this.getBlogContents();
    this.guestUserService.blogs().subscribe(
      result => {
        this.blogs = result;
        console.log(this.blogs);
      }
    );
  }

  loadBlogContent(blog: any) {
    this.blogId = blog['id'];
  }

  getBlogContents() {
    this.guestUserService.blogContent().subscribe(
      result => {
        this.blogContents = result;
      }
    );
  }

  openBlogList(event: boolean) {
    this.isOpen = event;
  }
}
