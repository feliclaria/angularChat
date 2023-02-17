import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryISO } from '@capgo/ngx-intl-tel-input';
import { finalize, map, Observable, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  ArgISO = CountryISO.Argentina;

  currentForm = 'phoneNumber';

  resendOn = false;

  resendTimer$!: Observable<Date>;

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
        Validators.pattern(/\d/)
      ]
    ]
  });

  constructor(private formBuilder: FormBuilder) {}

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

  startTimer() {
    this.resendTimer$ = timer(0, 1000).pipe(
      map((value) => 3 - value),
      takeWhile((value) => value > 0),
      map((value) => new Date(1000 * value)),
      finalize(() => (this.resendOn = true))
    );
  }

  onSendCodeSubmit() {
    this.startTimer();
    this.currentForm = 'verificationCode';
  }

  onValidateCodeSubmit() {
    console.log('Verified');
  }

  onResendCodeClick() {
    this.startTimer();
    this.resendOn = false;
  }
}
