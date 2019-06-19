import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { GuestUserService } from '../service/guest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private guestUserService: GuestUserService, private router: Router) { }

  phoneNumbers: FormArray;

  profileForm = this.fb.group({
    firstName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
    lastName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])],
    username: ['', Validators.compose([Validators.required, Validators.email])],
    // phoneNumbers: this.fb.array([ this.createItem()]),
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    confirmPassword: ['', Validators.compose([Validators.required])]
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });


  ngOnInit() {
  }

  submitRegistrationForm() {
    if (this.profileForm.invalid) {
      this.validateAllFields(this.profileForm);
    } else {
      // send a http request to save this data
      this.guestUserService.create(this.profileForm.value).subscribe(
        result => {
          if (result) {
            console.log('result', result);
            this.router.navigate(['/login']);
          }

        },
        error => {
          console.log('error', error);
          this.router.navigate(['/error']);
        });
    }
  }



  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }


  createItem(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
    });
  }

  addItem(): void {
    this.phoneNumbers = this.profileForm.get('phoneNumbers') as FormArray;
    this.phoneNumbers.push(this.createItem());
  }

  removeItem(index): void {
    this.phoneNumbers = this.profileForm.get('phoneNumbers') as FormArray;
    this.phoneNumbers.removeAt(index);
  }
}
