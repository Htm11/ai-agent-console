
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
        <div className="fixed inset-0 bg-black/50 z-30" onClick={toggleMobileSidebar}></div>
      )}
      
      {isMobile && (
        <Sidebar 
          isMobile={true} 
          isSidebarOpen={true} 
          toggleSidebar={toggleMobileSidebar} 
        />
      )}
      
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background">
          <div className="px-4 py-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              {!isMobile && (
                <button 
                  onClick={toggleDesktopSidebar}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              )}
              
              {isMobile && (
                <button 
                  onClick={toggleMobileSidebar}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              )}
              
              <h1 className="text-sm font-semibold">Callab AI Dashboard</h1>
            </div>
            
            {/* You can add user profile or additional header elements here */}
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
