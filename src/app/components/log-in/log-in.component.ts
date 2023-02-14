import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  logInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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
    this.authService.logIn(this.email!, this.password!).subscribe();
  }

  onClick() {
    this.authService.logInWithGoogle().subscribe();
  }
}
