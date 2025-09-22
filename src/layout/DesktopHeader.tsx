import React from "react";

interface DesktopHeaderProps {
  title: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  title,
  userName = "Frank Grimes",
  userRole = "Administrador",
  userAvatar = "/src/assets/img/avatar.svg"
}) => {
  return (
    <header className="px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-gray-900">
          {title}
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-base font-semibold text-gray-700">
              {userName}
            </p>
            <p className="text-sm text-gray-500">{userRole}</p>
          </div>
          <div className="w-14 h-14 rounded-xl overflow-hidden p-[6px] bg-[#7CAD39]">
            <img
              src={userAvatar}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;