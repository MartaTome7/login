import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { HttpAuthenticationService } from '../httpauthentication.service';
import { HttpAlertService } from '../alert/httpalert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpAuthenticationService: HttpAuthenticationService,
    private httpAlertService: HttpAlertService
  ) {
    // redirect to home if already logged in
    // if (this.httpAuthenticationService.userValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  onFocus() {
    this.httpAlertService.clear();
  }

  onSubmit() {
    this.httpAlertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.httpAuthenticationService
      .login(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          //
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.httpAlertService.error('Username ou password incorrecto.');
          } else {
            this.httpAlertService.error(error.message);
          }
          this.loading = false;
        },
        complete: () => {
          //console.error('Request completed');
          this.router.navigate([this.returnUrl]);
        },
      });
  }
}
