import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Message, MessageStream } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() user!: User | null;

  messages$!: Observable<MessageStream[]>;
  users$!: Observable<Map<string, UserProfile>>;

  msgForm = this.formBuilder.group({
    messageContent: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.messages$ = this.messageService
      .getMessages()
      .pipe(map((msgs) => this.messageService.groupMessages(msgs)));
    this.users$ = this.messageService.getUsers();
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
      uid: this.user!.uid
    };

    this.msgForm.reset();
    return this.messageService.sendMessage(message);
  }
}
