import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatars';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@NgModule({
  declarations: [ProfileComponent, ProfileCardComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, AvatarModule]
})
export class ProfileModule {}
