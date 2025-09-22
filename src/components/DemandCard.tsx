import React from "react";
import { Demand } from "../types";

interface DemandCardProps {
  demand: Demand;
  onClick: (demand: Demand) => void;
}

const DemandCard: React.FC<DemandCardProps> = ({ demand, onClick }) => {
  const getStatusColor = (status: string) => {
    return status === "abierta"
      ? "bg-[#7CAD39] text-white"
      : "bg-gray-500 text-white";
  };

  const getDemandTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      laboral: "bg-[#7CAD39] text-white",
      civil: "bg-[#20271D] text-white",
      comercial: "bg-[#7CAD39] text-white",
      penal: "bg-[#20271D] text-white",
      administrativo: "bg-[#7CAD39] text-white",
      familia: "bg-[#20271D] text-white",
      ejecutivo: "bg-[#7CAD39] text-white",
      societario: "bg-[#20271D] text-white",
      tributario: "bg-[#7CAD39] text-white",
      contrato: "bg-[#20271D] text-white",
      cerrada: "bg-gray-500 text-white",
    };
    return colors[type.toLowerCase()] || "bg-[#20271D] text-white";
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-200 relative shadow-[0_4px_4px_rgba(87,87,87,0.1)]"
      onClick={() => onClick(demand)}
    >
      {/* Eye icon */}
      <div className="absolute top-6 right-6">
        <svg
          className="w-5 h-5 text-[#7CAD39]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>

      {/* Header with Demand ID */}
      <div className="mb-4 pr-8">
        <h3 className="text-lg font-bold text-[#374E30]">
          Demanda #{demand.id}
        </h3>
      </div>

      {/* Status and Type Tags */}
      <div className="flex gap-3 mb-4">
        <span
          className={`px-3 py-1.5 rounded-[6px] text-sm font-semibold ${getStatusColor(
            demand.status
          )}`}
        >
          {demand.status === "abierta" ? "Abierta" : "Cerrada"}
        </span>
        <span
          className={`px-3 py-1.5 rounded-[6px] text-sm font-semibold ${getDemandTypeColor(
            demand.demandType
          )}`}
        >
          {demand.demandType.charAt(0).toUpperCase() +
            demand.demandType.slice(1)}
        </span>
      </div>

      {/* Client */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Cliente:</span>{" "}
          {demand.client}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {demand.description}
        </p>
      </div>
    </div>
  );
};

export default DemandCard;
