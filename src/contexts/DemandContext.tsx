import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from 'react';
import { Demand, Filters, FilterOptions } from '../types';
import { apiService } from '../services/api';

interface DemandState {
  demands: Demand[];
  searchTerm: string;
  activeFilters: Filters;
  filterOptions: FilterOptions;
  loading: boolean;
  error: string | null;
  selectedDemand: Demand | null;
}

type DemandAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DEMANDS'; payload: Demand[] }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_ACTIVE_FILTERS'; payload: Filters }
  | { type: 'SET_FILTER_OPTIONS'; payload: FilterOptions }
  | { type: 'SET_SELECTED_DEMAND'; payload: Demand | null }
  | { type: 'RESET_FILTERS' };

const initialState: DemandState = {
  demands: [],
  searchTerm: '',
  activeFilters: {
    demandTypes: [],
    clients: [],
    statuses: []
  },
  filterOptions: {
    demandTypes: [],
    clients: [],
    statuses: []
  },
  loading: false,
  error: null,
  selectedDemand: null
};

const demandReducer = (state: DemandState, action: DemandAction): DemandState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DEMANDS':
      return { ...state, demands: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_ACTIVE_FILTERS':
      return { ...state, activeFilters: action.payload };
    case 'SET_FILTER_OPTIONS':
      return { ...state, filterOptions: action.payload };
    case 'SET_SELECTED_DEMAND':
      return { ...state, selectedDemand: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        activeFilters: {
          demandTypes: [],
          clients: [],
          statuses: []
        }
      };
    default:
      return state;
  }
};

interface DemandContextType {
  state: DemandState;
  loadDemands: () => Promise<void>;
  searchDemands: (term: string) => void;
  applyFilters: (filters: Filters) => void;
  resetFilters: () => void;
  selectDemand: (demand: Demand | null) => void;
  loadFilterOptions: () => Promise<void>;
}

const DemandContext = createContext<DemandContextType | undefined>(undefined);

export const useDemandContext = () => {
  const context = useContext(DemandContext);
  if (!context) {
    throw new Error('useDemandContext must be used within a DemandProvider');
  }
  return context;
};

interface DemandProviderProps {
  children: ReactNode;
}

export const DemandProvider: React.FC<DemandProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(demandReducer, initialState);

  const loadDemands = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const demands = await apiService.getAllDemands();
      dispatch({ type: 'SET_DEMANDS', payload: demands });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las demandas' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadFilterOptions = useCallback(async () => {
    try {
      const filterOptions = await apiService.getAvailableFilters();
      dispatch({ type: 'SET_FILTER_OPTIONS', payload: filterOptions });
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
  }, []);

  const selectDemand = useCallback((demand: Demand | null) => {
    dispatch({ type: 'SET_SELECTED_DEMAND', payload: demand });
  }, []);

  const searchDemands = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const applyFilters = useCallback((filters: Filters) => {
    dispatch({ type: 'SET_ACTIVE_FILTERS', payload: filters });
  }, []);

  const contextValue: DemandContextType = useMemo(() => ({
    state,
    loadDemands,
    searchDemands,
    applyFilters,
    resetFilters,
    selectDemand,
    loadFilterOptions
  }), [state, loadDemands, searchDemands, applyFilters, resetFilters, selectDemand, loadFilterOptions]);

  return (
    <DemandContext.Provider value={contextValue}>
      {children}
    </DemandContext.Provider>
  );
};