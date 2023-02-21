import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxIntlTelInputModule } from '@capgo/ngx-intl-tel-input';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';
import { VerifyFormComponent } from './components/verify-form/verify-form.component';
import { PhoneInfoComponent } from './components/phone-step/phone-step.component';
import { PhoneVerificationComponent } from './components/verification-step/verification-step.component';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [
    VerifyComponent,
    VerifyFormComponent,
    PhoneInfoComponent,
    PhoneVerificationComponent,
    PhonePipe
  ],
  imports: [CommonModule, SharedModule, VerifyRoutingModule, NgxIntlTelInputModule]
})
export class VerifyModule {}
