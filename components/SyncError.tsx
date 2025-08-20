import React, { useEffect, useState } from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { XMarkIcon } from './icons/XMarkIcon';

interface SyncErrorProps {
  message: string | null;
  onClose: () => void;
}

const SyncError: React.FC<SyncErrorProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      // Auto-hide after some time can be added here if needed
      // const timer = setTimeout(() => {
      //   handleClose();
      // }, 10000);
      // return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message]);
  
  const handleClose = () => {
      setIsVisible(false);
      // Allow animation to finish before calling parent onClose
      setTimeout(() => {
          onClose();
      }, 300);
  }

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-5 right-5 w-full max-w-md bg-red-50 dark:bg-gray-800 border-l-4 border-red-500 dark:border-red-600 rounded-lg shadow-2xl p-4 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold text-red-800 dark:text-red-200">
            Error de Sincronización
          </p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
            <button
                onClick={handleClose}
                className="inline-flex rounded-md bg-red-50 dark:bg-gray-800 text-red-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
                <span className="sr-only">Cerrar</span>
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SyncError;
