import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

type FormStep = 'account' | 'personalInfo';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: []
})
export class SignUpFormComponent {
  showPassword: boolean = false;

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
      ]
    ]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSignUpSubmit() {
    const formValues = this.signUpForm.value;
    if (!formValues.username || !formValues.email || !formValues.password) return;

    this.authService
      .createAccount(formValues.username, formValues.email, formValues.password)
      .subscribe();
  }

  onJoinWithGoogleClick() {
    this.authService.logInWithGoogle().subscribe();
  }
}
