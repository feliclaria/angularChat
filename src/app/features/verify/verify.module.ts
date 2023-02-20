import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxIntlTelInputModule } from '@capgo/ngx-intl-tel-input';

import { provideAuth, getAuth } from '@angular/fire/auth';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';

@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    SharedModule,
    VerifyRoutingModule,
    NgxIntlTelInputModule,
    provideAuth(() => getAuth())
  ]
})
export class VerifyModule {}
