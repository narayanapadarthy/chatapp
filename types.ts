
export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  online: boolean;
}

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | 'contact';
}
