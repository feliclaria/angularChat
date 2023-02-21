import { Component } from '@angular/core';
import { ChangeData } from '@capgo/ngx-intl-tel-input';
import { BehaviorSubject, Observable } from 'rxjs';

type FormStep = 'phoneInfo' | 'phoneVerification';

@Component({
  selector: 'app-verify-form',
  templateUrl: './verify-form.component.html',
  styleUrls: []
})
export class VerifyFormComponent {
  private currentStepBs: BehaviorSubject<FormStep> = new BehaviorSubject<FormStep>('phoneInfo');

  currentStep$: Observable<FormStep> = this.currentStepBs.asObservable();

  phoneInfo: ChangeData = {};

  constructor() {}

  setPhoneInfo(phone: ChangeData) {
    this.phoneInfo = phone;
  }

  nextStep(currentStep: string) {
    switch (currentStep) {
      case 'phoneInfoStep':
        this.currentStepBs.next('phoneVerification');
        break;
    }
  }
}
