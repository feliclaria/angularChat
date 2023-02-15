import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  logInForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmitLogInForm() {
    this.authService
      .logIn(this.logInForm.value.email!, this.logInForm.value.password!)
      .pipe(
        catchError((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/user-disabled':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              this.logInForm.setErrors({ invalidCredentials: true });
              break;
            default:
              break;
          }
          return of();
        })
      )
      .subscribe();
  }

  onClickLogInWithGoogle() {
    this.authService.logInWithGoogle().subscribe();
  }
}
