import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatars';
import { AutosizeModule } from 'ngx-autosize';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageBubbleLeftComponent } from './components/message-bubble-left.component';
import { MessageBubbleRightComponent } from './components/message-bubble-right.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    MessageBubbleLeftComponent,
    MessageBubbleRightComponent
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, AvatarModule, AutosizeModule]
})
export class HomeModule {}
