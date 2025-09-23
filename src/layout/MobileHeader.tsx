import React from "react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="md:hidden bg-[#20271D] text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            className="mr-3"
            onClick={onMenuClick}
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
  );
};

export default MobileHeader;