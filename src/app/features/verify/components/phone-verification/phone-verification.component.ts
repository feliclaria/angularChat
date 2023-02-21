import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangeData } from '@capgo/ngx-intl-tel-input';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: []
})
export class PhoneVerificationComponent {
  @Input() phone?: ChangeData = {};

  phoneVerificationForm = this.formBuilder.group({
    code: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*')
      ]
    ]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  onValidateCodeSubmit() {
    this.authService.validatePhoneNumber(this.phoneVerificationForm.value.code!).subscribe();
  }
}
