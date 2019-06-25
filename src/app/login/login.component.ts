import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestUserService } from '../service/guest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  });


  constructor(private fb: FormBuilder, private router: Router, private guestUserService: GuestUserService) { }

  ngOnInit() {
  }


  submitRegistrationForm() {
    if (this.loginForm.valid) {
      // send a http request to save this data
      this.guestUserService.login(this.loginForm.value).subscribe(
        result => {
          if (result) {
          // if (result['token']) {
            localStorage.setItem('authToken', result['token']);
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          console.log('error', error.message);
          this.router.navigate(['/error']);
        }
      );
    } else {
      this.validateAllFields(this.loginForm);
    }
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
}
