import { useMemo } from 'react';
import { Demand, Filters } from '../types';

export const useFilteredDemands = (demands: Demand[], searchTerm: string, activeFilters: Filters): Demand[] => {
  return useMemo(() => {
    let filtered = [...demands];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(demand =>
        demand.name.toLowerCase().includes(term) ||
        demand.client.toLowerCase().includes(term) ||
        demand.description.toLowerCase().includes(term) ||
        demand.demandType.toLowerCase().includes(term)
      );
    }

    // Apply type filters
    if (activeFilters.demandTypes.length > 0) {
      filtered = filtered.filter(demand =>
        activeFilters.demandTypes.includes(demand.demandType)
      );
    }

    // Apply client filters
    if (activeFilters.clients.length > 0) {
      filtered = filtered.filter(demand =>
        activeFilters.clients.includes(demand.client)
      );
    }

    // Apply status filters
    if (activeFilters.statuses.length > 0) {
      filtered = filtered.filter(demand =>
        activeFilters.statuses.includes(demand.status)
      );
    }

    return filtered;
  }, [demands, searchTerm, activeFilters]);
};