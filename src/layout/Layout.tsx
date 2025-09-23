import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSidebar";
import DesktopHeader from "./DesktopHeader";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  activeNavItem?: string;
  onNavItemClick?: (itemId: string) => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  activeNavItem,
  onNavItemClick,
  userName,
  userRole,
  userAvatar
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-[#20271D] overflow-hidden">
        <div className="flex w-full h-full">
          {/* Desktop Sidebar */}
          <Sidebar
            activeItem={activeNavItem}
            onItemClick={onNavItemClick}
          />

          {/* Main Content with rounded corners */}
          <div className="flex-1 bg-white rounded-l-[17px] overflow-hidden flex flex-col h-full">
            {/* Desktop Header */}
            <DesktopHeader
              title={title}
              userName={userName}
              userRole={userRole}
              userAvatar={userAvatar}
            />

            {/* Desktop Content with scroll */}
            <main className="flex-1 overflow-y-auto px-8 py-6 text-gray-700">
              {children}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile Content */}
      <main className="md:hidden px-4 py-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;