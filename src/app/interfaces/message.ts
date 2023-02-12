export interface Message {
  text: string;
  date: Date;
  user: {
    name: string;
    avatar: string;
  };
}

export interface MessageGroup {
  user: {
    name: string;
    avatar: string;
  };
  messages: { text: string; date: Date }[];
}

export interface MessageCluster {
  date: Date;
  messages: MessageGroup[];
}
