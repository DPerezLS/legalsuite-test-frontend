import React, { useState, useEffect } from 'react';
import { useDemandContext } from '../contexts/DemandContext';
import { Filters } from '../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { state, applyFilters, loadFilterOptions } = useDemandContext();
  const { activeFilters, filterOptions } = state;

  const [tempFilters, setTempFilters] = useState<Filters>(activeFilters);
  const [expandedSections, setExpandedSections] = useState({
    clients: false,
    statuses: false,
    demandTypes: false
  });

  useEffect(() => {
    if (isOpen) {
      loadFilterOptions();
      setTempFilters(activeFilters);
      // Expand sections with active filters
      setExpandedSections({
        clients: activeFilters.clients.length > 0,
        statuses: activeFilters.statuses.length > 0,
        demandTypes: activeFilters.demandTypes.length > 0
      });
    }
  }, [isOpen, activeFilters, loadFilterOptions]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCheckboxChange = (
    filterType: keyof Filters,
    value: string,
    checked: boolean
  ) => {
    setTempFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const handleApplyFilters = () => {
    applyFilters(tempFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      demandTypes: [],
      clients: [],
      statuses: []
    };
    setTempFilters(resetFilters);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Filtrar por</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filter Sections */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Cliente Section */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('clients')}
                className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">Cliente</h3>
                <div className="flex items-center">
                  {tempFilters.clients.length > 0 && (
                    <span className="mr-2 bg-[#7CAD39] text-white text-xs px-2 py-1 rounded-full">
                      {tempFilters.clients.length}
                    </span>
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.clients ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedSections.clients && (
                <div className="mt-3 space-y-2 pl-2">
                  {filterOptions.clients.map((client) => (
                    <label key={client} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={tempFilters.clients.includes(client)}
                          onChange={(e) => handleCheckboxChange('clients', client, e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${
                          tempFilters.clients.includes(client)
                            ? 'bg-[#7CAD39] border-[#7CAD39]'
                            : 'border-gray-300 bg-white'
                        } transition-all`}>
                          {tempFilters.clients.includes(client) && (
                            <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-base text-gray-700">{client}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Estado Section */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('statuses')}
                className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">Estado</h3>
                <div className="flex items-center">
                  {tempFilters.statuses.length > 0 && (
                    <span className="mr-2 bg-[#7CAD39] text-white text-xs px-2 py-1 rounded-full">
                      {tempFilters.statuses.length}
                    </span>
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.statuses ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedSections.statuses && (
                <div className="mt-3 space-y-2 pl-2">
                  {filterOptions.statuses.map((status) => (
                    <label key={status} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={tempFilters.statuses.includes(status)}
                          onChange={(e) => handleCheckboxChange('statuses', status, e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${
                          tempFilters.statuses.includes(status)
                            ? 'bg-[#7CAD39] border-[#7CAD39]'
                            : 'border-gray-300 bg-white'
                        } transition-all`}>
                          {tempFilters.statuses.includes(status) && (
                            <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-base text-gray-700">
                        {status === 'abierta' ? 'Abierta' : 'Cerrada'}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Tipo Section */}
            <div className="pb-4">
              <button
                onClick={() => toggleSection('demandTypes')}
                className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">Tipo</h3>
                <div className="flex items-center">
                  {tempFilters.demandTypes.length > 0 && (
                    <span className="mr-2 bg-[#7CAD39] text-white text-xs px-2 py-1 rounded-full">
                      {tempFilters.demandTypes.length}
                    </span>
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.demandTypes ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedSections.demandTypes && (
                <div className="mt-3 space-y-2 pl-2">
                  {filterOptions.demandTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={tempFilters.demandTypes.includes(type)}
                          onChange={(e) => handleCheckboxChange('demandTypes', type, e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${
                          tempFilters.demandTypes.includes(type)
                            ? 'bg-[#7CAD39] border-[#7CAD39]'
                            : 'border-gray-300 bg-white'
                        } transition-all`}>
                          {tempFilters.demandTypes.includes(type) && (
                            <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-base text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-[#7CAD39] hover:bg-[#6B9A32] text-white py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Aplicar filtros
            </button>
            <button
              onClick={handleResetFilters}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl border border-gray-300 font-medium transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;