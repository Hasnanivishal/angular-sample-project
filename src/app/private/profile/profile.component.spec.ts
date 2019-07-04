import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrivateRoutingModule } from '../private-routing.module';
import {
  MatMenuModule, MatIconModule, MatCardModule, MatButtonModule,
  MatDividerModule, MatListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomePageListingComponent } from '../home-page-listing/home-page-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

xdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let guestUserService: any;
  let guestUserServiceSpy: any;

  beforeEach(async(() => {
    guestUserService = jasmine.createSpyObj('GuestUserService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, ProfileComponent, DashboardComponent, HomePageListingComponent,
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        ErrorComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        PrivateRoutingModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [

        { provide: GuestUserService, useValue: guestUserService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    guestUserServiceSpy = guestUserService.getData.and.returnValue(of({
      data: { firstname: 'ABC', lastname: 'XYZ', username: 'ABC@XYZ', imageFile: 'http://imagefile.XYZ.com' }
    }
    ));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user data and create profile form when getUserDetails called', () => {
    spyOn(component, 'getUserDetails').and.callThrough();
    component.getUserDetails();
    expect(guestUserService).toBeDefined();
    expect(guestUserServiceSpy).toBeDefined();
    expect(component.getUserDetails).toHaveBeenCalledTimes(1);
    expect(guestUserServiceSpy).toHaveBeenCalledTimes(1);
    expect(component.profileForm.valid).toBeTruthy();
    expect(component.profileForm.controls['username'].value).toEqual('ABC@XYZ');
  });

  it('should allow to edit user details if Edit button is clicked', () => {
    fixture.detectChanges();
    expect(component.updateProfile).toBeFalsy();
    const editButton = fixture.debugElement.query(By.css('.editButton')).nativeElement;
    editButton.click();
    expect(component.updateProfile).toBeTruthy();
  });

  it('should accept file if correct file uploaded', () => {
    const file = {
      name: 'test.png',
      size: 30000,
      type: 'image/png'
    };

    const fileList = {
      0: file,
      length: 1,
      item: function (index) { return file; }
    };
    expect(component.fileToUpload).toBeNull();
    component.handleFileInput(fileList);

    expect(component.fileToUpload.name).toEqual(file.name);
    expect(component.fileToUpload.type).toEqual(file.type);
    expect(component.fileToUpload.size).toEqual(file.size);

  });


  // it('should show alert if incorrect file uploaded', () => {
  //   const file = {
  //     name: 'test.png',
  //     size: 1130000,
  //     type: 'image/png'
  //   };

  //   const fileList = {
  //     0: file,
  //     length: 1,
  //     item: function (index) { return file; }
  //   };


  //   fixture.detectChanges();
  //   // const imageFile: ElementRef = fixture.componentInstance.imageFile;
  //   // expect(imageFile).toBeDefined();
  //   // component.imageFile = imageFile;

  //   fixture.detectChanges();
  //   expect(component.fileToUpload).toBeNull();
  //   component.handleFileInput(fileList);
  //   fixture.detectChanges();
  //   expect(window.alert).toHaveBeenCalledWith('Invalid File');
  //   expect(component.fileToUpload).toBeNull();

  // });

});
