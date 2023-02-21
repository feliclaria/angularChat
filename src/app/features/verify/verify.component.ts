import { Component, AfterViewInit } from '@angular/core';
import { getAuth, RecaptchaVerifier } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryISO } from '@capgo/ngx-intl-tel-input';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements AfterViewInit {
  ArgISO = CountryISO.Argentina;

  currentForm = 'phoneNumber';

  recaptchaVerifier: RecaptchaVerifier | undefined;

  phoneNumberForm = this.formBuilder.group({
    phone: [undefined, [Validators.required]]
  });

  verificationCodeForm = this.formBuilder.group({
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

  ngAfterViewInit() {
    this.recaptchaVerifier = new RecaptchaVerifier(
      'send-code-button',
      {
        'size': 'invisible',
        'callback': () => {
          this.onSendCodeSubmit();
        },
        'expired-callback': () => {}
      },
      getAuth()
    );
    this.recaptchaVerifier.render();
  }

  get phoneNumber(): string {
    if (!this.phoneNumberForm.value.phone) return '';
    const dialCode: string = this.phoneNumberForm.value.phone['dialCode'];
    const number: string = this.phoneNumberForm.value.phone['number'];
    return (
      dialCode +
      ' ' +
      number.substring(0, number.length - 3).replace(/\d/g, '*') +
      number.substring(number.length - 3, number.length)
    );
  }

  onSendCodeSubmit() {
    const appVerifier = this.recaptchaVerifier!;
    const phoneNumber: string = this.phoneNumberForm.value.phone!['e164Number'];
    this.authService.sendVerificationCode(phoneNumber, appVerifier).subscribe(() => {
      this.currentForm = 'verificationCode';
    });
  }

  onValidateCodeSubmit() {
    this.authService.validatePhoneNumber(this.verificationCodeForm.value.code!).subscribe(() => {
      this.currentForm = 'verifySuccess';
    });
  }
}
