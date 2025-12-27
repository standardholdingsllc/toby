import React from 'react';
import { CheckIcon, XIcon } from './icons/Icons';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bgColor = {
    success: 'bg-gradient-to-r from-primary-500 to-primary-600',
    error: 'bg-gradient-to-r from-red-500 to-red-600',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600',
  }[type];

  return (
    <div
      className={`${bgColor} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in-right`}
    >
      {type === 'success' && <CheckIcon className="w-5 h-5" />}
      {type === 'error' && <XIcon className="w-5 h-5" />}
      {type === 'info' && (
        <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
          i
        </div>
      )}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;

