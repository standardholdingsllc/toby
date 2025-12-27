import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { SendIcon, PlusIcon, XIcon } from './icons/Icons';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: 'clinic' | 'client';
  text: string;
  timestamp: string;
  media?: {
    type: 'image' | 'document';
    name: string;
    preview?: string;
  };
}

interface ChatWindowProps {
  messages: Message[];
  onSend: (text: string, media?: { type: 'image' | 'document'; name: string; preview?: string }) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend }) => {
  const { t } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [pendingMedia, setPendingMedia] = useState<{ type: 'image' | 'document'; name: string; preview?: string } | null>(null);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() || pendingMedia) {
      onSend(inputValue.trim(), pendingMedia || undefined);
      setInputValue('');
      setPendingMedia(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPendingMedia({
          type: 'image',
          name: file.name,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
    setShowMediaMenu(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingMedia({
        type: 'document',
        name: file.name,
      });
    }
    setShowMediaMenu(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearPendingMedia = () => {
    setPendingMedia(null);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
        className="hidden"
        onChange={handleDocumentSelect}
      />

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
                {/* Media preview in message */}
                {message.media && (
                  <div className="mb-2">
                    {message.media.type === 'image' && message.media.preview ? (
                      <img
                        src={message.media.preview}
                        alt={message.media.name}
                        className="max-w-[200px] rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-xs truncate max-w-[150px]">{message.media.name}</span>
                      </div>
                    )}
                  </div>
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
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

      {/* Pending media preview */}
      {pendingMedia && (
        <div className="mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center gap-2">
          {pendingMedia.type === 'image' && pendingMedia.preview ? (
            <img
              src={pendingMedia.preview}
              alt={pendingMedia.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          )}
          <span className="flex-1 text-sm text-slate-700 dark:text-slate-300 truncate">
            {pendingMedia.name}
          </span>
          <button
            onClick={clearPendingMedia}
            className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <XIcon className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="mt-4 flex gap-2">
        {/* Media attachment button */}
        <div className="relative">
          <button
            onClick={() => setShowMediaMenu(!showMediaMenu)}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          
          {/* Media menu dropdown */}
          {showMediaMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-10">
              <button
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300">{t('image') || 'Image'}</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300">{t('document') || 'Document'}</span>
              </button>
            </div>
          )}
        </div>

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
          disabled={!inputValue.trim() && !pendingMedia}
          className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

