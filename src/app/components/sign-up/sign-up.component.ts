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
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
        ]
      ],
      confirmPassword: ['']
    },
    { validators: passwordsDontMatchValidator }
  );

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get name() {
    return this.signUpForm.value.name;
  }

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
    this.authService.signUp(this.name!, this.email!, this.password!).subscribe();
  }

  onClick() {
    this.authService.logInWithGoogle().subscribe();
  }
}
