import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: []
})
export class LogInComponent {
  logInForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  onSubmitLogInForm() {
    if (!this.logInForm.value.email || !this.logInForm.value.password) {
      this.logInForm.setErrors({ invalidCredentials: true });
    } else {
      this.authService
        .logIn(this.logInForm.value.email, this.logInForm.value.password)
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
  }

  onClickLogInWithGoogle() {
    this.authService.logInWithGoogle().subscribe();
  }
}
