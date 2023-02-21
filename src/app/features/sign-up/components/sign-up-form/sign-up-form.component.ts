import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type FormStep = 'account' | 'personalInfo';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: []
})
export class SignUpFormComponent {
  private currentStepBs: BehaviorSubject<FormStep> = new BehaviorSubject<FormStep>('account');

  currentStep$: Observable<FormStep> = this.currentStepBs.asObservable();

  constructor() {}

  nextStep() {
    this.currentStepBs.next('personalInfo');
  }
}
