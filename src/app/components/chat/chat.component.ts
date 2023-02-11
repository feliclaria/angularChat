import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { messages } from 'src/app/messages-mock';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor() {}

  ngOnInit() {
    this.messages = messages;
  }
}
