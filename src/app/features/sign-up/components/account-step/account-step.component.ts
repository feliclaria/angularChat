import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-step',
  templateUrl: './account-step.component.html',
  styleUrls: []
})
export class AccountStepComponent {
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  showPassword: boolean = false;

  accountForm = this.formBuilder.group({
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
    this.authService
      .signUp(this.accountForm.value.email!, this.accountForm.value.password!)
      .subscribe(() => this.nextStep.emit());
  }

  onJoinWithGoogleClick() {
    this.authService.logInWithGoogle().subscribe(() => this.nextStep.emit());
  }
}
