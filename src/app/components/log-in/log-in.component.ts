import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  serverError: string = '';

  logInForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.authService.logInErrors.subscribe((error) => {
      this.serverError = error;
    });
  }

  get email() {
    return this.logInForm.value.email;
  }

  get password() {
    return this.logInForm.value.password;
  }

  get formControls() {
    return this.logInForm.controls;
  }

  onSubmit() {
    this.authService.logIn(this.email, this.password);
  }

  onClick() {
    this.authService.logInWithGoogle();
  }
}
