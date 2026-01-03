
import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  contactAvatar: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, contactAvatar }) => {
  const isMe = message.sender === 'me';

  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isMe) {
    return (
      <div className="flex justify-end items-end space-x-2">
         <div className="text-xs text-gray-400">{time}</div>
        <div className="bg-blue-500 text-white p-3 rounded-lg rounded-br-none max-w-lg">
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end space-x-3">
      <img className="w-8 h-8 rounded-full object-cover" src={contactAvatar} alt="contact avatar" />
      <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none max-w-lg">
        <p>{message.text}</p>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );
};
