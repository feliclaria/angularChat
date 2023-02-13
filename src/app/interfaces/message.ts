import { UserProfile } from './user-profile';

export interface Message {
  text: string;
  date: Date;
  user: UserProfile;
}

export interface UserMessages {
  user: UserProfile;
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
