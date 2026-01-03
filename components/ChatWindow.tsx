
import React, { useEffect, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import type { Contact, Message } from '../types';

interface ChatWindowProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isGeneratingResponse: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage, isGeneratingResponse }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGeneratingResponse]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <ChatHeader contact={contact} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} contactAvatar={contact.avatar}/>
        ))}
        {isGeneratingResponse && (
            <div className="flex items-start space-x-3">
                <img className="w-8 h-8 rounded-full object-cover" src={contact.avatar} alt={contact.name} />
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-lg">
                    <div className="flex items-center space-x-1">
                        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};
