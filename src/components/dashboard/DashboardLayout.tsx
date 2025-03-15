
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Reset mobile sidebar state when switching between mobile and desktop
  useEffect(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleDesktopSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Sidebar 
          isMobile={false} 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleDesktopSidebar} 
        />
      )}
      
      {/* Sidebar for mobile */}
      {isMobile && isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 backdrop-blur-sm" onClick={toggleMobileSidebar}></div>
      )}
      
      {isMobile && (
        <Sidebar 
          isMobile={true} 
          isSidebarOpen={true} 
          toggleSidebar={toggleMobileSidebar} 
        />
      )}
      
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
          <div className="p-3 flex items-center border-b">
            {!isMobile && (
              <button 
                onClick={toggleDesktopSidebar}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            
            {isMobile && (
              <button 
                onClick={toggleMobileSidebar}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            )}
            
            <div className="ml-2">
              <h1 className="text-lg font-medium">AI Voice Agents Dashboard</h1>
            </div>
          </div>
        </div>
        
        <div className="p-4 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
