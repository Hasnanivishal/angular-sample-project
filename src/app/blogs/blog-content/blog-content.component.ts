import { Component, OnInit, Input, EventEmitter, Output, Inject, Host, Optional, Self, SkipSelf } from '@angular/core';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COMPONENT_LEVEL_VALUE, COMPONENT_LEVEL_SELF, COMPONENT_LEVEL_SKIP_SELF, COMMON_VALUE } from 'src/app/app.config';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.css'],
  providers: [
    { provide: COMPONENT_LEVEL_VALUE, useValue: 'BlogContentComponent' },
    { provide: COMPONENT_LEVEL_SELF, useValue: 'BlogContentComponent' },
    { provide: COMPONENT_LEVEL_SKIP_SELF, useValue: 'BlogContentComponent' }]
})
export class BlogContentComponent implements OnInit {

  @Input() blogId: any;
  @Input() blogContents: any;
  @Output() closeSelectedBlog = new EventEmitter<boolean>();
  selectedblog: any;



  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject(COMMON_VALUE) public title: string,
    @Inject(COMPONENT_LEVEL_VALUE) public title1: string,
    @Self()  @Inject(COMPONENT_LEVEL_SELF) public title2: string,
    @SkipSelf()  @Inject(COMPONENT_LEVEL_SKIP_SELF) public title3: string) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.selectedblog = this.blogContents.filter((data: { [x: string]: any; }) => data['id'] === this.blogId)[0];
  }

  ngOnInit() {
    console.log('COMMON_VALUE', this.title);
    console.log('COMPONENT_LEVEL_VALUE', this.title1);
    console.log('COMPONENT_LEVEL_SELF', this.title2);
    console.log('COMPONENT_LEVEL_SKIP_SELF', this.title3);
    this.route.paramMap.pipe(
      switchMap(params => {
        console.log('Recived id from `paramMap-observable` is', params.get('id'));
        return new Observable;
      })
    );
    console.log('Recived id from `Snapshot: the no-observable` is', this.route.snapshot.paramMap.get('id'));
  }

  closeBlog() {
    this.closeSelectedBlog.emit(true);
  }
}
