import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let guestUserService: any;
  let guestUserServiceSpy: any;
  let location: Location;

  beforeEach(async(() => {
    guestUserService = jasmine.createSpyObj('GuestUserService', ['getData', 'update']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, ProfileComponent, DashboardComponent, HomePageListingComponent,
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        ErrorComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'error', component: ErrorComponent },
        ]),
        CommonModule,
        ReactiveFormsModule,
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
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [

        { provide: GuestUserService, useValue: guestUserService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
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

  it('should update user profile', () => {
    component.updateProfile = true;
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

    fixture.detectChanges();
    component.fileToUpload = <File>fileList.item(0);
    component.profileForm.controls['firstName'].setValue('Vishal');
    component.profileForm.controls['lastName'].setValue('Hasnani');

    guestUserServiceSpy = guestUserService.update.and.returnValue(of({
      result: { message: 'Updated Succesfully!!!' }
    }));

    component.submitRegistrationForm();

    fixture.detectChanges();
    expect(component.updateProfile).toBeFalsy();
    fixture.detectChanges();

  });

  it('should redirect to error page if error occured in updating user profile', fakeAsync(() => {
    component.updateProfile = true;
    const fileList = {
      0: null,
      length: 1,
      item: function (index) { return null; }
    };

    fixture.detectChanges();
    component.fileToUpload = <File>fileList.item(0);
    component.profileForm.controls['firstName'].setValue('');
    component.profileForm.controls['lastName'].setValue('');

    guestUserServiceSpy = guestUserService.update.and.returnValue(throwError(new Error('Some Error occured!')));

    component.submitRegistrationForm();

    tick();
    expect(location.path()).toBe('/error');
    fixture.detectChanges();

  }));


  it('should show alert if incorrect file uploaded', () => {
    component.updateProfile = true;
    const file = {
      name: 'test.png',
      size: 90000,
      type: 'svg+xml/png'
    };

    const fileList = {
      0: file,
      length: 1,
      item: function (index) { return file; }
    };

    fixture.detectChanges();
    spyOn(window, 'alert');
    const imageFile = fixture.debugElement.query(By.css('.inputFile'));
    component.imageFile = imageFile;

    fixture.detectChanges();
    expect(component.fileToUpload).toBeNull();
    component.handleFileInput(fileList);
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Invalid File');
    expect(component.fileToUpload).toBeNull();
  });

});
