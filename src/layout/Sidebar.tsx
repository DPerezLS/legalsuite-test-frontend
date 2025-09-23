import React from "react";

const navigationItems = [
  {
    id: "dashboard",
    icon: "/src/assets/icons/dashboard.svg",
    alt: "Tablero",
    tooltip: "Tablero",
  },
  {
    id: "centers",
    icon: "/src/assets/icons/unifun.svg",
    alt: "Centros de trabajo",
    tooltip: "Centros de trabajo",
  },
  {
    id: "obligations",
    icon: "/src/assets/icons/obligaciones.svg",
    alt: "Mis obligaciones",
    tooltip: "Mis obligaciones",
  },
  {
    id: "normatividad",
    icon: "/src/assets/icons/Normatividad.svg",
    alt: "Normatividad ambiental",
    tooltip: "Normatividad ambiental",
  },
  {
    id: "calendar",
    icon: "/src/assets/icons/calendar.svg",
    alt: "Calendario",
    tooltip: "Calendario",
  },
  {
    id: "reports",
    icon: "/src/assets/icons/Reportes.svg",
    alt: "Reportes",
    tooltip: "Reportes",
  },
  {
    id: "admin",
    icon: "/src/assets/icons/Admin.svg",
    alt: "Administración",
    tooltip: "Administración",
  },
];

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  return (
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
        {navigationItems.map((item) => (
          <div key={item.id} className="group relative">
            <button
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition-colors ${
                activeItem === item.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => onItemClick?.(item.id)}
            >
              <img
                src={item.icon}
                alt={item.alt}
                className="w-7 h-7"
              />
            </button>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {item.tooltip}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
          </div>
        ))}
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
      <div className="mt-4 border-8 border-white/20 rounded-[20px] group relative">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-red-500 hover:bg-red-700 transition-colors">
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
  );
};

export default Sidebar;