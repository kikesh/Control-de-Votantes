import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-6 rounded-md shadow-md">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-300">Error al Cargar los Datos</h3>
          <div className="mt-2 text-md text-red-700 dark:text-red-200">
            <p>{message}</p>
            <p className="mt-2 text-sm">
              Por favor, verifica que la URL en <strong>App.tsx</strong> sea correcta y que la hoja de cálculo de Google esté publicada en la web como CSV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
