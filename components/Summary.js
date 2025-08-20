import React, { useMemo } from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon.js';
import { XCircleIcon } from './icons/XCircleIcon.js';

const Summary = ({ voters }) => {
  const stats = useMemo(() => {
    const total = voters.length;
    const voted = voters.filter(v => v.haVotado).length;
    const notVoted = total - voted;
    const percentageVoted = total > 0 ? ((voted / total) * 100).toFixed(1) : '0.0';
    return { total, voted, notVoted, percentageVoted };
  }, [voters]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Resumen de Votación</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Censo:</span>
          <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{stats.total}</span>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Han Votado:</span>
            </div>
          <span className="font-bold text-lg text-green-600 dark:text-green-400">{stats.voted}</span>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <XCircleIcon className="h-5 w-5 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">No Han Votado:</span>
            </div>
          <span className="font-bold text-lg text-red-600 dark:text-red-400">{stats.notVoted}</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${stats.percentageVoted}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{stats.percentageVoted}% de participación</p>
      </div>
    </div>
  );
};

export default Summary;