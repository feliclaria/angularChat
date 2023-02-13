import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs';
import { MessageStream } from 'src/app/interfaces/message';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { mockMessages } from 'src/app/messages-mock';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() currentUser?: UserProfile = undefined;
  messages: MessageStream[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService
      .getMessages()
      .pipe(map((msgs) => this.messageService.groupMessages(msgs)))
      .subscribe((msgs) => {
        this.messages = msgs;
      });
  }
}
