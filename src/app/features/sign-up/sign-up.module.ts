import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { AccountStepComponent } from './components/account-step/account-step.component';
import { PersonalInfoStepComponent } from './components/personal-info-step/personal-info-step.component';

@NgModule({
  declarations: [SignUpComponent, SignUpFormComponent, AccountStepComponent, PersonalInfoStepComponent],
  imports: [CommonModule, SignUpRoutingModule, SharedModule]
})
export class SignUpModule {}
