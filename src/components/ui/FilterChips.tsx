import React from 'react';
import { useDemandContext } from '../../contexts/DemandContext';
import { Filters } from '../../types';

const FilterChips: React.FC = () => {
  const { state, applyFilters, resetFilters } = useDemandContext();
  const { activeFilters } = state;

  const removeFilter = (filterType: keyof Filters, value: string) => {
    const newFilters = { ...activeFilters };
    newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    applyFilters(newFilters);
  };

  const hasActiveFilters =
    activeFilters.demandTypes.length > 0 ||
    activeFilters.clients.length > 0 ||
    activeFilters.statuses.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Demand Type Filters */}
      {activeFilters.demandTypes.map((type) => (
        <div
          key={`type-${type}`}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#7CAD39] text-white shadow-md"
        >
          <span className="mr-2">{type}</span>
          <button
            onClick={() => removeFilter('demandTypes', type)}
            className="text-white hover:text-gray-200 focus:outline-none transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Client Filters */}
      {activeFilters.clients.map((client) => (
        <div
          key={`client-${client}`}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#20271D] text-white shadow-md"
        >
          <span className="mr-2">{client}</span>
          <button
            onClick={() => removeFilter('clients', client)}
            className="text-white hover:text-gray-200 focus:outline-none transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Status Filters */}
      {activeFilters.statuses.map((status) => (
        <div
          key={`status-${status}`}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-md ${
            status === 'abierta' ? 'bg-[#7CAD39] text-white' : 'bg-gray-500 text-white'
          }`}
        >
          <span className="mr-2">{status === 'abierta' ? 'Abierta' : 'Cerrada'}</span>
          <button
            onClick={() => removeFilter('statuses', status)}
            className="text-white hover:text-gray-200 focus:outline-none transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Reset All Filters Button */}
      <button
        onClick={resetFilters}
        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      >
        <span className="mr-2">Limpiar filtros</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default FilterChips;