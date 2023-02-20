import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Subscription, switchMap } from 'rxjs';
import { Message, MessageStream } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() user: User | undefined = undefined;

  private messagesSub?: Subscription;
  messages: MessageStream[] = [];

  private profilesSub?: Subscription;
  profiles: Map<string, UserProfile> = new Map();

  msgForm = this.formBuilder.group({
    messageContent: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    const rawMessages$ = this.messageService.getMessages();

    this.messagesSub = rawMessages$
      .pipe(map((msgs) => this.messageService.groupMessages(msgs)))
      .subscribe((msgs) => (this.messages = msgs));

    this.profilesSub = rawMessages$
      .pipe(switchMap((msgs) => this.messageService.getProfilesFromMessages(msgs)))
      .subscribe((prs) => (this.profiles = prs));
  }

  ngOnDestroy() {
    this.messagesSub?.unsubscribe();
    this.profilesSub?.unsubscribe();
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
