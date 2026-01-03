
import React from 'react';
import type { Contact } from '../types';

interface ContactItemProps {
  contact: Contact;
  isActive: boolean;
  onSelect: () => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, isActive, onSelect }) => {
  const activeClasses = isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700';
  const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.slice(0, n-1) + '…' : str;
  };

  return (
    <div
      className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${activeClasses}`}
      onClick={onSelect}
    >
      <div className="relative">
        <img className="w-12 h-12 rounded-full object-cover" src={contact.avatar} alt={contact.name} />
        {contact.online && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
        )}
      </div>
      <div className="flex-1 ml-4 min-w-0">
        <div className="flex justify-between items-center">
          <p className={`text-base font-semibold truncate ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
            {contact.name}
          </p>
          <p className={`text-xs ${isActive ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
            {contact.timestamp}
          </p>
        </div>
        <p className={`text-sm mt-1 truncate ${isActive ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
          {truncate(contact.lastMessage, 30)}
        </p>
      </div>
    </div>
  );
};
