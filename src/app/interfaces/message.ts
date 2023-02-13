import { UserProfile } from './user-profile';

export interface Message {
  text: string;
  date: Date;
  user: UserProfile;
}

export interface MessageGroup {
  user: UserProfile;
  messages: { text: string; date: Date }[];
}

export interface MessageCluster {
  date: Date;
  messages: MessageGroup[];
}
