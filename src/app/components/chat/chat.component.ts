import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Message, MessageStream } from 'src/app/interfaces/message';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() currentUser!: UserProfile;
  messages$!: Observable<MessageStream[]>;
  msgForm = this.formBuilder.group({
    messageContent: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    this.messages$ = this.messageService
      .getMessages()
      .pipe(map((msgs) => this.messageService.groupMessages(msgs)));
  }

  onSubmit() {
    const messageContent = this.msgForm.value.messageContent!.trim();

    if (!messageContent) {
      this.msgForm.reset();
      return;
    }
    const message: Message = {
      text: messageContent,
      date: new Date(),
      user: this.currentUser
    };

    this.msgForm.reset();
    return this.messageService.sendMessage(message);
  }
}
