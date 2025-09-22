import React, { useState, useEffect } from "react";
import { useDemandContext } from "../contexts/DemandContext";
import { useFilteredDemands } from "../hooks/useFilteredDemands";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import FilterModal from "./FilterModal";
import FilterSidebar from "./FilterSidebar";
import DemandCard from "./DemandCard";
import DemandDetailModal from "./DemandDetailModal";
import { Demand } from "../types";

const Dashboard: React.FC = () => {
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando demandas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#20271D] text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              className="mr-3"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <img
                src="/src/assets/img/Logo.svg"
                alt="AMARUSUITE"
                className="h-8"
              />
            </div>
          </div>
          <div className="w-12 h-12 border-4 border-[#7CAD39] rounded-2xl overflow-hidden bg-white">
            <img
              src="/src/assets/img/avatar.svg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-[#20271D] overflow-hidden">
        <div className="flex w-full h-full">
          {/* Sidebar with rounded corners */}
          <div className="w-24 bg-[#20271D] flex flex-col items-center py-6 h-full">
            {/* Logo */}
            <div className="mb-12 flex flex-col items-center">
              <div className="mb-3">
                <img src="/src/assets/img/Logo-desktop.svg" alt="Logo" />
              </div>
              <div className="mt-[-20px]">
                <img src="/src/assets/img/isotipo-desktop.svg" alt="Isotipo" />
              </div>
            </div>

            {/* Navigation Icons */}
            <nav className="flex-1 flex flex-col space-y-2">
              {/* Dashboard */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/dashboard.svg"
                    alt="Tablero"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Tablero
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Centros de trabajo */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/unifun.svg"
                    alt="Centros de trabajo"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Centros de trabajo
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Mis obligaciones */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/obligaciones.svg"
                    alt="Mis obligaciones"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Mis obligaciones
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Normatividad ambiental */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/Normatividad.svg"
                    alt="Normatividad ambiental"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Normatividad ambiental
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Calendario */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/calendar.svg"
                    alt="Calendario"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Calendario
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Reportes */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/Reportes.svg"
                    alt="Reportes"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Reportes
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Administración */}
              <div className="group relative">
                <button className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <img
                    src="/src/assets/icons/Admin.svg"
                    alt="Administración"
                    className="w-7 h-7"
                  />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Administración
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            </nav>

            {/* User Avatar at Bottom */}
            <div className="mt-auto pt-6">
              <div className="w-14 h-14 relative">
                <img
                  src="/src/assets/img/image.jpg"
                  alt="User"
                  className="w-full h-full rounded-full object-cover border-2 border-gray-600"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#7CAD39] rounded-full border-4 border-[#20271D] animate-pulse"></div>
              </div>
            </div>

            {/* Logout Icon */}
            <div className=" mt-4 border-8 border-white/20  rounded-[20px] group relative">
              <button className=" w-10 h-10 rounded-xl flex items-center justify-center  text-white bg-red-500 hover:bg-red-700 transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Cerrar sesión
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            </div>
          </div>

          {/* Main Content with rounded corners */}
          <div className="flex-1 bg-white rounded-l-[17px] overflow-hidden flex flex-col h-full">
            {/* Desktop Header */}
            <header className="px-8 py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold text-gray-900">
                  Demandas activas
                </h1>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-base font-semibold text-gray-700">
                      Frank Grimes
                    </p>
                    <p className="text-sm text-gray-500">Administrador</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl overflow-hidden p-[6px] bg-[#7CAD39]">
                    <img
                      src="/src/assets/img/avatar.svg"
                      alt="Frank Grimes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </header>

            {/* Desktop Content with scroll */}
            <main className="flex-1 overflow-y-auto px-8 py-6 text-gray-700">
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
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-[#20271D] shadow-xl transform transition-transform">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <img
                src="/src/assets/img/Logo.svg"
                alt="AMARUSUITE"
                className="h-8"
              />
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 border-2 border-[#7CAD39] rounded-xl overflow-hidden bg-white">
                  <img
                    src="/src/assets/img/avatar.svg"
                    alt="Frank Grimes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">Frank Grimes</p>
                  <p className="text-gray-300 text-sm">Administrador</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-white bg-[#7CAD39] rounded-lg"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                  </svg>
                  Demandas
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m5 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-5 4v6m5-6v6m-5-6H9"
                    />
                  </svg>
                  Documentos
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  Clientes
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Content */}
      <main className="md:hidden px-4 py-6 bg-gray-50">
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
      </main>

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
    </div>
  );
};

export default Dashboard;
