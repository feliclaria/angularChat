export interface Message {
  text: string;
  date: Date;
  uid: string;
}

export interface UserMessages {
  uid: string;
  messages: { text: string; date: Date }[];
}

export interface DateMessages {
  date: Date;
  messages: Message[];
}

export interface MessageStream {
  date: Date;
  messages: UserMessages[];
}
