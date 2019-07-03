import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageListingComponent } from './home-page-listing.component';

xdescribe('HomePageListingComponent', () => {
  let component: HomePageListingComponent;
  let fixture: ComponentFixture<HomePageListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
