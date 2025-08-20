import React from 'react';
import { SearchIcon } from './icons/SearchIcon.js';

const SearchBar = ({
  searchTerm,
  onSearchTermChange,
  affiliationFilter,
  onAffiliationFilterChange,
  votingFilter,
  onVotingFilterChange,
  centerFilter,
  onCenterFilterChange,
  centers,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
      {/* Main Search Input */}
      <div className="flex-grow">
        <label htmlFor="search" className="sr-only">
          Buscar Votante
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="search"
            placeholder="Buscar por nombre, apellido, email..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>
      
      {/* Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
        <div>
          <label htmlFor="affiliation-filter" className="sr-only">
            Filtrar por Afiliación
          </label>
          <select
            id="affiliation-filter"
            value={affiliationFilter}
            onChange={(e) => onAffiliationFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">Afiliación: Todos</option>
            <option value="affiliated">Afiliados</option>
            <option value="not_affiliated">No Afiliados</option>
          </select>
        </div>
        <div>
          <label htmlFor="voting-filter" className="sr-only">
            Filtrar por Estado del Voto
          </label>
          <select
            id="voting-filter"
            value={votingFilter}
            onChange={(e) => onVotingFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">Voto: Todos</option>
            <option value="voted">Han Votado</option>
            <option value="not_voted">No Han Votado</option>
          </select>
        </div>
        <div>
          <label htmlFor="center-filter" className="sr-only">
            Filtrar por Centro de Trabajo
          </label>
          <select
            id="center-filter"
            value={centerFilter}
            onChange={(e) => onCenterFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">Centro: Todos</option>
            {centers.map(center => (
              <option key={center} value={center}>{center}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;