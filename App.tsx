
import React, { useState, useCallback, useEffect } from 'react';
import { ContactList } from './components/ContactList';
import { ChatWindow } from './components/ChatWindow';
import type { Contact, Message } from './types';
import { CONTACTS, INITIAL_MESSAGES } from './constants';
import { getBotResponse } from './services/geminiService';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
    const [messages, setMessages] = useState<{ [key: number]: Message[] }>(INITIAL_MESSAGES);
    const [activeContactId, setActiveContactId] = useState<number | null>(1);
    const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const activeContact = contacts.find(c => c.id === activeContactId) || null;

    useEffect(() => {
        // Sort contacts whenever messages change to bring the most recent chat to the top
        setContacts(prevContacts => {
            const newContacts = [...prevContacts];
            newContacts.sort((a, b) => {
                const lastMessageA = messages[a.id]?.[messages[a.id].length - 1];
                const lastMessageB = messages[b.id]?.[messages[b.id].length - 1];

                const timeA = lastMessageA ? new Date(lastMessageA.timestamp).getTime() : 0;
                const timeB = lastMessageB ? new Date(lastMessageB.timestamp).getTime() : 0;

                return timeB - timeA;
            });
            return newContacts;
        });
    }, [messages]);


    const handleSelectContact = (contactId: number) => {
        setActiveContactId(contactId);
    };

    const handleSendMessage = useCallback(async (text: string) => {
        if (!activeContact) return;

        const newMessage: Message = {
            id: Date.now(),
            text,
            timestamp: new Date().toISOString(),
            sender: 'me'
        };

        const activeId = activeContact.id;
        
        setMessages(prev => ({
            ...prev,
            [activeId]: [...(prev[activeId] || []), newMessage]
        }));

        setContacts(prev => prev.map(c => c.id === activeId ? { ...c, lastMessage: text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : c));
        
        setIsGeneratingResponse(true);

        try {
            const botResponseText = await getBotResponse(text, activeContact.name);

            const botMessage: Message = {
                id: Date.now() + 1,
                text: botResponseText,
                timestamp: new Date().toISOString(),
                sender: 'contact'
            };

            setMessages(prev => ({
                ...prev,
                [activeId]: [...(prev[activeId] || []), botMessage]
            }));
            
            setContacts(prev => prev.map(c => c.id === activeId ? { ...c, lastMessage: botResponseText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : c));

        } catch (error) {
            console.error("Failed to get bot response:", error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Sorry, I couldn't connect. Please try again.",
                timestamp: new Date().toISOString(),
                sender: 'contact'
            };
             setMessages(prev => ({
                ...prev,
                [activeId]: [...(prev[activeId] || []), errorMessage]
            }));
        } finally {
            setIsGeneratingResponse(false);
        }
    }, [activeContact]);

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex overflow-hidden">
            <div className="w-full md:w-1/3 lg:w-1/4 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chats</h1>
                     <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800" aria-label="Toggle theme">
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </button>
                </header>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                </div>
                <ContactList 
                    contacts={filteredContacts}
                    activeContactId={activeContactId}
                    onSelectContact={handleSelectContact}
                />
            </div>
            <div className="flex-1 flex flex-col h-full">
                {activeContact ? (
                    <ChatWindow 
                        contact={activeContact}
                        messages={messages[activeContact.id] || []}
                        onSendMessage={handleSendMessage}
                        isGeneratingResponse={isGeneratingResponse}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h2 className="text-xl font-medium">Select a chat to start messaging</h2>
                            <p className="mt-1 text-sm">Your conversations will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
