
import React from 'react';
import { UserIcon } from './icons/UserIcon.tsx';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
           <div className="bg-blue-600 p-2 rounded-lg">
             <UserIcon className="h-6 w-6 text-white" />
           </div>
           <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Control de Votantes - UGT Sanidad Salamanca
           </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;