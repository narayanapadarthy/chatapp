
import React from 'react';
import type { Contact } from '../types';

interface ChatHeaderProps {
  contact: Contact;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center shadow-sm flex-shrink-0">
      <img className="w-10 h-10 rounded-full object-cover mr-4" src={contact.avatar} alt={contact.name} />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{contact.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{contact.online ? 'Online' : 'Offline'}</p>
      </div>
    </div>
  );
};
