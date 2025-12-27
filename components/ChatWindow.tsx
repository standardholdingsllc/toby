import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { SendIcon } from './icons/Icons';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: 'clinic' | 'client';
  text: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  onSend: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend }) => {
  const { t } = useApp();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            {t('noResults')}
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'clinic' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`chat-bubble ${message.sender}`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'clinic'
                    ? 'text-white/70'
                    : 'text-slate-400'
                }`}>
                  {format(new Date(message.timestamp), 'HH:mm')}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('typeMessage')}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/50 outline-none transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

