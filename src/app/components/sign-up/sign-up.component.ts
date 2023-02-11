import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

const passwordsDontMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { passwordsDontMatch: true };
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
        ]
      ],
      confirmPassword: ['']
    },
    { validators: passwordsDontMatchValidator }
  );

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get email() {
    return this.signUpForm.value.email;
  }

  get password() {
    return this.signUpForm.value.password;
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    if (!this.signUpForm.valid || !this.email || !this.password) {
      return;
    }

    this.authService.signUp(this.email, this.password);
  }

  onClick() {
    this.authService.logInWithGoogle();
  }
}
