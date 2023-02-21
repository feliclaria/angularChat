import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { getAuth, RecaptchaVerifier } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangeData, CountryISO } from '@capgo/ngx-intl-tel-input';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-phone-info',
  templateUrl: './phone-info.component.html',
  styleUrls: ['./phone-info.component.css']
})
export class PhoneInfoComponent implements AfterViewInit {
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() phoneEmitter: EventEmitter<ChangeData> = new EventEmitter<ChangeData>();

  private recaptchaVerifier?: RecaptchaVerifier;

  phoneInfoForm = this.formBuilder.group({
    phone: [<ChangeData>{}, [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  get ArgISO() {
    return CountryISO.Argentina;
  }

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

  onSendCodeSubmit() {
    const appVerifier = this.recaptchaVerifier!;
    const phoneE164 = this.phoneInfoForm.value.phone?.e164Number;

    this.authService.sendVerificationCode(phoneE164!, appVerifier).subscribe(() => {
      this.nextStep.emit();
      this.phoneEmitter.emit(this.phoneInfoForm.value.phone!);
    });
  }
}
