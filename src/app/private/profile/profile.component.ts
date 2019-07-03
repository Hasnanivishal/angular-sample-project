import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { Router } from '@angular/router';

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
    this.guestUserService.getData().subscribe(
      (result) => {
        this.profileForm = this.fb.group({
          firstName: [result['data']['firstname'], Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
          lastName: [result['data']['lastname'], Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
          username: [{ value: result['data']['username'], disabled: true }, Validators.compose([Validators.required, Validators.email])]
        });
        this.imageURL = result['data']['imageFile'];
      }
    );
  }


  handleFileInput(files: FileList) {
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

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.updateProfile) {
      if (!window.confirm('Are you sure you wanna leave this page the changes may lost.')) {
        // canncel detortion of component
        this.router.navigate(['/dashboard/profile']);
      }
    }
  }
}
