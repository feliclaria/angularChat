import { Message } from './interfaces/message';

export const mockMessages: Message[] = [
  {
    text: 'There she is!',
    date: new Date('2023-02-11T13:39:00'),
    user: {
      name: 'Theo',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/theo2png.png'
    }
  },
  {
    text: 'Long time no see, Strawberry.',
    date: new Date('2023-02-11T13:39:00'),
    user: {
      name: 'Theo',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/theo2png.png'
    }
  },
  {
    text: 'Hey Theo',
    date: new Date('2023-02-11T13:41:00'),
    user: {
      name: 'Madeline',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/mad1png.png'
    }
  },
  {
    text: "It's been forever!",
    date: new Date('2023-02-11T13:41:00'),
    user: {
      name: 'Theo',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/theo2png.png'
    }
  },
  {
    text: 'You went off the grid!\nWhat happened to you?',
    date: new Date('2023-02-11T13:42:00'),
    user: {
      name: 'Theo',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/theo2png.png'
    }
  },
  {
    text: 'Yeah, sorry for not responding to your messages...',
    date: new Date('2023-02-11T13:43:00'),
    user: {
      name: 'Madeline',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/mad1png.png'
    }
  },
  {
    text: '...or answering your calls...',
    date: new Date('2023-02-11T13:43:00'),
    user: {
      name: 'Madeline',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/mad1png.png'
    }
  },
  {
    text: '...or replying to your emails.',
    date: new Date('2024-02-11T13:44:00'),
    user: {
      name: 'Madeline',
      avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/mad1png.png'
    }
  }
];