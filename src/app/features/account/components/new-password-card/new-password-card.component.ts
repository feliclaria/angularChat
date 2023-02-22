import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password-card',
  templateUrl: './new-password-card.component.html',
  styles: []
})
export class NewPasswordCardComponent {
  newPasswordForm = this.formBuilder.group({
    oldPassword: [''],
    newPassword: [
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

  onUpdatePasswordSubmit() {
    const values = this.newPasswordForm.value;
    if (!values.oldPassword || !values.newPassword) return;

    this.authService
      .changePassword(values.oldPassword, values.newPassword)
      .subscribe(() => this.newPasswordForm.reset());
  }
}
