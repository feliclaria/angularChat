import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

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

  constructor(private formBuilder: FormBuilder) {}

  onUpdatePasswordSubmit() {}
}
