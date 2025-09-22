import React, { useEffect, useState, useRef } from "react";
import { useDemandContext } from "../../contexts/DemandContext";

interface DemandDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemandDetailModal: React.FC<DemandDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { state } = useDemandContext();
  const { selectedDemand } = state;

  // Mobile bottom sheet state
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(60); // percentage
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSheetHeight(60); // Reset to initial height
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  // Touch handlers for mobile bottom sheet
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY;
    const windowHeight = window.innerHeight;

    // Calculate new height based on drag (inverted for natural feel)
    const heightChange = (deltaY / windowHeight) * 100;
    const newHeight = Math.max(30, Math.min(90, 60 - heightChange));

    setSheetHeight(newHeight);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Snap to positions
    if (sheetHeight < 40) {
      onClose(); // Close if dragged down too much
    } else if (sheetHeight < 55) {
      setSheetHeight(30); // Snap to small
    } else if (sheetHeight < 75) {
      setSheetHeight(60); // Snap to medium
    } else {
      setSheetHeight(90); // Snap to large
    }
  };

  const handleHandleClick = () => {
    // Toggle between heights on handle click
    if (sheetHeight <= 30) {
      setSheetHeight(60);
    } else if (sheetHeight <= 60) {
      setSheetHeight(90);
    } else {
      setSheetHeight(30);
    }
  };

  if (!isOpen || !selectedDemand) return null;

  const getStatusColor = (status: string) => {
    return status === "abierta"
      ? "bg-[#C5E1A5] text-[#374E30]"
      : "bg-gray-200 text-gray-700";
  };

  const getDemandTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      laboral: "bg-[#C5E1A5] text-[#374E30]",
      civil: "bg-gray-700 text-white",
      comercial: "bg-[#C5E1A5] text-[#374E30]",
      penal: "bg-gray-700 text-white",
      administrativo: "bg-[#C5E1A5] text-[#374E30]",
      familia: "bg-gray-700 text-white",
      ejecutivo: "bg-[#C5E1A5] text-[#374E30]",
      societario: "bg-gray-700 text-white",
      tributario: "bg-[#C5E1A5] text-[#374E30]",
      contrato: "bg-gray-700 text-white",
      cerrada: "bg-gray-500 text-white",
    };
    return colors[type.toLowerCase()] || "bg-gray-700 text-white";
  };

  return (
    <>
      {/* Desktop Modal */}
      <div className="hidden md:block fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#374E30]">
                  Demanda #{selectedDemand.id}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
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

              {/* Status and Type Tags */}
              <div className="flex gap-3 mb-6">
                <span
                  className={`px-4 py-2 rounded-[6px] text-sm font-medium ${getStatusColor(
                    selectedDemand.status
                  )}`}
                >
                  {selectedDemand.status === "abierta" ? "Abierta" : "Cerrada"}
                </span>
                <span
                  className={`px-4 py-2 rounded-[6px] text-sm font-medium ${getDemandTypeColor(
                    selectedDemand.demandType
                  )}`}
                >
                  {selectedDemand.demandType.charAt(0).toUpperCase() +
                    selectedDemand.demandType.slice(1)}
                </span>
              </div>

              {/* Client */}
              <div className="mb-6">
                <p className="text-base text-gray-700">
                  <span className="font-semibold">Cliente:</span>{" "}
                  {selectedDemand.client}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-base text-gray-700 leading-relaxed">
                  {selectedDemand.description}
                </p>
              </div>

              {/* Document Section */}
              {selectedDemand.documents &&
              selectedDemand.documents.length > 0 ? (
                <div className="bg-[#E8F5E9] rounded-xl p-4 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C5E1A5] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#374E30]"
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
                      </div>
                      <span className="text-base text-gray-700">
                        Nombrearchivo.extensión
                      </span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#E8F5E9] rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C5E1A5] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#374E30]"
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
                    </div>
                    <span className="text-base text-gray-500">
                      No hay documentos adjuntos
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-[#7CAD39] hover:bg-[#6B9A32] text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    // Handle resolve demand
                    console.log("Resolver demanda");
                  }}
                >
                  Resolver demanda
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
                      d="M12 4v16m8-8l-8 8-8-8"
                    />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed inset-0 z-50">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Bottom Sheet */}
        <div
          ref={sheetRef}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform"
          style={{
            height: `${sheetHeight}vh`,
            transform: isDragging ? 'none' : undefined,
            transition: isDragging ? 'none' : 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Handle */}
          <div
            className="flex justify-center py-4 cursor-pointer select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleHandleClick}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"></div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col h-full pb-4">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6"
                 style={{ paddingBottom: '200px' }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#374E30]">
                  Demanda #{selectedDemand.id}
                </h2>
                <button onClick={onClose} className="text-gray-400">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Status and Type Tags */}
              <div className="flex gap-2 mb-4">
                <span
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-medium ${getStatusColor(
                    selectedDemand.status
                  )}`}
                >
                  {selectedDemand.status === "abierta" ? "Abierta" : "Cerrada"}
                </span>
                <span
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-medium ${getDemandTypeColor(
                    selectedDemand.demandType
                  )}`}
                >
                  {selectedDemand.demandType.charAt(0).toUpperCase() +
                    selectedDemand.demandType.slice(1)}
                </span>
              </div>

              {/* Client */}
              <div className="mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Cliente:</span>{" "}
                  {selectedDemand.client}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedDemand.description}
                </p>
              </div>
            </div>

            {/* Fixed Bottom Section - Document + Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100 rounded-b-3xl">
              {/* Document Section */}
              <div className="bg-[#E8F5E9] rounded-xl p-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#C5E1A5] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#374E30]"
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
                  </div>
                  <span className="text-sm text-gray-700">
                    {selectedDemand.documents &&
                    selectedDemand.documents.length > 0
                      ? "Nombrearchivo.extensión"
                      : "No hay documentos"}
                  </span>
                  {selectedDemand.documents && selectedDemand.documents.length > 0 && (
                    <button className="ml-auto text-gray-500 hover:text-gray-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#7CAD39] hover:bg-[#6B9A32] text-white font-semibold py-3 rounded-xl transition-colors">
                  Resolver demanda
                </button>
                <button
                  onClick={onClose}
                  className="w-full border-2 border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemandDetailModal;
