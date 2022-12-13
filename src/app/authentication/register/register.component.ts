import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { HttpAuthenticationService } from '../httpauthentication.service';
import { HttpAlertService } from '../alert/httpalert.service';
import { HttpRegisterService } from './httpregister.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../login/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;
  newUser: User;
  usersRoles = ['User', 'Administrator'];
  selectedUserRole: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpAuthenticationService: HttpAuthenticationService,
    private httpRegisterService: HttpRegisterService,
    private httpAlertService: HttpAlertService
  ) {
    // redirect to home if already logged in
    if (this.httpAuthenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.selectedUserRole = this.usersRoles[0];
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.registerForm.controls;
  }

  onFocus() {
    this.httpAlertService.clear();
  }

  onSubmit() {
    this.httpAlertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.newUser = {
      username: this.formControls.username.value,
      password: this.formControls.password.value,
      fullName:
        this.formControls.firstName.value +
        ' ' +
        this.formControls.lastName.value,
      userRole: this.selectedUserRole,
    };

    console.log(this.newUser);

    this.httpRegisterService
      .register(this.newUser)
      .pipe(first())
      .subscribe({
        next: () => {
          //
        },
        error: (error: HttpErrorResponse) => {
          this.httpAlertService.error(error.message);
          this.loading = false;
        },
        complete: () => {
          this.httpAlertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
      });
  }
}
