import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NewPasswordCardComponent } from './components/new-password-card/new-password-card.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { DeleteAccountButtonComponent } from './components/delete-account-button/delete-account-button.component';

@NgModule({
  declarations: [
    AccountComponent,
    NewPasswordCardComponent,
    AccountCardComponent,
    DeleteAccountButtonComponent
  ],
  imports: [CommonModule, AccountRoutingModule, SharedModule]
})
export class AccountModule {}
