import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { Router, CanDeactivate } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private guestUserService: GuestUserService, private router: Router) { }

  profileForm: FormGroup;
  updateProfile = false;
  fileToUpload: File = null;
  imageURL: any;
  @ViewChild('imageFile', { static: false }) imageFile: ElementRef;

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.guestUserService.getData().subscribe(
      result => {
        this.profileForm = this.fb.group({
          firstName: [result['data']['firstname'], Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
          lastName: [result['data']['lastname'], Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
          username: [{ value: result['data']['username'], disabled: true }, Validators.compose([Validators.required, Validators.email])]
        });
        this.imageURL = result['data']['imageFile'];
      }
    );
  }

  handleFileInput(files: any) {
    const selectedImagefile = files.item(0);
    // check for size should be less then 500kb and image type should be image
    if (selectedImagefile.size < 500000 && selectedImagefile.type.includes('image/')) {
      this.fileToUpload = selectedImagefile;
    } else {

      alert('Invalid File');
      this.imageFile.nativeElement.value = '';
    }

  }

  submitRegistrationForm() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);

    Object.entries(this.profileForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    );

    this.guestUserService.update(formData).subscribe(
      result => {
        if (result['result']) {
          this.updateProfile = false;

        }
      },
      error => {
        console.log('error', error.message);
        this.router.navigate(['/error']);
      }

    );
  }
}



@Injectable({
    providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<ProfileComponent> {
  canDeactivate(component: ProfileComponent): boolean {
    if (component.updateProfile) {
      if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
