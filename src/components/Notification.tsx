import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 max-w-md p-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${
        type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 
        'bg-red-50 text-red-800 border-l-4 border-red-500'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-500" />
      )}
      <div className="flex-1">{message}</div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Notification;