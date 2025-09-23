import React, { useState, useEffect } from "react";
import { useDemandContext } from "../../contexts/DemandContext";
import { useFilteredDemands } from "../../hooks/useFilteredDemands";
import SearchBar from "../../components/ui/SearchBar";
import FilterChips from "../../components/ui/FilterChips";
import FilterModal from "../../components/modals/FilterModal";
import FilterSidebar from "../../components/modals/FilterSidebar";
import DemandCard from "../../components/ui/DemandCard";
import DemandDetailModal from "../../components/modals/DemandDetailModal";
import { Demand } from "../../types";

const DemandsList: React.FC = () => {
  const { state, loadDemands, selectDemand } = useDemandContext();
  const { demands, searchTerm, activeFilters, loading, error } = state;

  // Use custom hook for filtering
  const filteredDemands = useFilteredDemands(
    demands,
    searchTerm,
    activeFilters
  );

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    loadDemands();
  }, [loadDemands]);

  const handleCardClick = (demand: Demand) => {
    selectDemand(demand);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    selectDemand(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando demandas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-700">
            Error al cargar datos
          </h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <div className="mt-6">
            <button
              onClick={loadDemands}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Content */}
      <div className="hidden md:block">
        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Search Bar and Filter Button */}
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                />
              </svg>
              Filtrar por
            </button>
          </div>

          {/* Filter Chips */}
          <FilterChips />
        </div>

        {/* Demands Grid */}
        {filteredDemands.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
            {filteredDemands.map((demand) => (
              <DemandCard
                key={demand.id}
                demand={demand}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-700">
              No se encontraron demandas
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar tus filtros o términos de búsqueda.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Content */}
      <div className="md:hidden">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Demandas activas
          </h2>

          {/* Search Bar and Filter Button */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={() => setIsFilterSidebarOpen(true)}
              className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                />
              </svg>
            </button>
          </div>

          {/* Filter Chips */}
          <FilterChips />
        </div>

        {/* Demands Grid - Mobile */}
        {filteredDemands.length > 0 ? (
          <div className="space-y-4">
            {filteredDemands.map((demand) => (
              <DemandCard
                key={demand.id}
                demand={demand}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-700">
              No se encontraron demandas
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar tus filtros o términos de búsqueda.
            </p>
          </div>
        )}
      </div>

      {/* Modals and Sidebars */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
      />

      <DemandDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </>
  );
};

export default DemandsList;