
import type { Contact, Message } from './types';

export const CONTACTS: Contact[] = [
  {
    id: 1,
    name: 'Alex',
    avatar: 'https://picsum.photos/seed/alex/100/100',
    lastMessage: 'Hey, how is it going?',
    timestamp: '10:42 AM',
    online: true,
  },
  {
    id: 2,
    name: 'Mia',
    avatar: 'https://picsum.photos/seed/mia/100/100',
    lastMessage: 'Just finished the new design mockups.',
    timestamp: '10:35 AM',
    online: false,
  },
  {
    id: 3,
    name: 'Ben',
    avatar: 'https://picsum.photos/seed/ben/100/100',
    lastMessage: 'See you at the meeting tomorrow!',
    timestamp: 'Yesterday',
    online: true,
  },
  {
    id: 4,
    name: 'Chloe',
    avatar: 'https://picsum.photos/seed/chloe/100/100',
    lastMessage: 'Happy Birthday! 🎉',
    timestamp: 'Yesterday',
    online: false,
  },
  {
    id: 5,
    name: 'David',
    avatar: 'https://picsum.photos/seed/david/100/100',
    lastMessage: 'Can you send me that file?',
    timestamp: '2 days ago',
    online: false,
  },
];

export const INITIAL_MESSAGES: { [key: number]: Message[] } = {
  1: [
    { id: 1, text: 'Hey, how is it going?', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), sender: 'contact' },
    { id: 2, text: "I'm doing great, thanks for asking! Just working on this cool Gemini project. How about you?", timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(), sender: 'me' },
  ],
  2: [
    { id: 3, text: 'Just finished the new design mockups. Let me know what you think!', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), sender: 'contact' },
  ],
  3: [
    { id: 4, text: 'See you at the meeting tomorrow!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), sender: 'contact' },
  ],
  4: [
    { id: 5, text: 'Happy Birthday! 🎉', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), sender: 'contact' },
  ],
  5: [
    { id: 6, text: 'Can you send me that file?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), sender: 'contact' },
  ],
};
