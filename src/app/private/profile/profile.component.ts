import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GuestUserService } from 'src/app/service/guest-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private guestUserService: GuestUserService) { }

  profileForm: FormGroup;

  updateProfile = false;
  fileToUpload: File = null;
  imageType: any;
  image: any;

  ngOnInit() {
    this.guestUserService.getData().subscribe(
      (result) => {
        // result['data']['firstname']
        this.profileForm = this.fb.group({
          firstName: [result['data']['firstname'], Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
          lastName: [result['data']['lastname'], Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
          username: [{ value: result['data']['username'], disabled: true }, Validators.compose([Validators.required, Validators.email])]
        });
        debugger;
        this.imageType = result['data']['imageFile']['mimetype'];
        this.image = result['data']['imageFile']['data'];
      }
    );
  }

  updateProfileForm() {
    this.updateProfile = true;
  }

  showProfile() {
    this.updateProfile = false;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

  }

  submitRegistrationForm() {
    
    console.log("data is...", this.profileForm.value);

    const formData: FormData = new FormData();
    // formData.append('formData', JSON.stringify(this.profileForm.value));
    formData.append('file', this.fileToUpload);

    Object.entries(this.profileForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    );

    this.guestUserService.update(formData).subscribe(
      (result) => {
        if (result['result']) {
          debugger;
          this.updateProfile = false;
         
        }
      }
    );
  }
}
