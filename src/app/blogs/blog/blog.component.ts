import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { COMPONENT_LEVEL_VALUE, COMPONENT_LEVEL_SELF, COMPONENT_LEVEL_SKIP_SELF, COMMON_VALUE } from 'src/app/app.config';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [
  { provide: COMPONENT_LEVEL_VALUE, useValue: 'BlogComponent' },
  { provide: COMPONENT_LEVEL_SKIP_SELF, useValue: 'BlogComponent' }],
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

  constructor(private guestUserService: GuestUserService,
    @Inject(COMMON_VALUE) public title: string,
    @Inject(COMPONENT_LEVEL_VALUE) public title1: string) { }

  ngOnInit() {

    this.getBlogContents();
    this.guestUserService.blogs().subscribe(
      result => {
        this.blogs = result;
        console.log('COMMON_VALUE', this.title);
        console.log('COMPONENT_LEVEL_VALUE', this.title1);
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
