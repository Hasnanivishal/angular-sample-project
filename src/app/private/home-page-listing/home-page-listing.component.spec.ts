import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageListingComponent } from './home-page-listing.component';
import { By } from '@angular/platform-browser';

describe('HomePageListingComponent', () => {
  let component: HomePageListingComponent;
  let fixture: ComponentFixture<HomePageListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageListingComponent]
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


  it('should show refect view based on @Input values', () => {
    component.selectedApi = 'Introduction';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.Intoduction'))).toBeDefined();
    fixture.detectChanges();
  });


  it('should render remove button on @Input value change', () => {
    component.selectedApi = 'SetUp';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.Intoduction'))).toBeDefined();
    fixture.detectChanges();
    const removeButton = fixture.debugElement.query(By.css('.buttonSetUp'));
    expect(removeButton).toBeDefined();
  });

  it('should emit selected value when removeAPI funtion called', () => {
    spyOn(component.removeApi, 'emit');
    fixture.detectChanges();
    component.removeSelectedApi('SetUp');
    fixture.detectChanges();
    expect(component.removeApi.emit).toHaveBeenCalled();
  });


});
