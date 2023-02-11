export interface Message {
  text: string;
  date: Date;
  user: {
    name: string;
    avatar: string;
  };
}
