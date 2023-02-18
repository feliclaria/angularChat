import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { Message, MessageStream } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() user: User | undefined = undefined;

  messages: MessageStream[] = [];
  profiles: Map<string, UserProfile> = new Map();

  msgForm = this.formBuilder.group({
    messageContent: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    const rawMessages$ = this.messageService.getMessages();
    rawMessages$
      .pipe(map((msgs) => this.messageService.groupMessages(msgs)))
      .subscribe((msgs) => (this.messages = msgs));

    rawMessages$
      .pipe(switchMap((msgs) => this.messageService.getProfilesFromMessages(msgs)))
      .subscribe((prs) => (this.profiles = prs));
  }

  onSubmit() {
    const rawMessageContent = this.msgForm.value.messageContent;
    if (!rawMessageContent) {
      this.msgForm.reset();
      return;
    }

    const messageContent = rawMessageContent.trim();

    if (!rawMessageContent) {
      this.msgForm.reset();
      return;
    }

    const message: Message = {
      text: messageContent,
      date: new Date(),
      uid: this.user!.uid
    };

    this.msgForm.reset();
    return this.messageService.sendMessage(message);
  }
}
