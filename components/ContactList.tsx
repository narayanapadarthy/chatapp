
import React from 'react';
import { ContactItem } from './ContactItem';
import type { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  activeContactId: number | null;
  onSelectContact: (id: number) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, activeContactId, onSelectContact }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          isActive={contact.id === activeContactId}
          onSelect={() => onSelectContact(contact.id)}
        />
      ))}
    </div>
  );
};
