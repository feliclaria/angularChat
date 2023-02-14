import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  orderBy,
  limitToLast,
  collectionData,
  addDoc
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';

import { DateMessages, Message, MessageStream, UserMessages } from '../interfaces/message';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<UserProfile[]> {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref).pipe(
      switchMap((users) =>
        of(
          users.map((user) => {
            return { uid: user['uid'], name: user['name'], avatar: user['avatar'] };
          })
        )
      )
    );
  }

  getMessages(): Observable<Message[]> {
    const ref = query(
      collection(this.firestore, 'messages'),
      orderBy('date', 'asc'),
      limitToLast(100)
    );

    return collectionData(ref).pipe(
      switchMap((messages) =>
        of(
          messages.map((msg) => {
            msg['date'] = msg['date'].toDate();
            return msg;
          })
        )
      )
    ) as Observable<Message[]>;
  }

  sendMessage(message: Message) {
    const ref = collection(this.firestore, 'messages');
    return from(addDoc(ref, message));
  }

  groupMessages(messages: Message[]): MessageStream[] {
    const messagesByDate = this.groupMessagesByDate(messages);
    return messagesByDate.map((item) => {
      const stream: MessageStream = {
        date: item.date,
        messages: this.groupMessagesByUser(item.messages)
      };
      return stream;
    });
  }

  private groupMessagesByDate(messages: Message[]): DateMessages[] {
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

  private groupMessagesByUser(messages: Message[]): UserMessages[] {
    return messages.reduce((acc: UserMessages[], msg: Message): UserMessages[] => {
      const prev = acc.pop();
      if (prev?.uid === msg.uid) {
        prev.messages.push({ text: msg.text, date: msg.date });
        acc.push(prev);
      } else if (prev) {
        const next = { uid: msg.uid, messages: [{ text: msg.text, date: msg.date }] };
        acc.push(prev);
        acc.push(next);
      } else {
        const next = { uid: msg.uid, messages: [{ text: msg.text, date: msg.date }] };
        acc.push(next);
      }
      return acc;
    }, []);
  }
}
