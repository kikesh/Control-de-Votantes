import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon.js';
import { XCircleIcon } from './icons/XCircleIcon.js';
import { BellIcon } from './icons/BellIcon.js';
import { ChevronDownIcon } from './icons/ChevronDownIcon.js';

const VoterCard = ({ voter, onToggleVoteStatus, onSendReminder, expandedVoterId, onSetExpandedVoterId }) => {
  const isExpanded = voter.id === expandedVoterId;

  const handleToggle = () => {
    onSetExpandedVoterId(isExpanded ? null : voter.id);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  const formatVoteTime = (isoString) => {
    if (!isoString || isoString === 'N/A') return '';
    try {
      const date = new Date(isoString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return '';
      }
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };
  
  const fullName = `${voter.nombre} ${voter.apellido} ${voter.apellido2 || ''}`.trim();
  const displayVoteTime = formatVoteTime(voter.horaVoto);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg`}>
      <div className="p-4 cursor-pointer" onClick={handleToggle} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleToggle()}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{fullName}</h3>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-end space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${
                voter.afiliadoUGT
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
              <span>{voter.afiliadoUGT ? 'Afiliado' : 'No Afiliado'}</span>
            </div>
             <div className={`flex items-center justify-end space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${
                voter.haVotado
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
              {voter.haVotado ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
              <span>{voter.haVotado ? `Votó ${displayVoteTime}`.trim() : 'No Votó'}</span>
            </div>
            <ChevronDownIcon className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <p><strong className="text-gray-700 dark:text-gray-300">Email:</strong> {voter.email}</p>
                <p><strong className="text-gray-700 dark:text-gray-300">Teléfono:</strong> {voter.telefono}</p>
                <p><strong className="text-gray-700 dark:text-gray-300">Centro:</strong> {voter.centroVotacion}</p>
                <p><strong className="text-gray-700 dark:text-gray-300">Mesa:</strong> {voter.mesaVotacion}</p>
                 {voter.haVotado && displayVoteTime && <p><strong className="text-gray-700 dark:text-gray-300">Hora Voto:</strong> {displayVoteTime}</p>}
            </div>
          
            <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {voter.haVotado ? (
                 <button
                    onClick={(e) => handleActionClick(e, () => onToggleVoteStatus(voter.id))}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
                  >
                    <XCircleIcon className="h-5 w-5 mr-2"/>
                    Anular Voto
                  </button>
              ) : (
                <>
                  <button
                    onClick={(e) => handleActionClick(e, () => onToggleVoteStatus(voter.id))}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2"/>
                    Marcar como Votado
                  </button>
                  <button
                    onClick={(e) => handleActionClick(e, () => onSendReminder(fullName))}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600 transition"
                  >
                    <BellIcon className="h-5 w-5 mr-2" />
                    Enviar Recordatorio
                  </button>
                </>
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default VoterCard;