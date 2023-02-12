import { Component, OnInit } from '@angular/core';
import { Message, MessageGroup, MessageCluster } from 'src/app/interfaces/message';
import { mockMessages } from 'src/app/messages-mock';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser: string = 'Madeline';
  messages: MessageCluster[] = [];

  constructor() {}

  ngOnInit() {
    this.messages = this.groupMessages(mockMessages);
    console.log(this.messages);
  }

  groupMessagesByDate(messages: Message[]): { date: Date; messages: Message[] }[] {
    return messages.reduce(
      (
        acc: { date: Date; messages: Message[] }[],
        msg: Message
      ): { date: Date; messages: Message[] }[] => {
        const prev = acc.pop();
        if (
          prev?.date.getDate() === msg.date.getDate() &&
          prev?.date.getFullYear() === msg.date.getFullYear()
        ) {
          prev.messages.push(msg);
          acc.push(prev);
        } else if (prev) {
          const next = { date: msg.date, messages: [msg] };
          acc.push(prev);
          acc.push(next);
        } else {
          const next = { date: msg.date, messages: [msg] };
          acc.push(next);
        }
        return acc;
      },
      []
    );
  }

  groupMessagesByUser(messages: Message[]): MessageGroup[] {
    return messages.reduce((acc: MessageGroup[], msg: Message): MessageGroup[] => {
      const prev = acc.pop();
      if (prev?.user.name === msg.user.name) {
        prev.messages.push({ text: msg.text, date: msg.date });
        acc.push(prev);
      } else if (prev) {
        const next = { user: msg.user, messages: [{ text: msg.text, date: msg.date }] };
        acc.push(prev);
        acc.push(next);
      } else {
        const next = { user: msg.user, messages: [{ text: msg.text, date: msg.date }] };
        acc.push(next);
      }
      return acc;
    }, []);
  }

  groupMessages(messages: Message[]): MessageCluster[] {
    const messagesByDate = this.groupMessagesByDate(messages);
    return messagesByDate.map((item) => {
      const cluster: MessageCluster = {
        date: item.date,
        messages: this.groupMessagesByUser(item.messages)
      };
      return cluster;
    });
  }
}