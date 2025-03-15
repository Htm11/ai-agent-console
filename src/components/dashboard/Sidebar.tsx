
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Bot, PhoneCall, Clock, Users, Webhook, Puzzle, 
  ChevronDown, ChevronUp, Settings, Key, User, Receipt, X, Menu
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isMobile, isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const creditBalance = 75; // Example value (percentage)

  const menuItems = [
    { id: 'ai-agents', label: 'AI Agents', icon: Bot, path: '/ai-agents' },
    { id: 'active-numbers', label: 'Active Numbers', icon: PhoneCall, path: '/active-numbers' },
    { id: 'call-logs', label: 'Call Logs', icon: Clock, path: '/call-logs' },
    { id: 'contacts', label: 'Contacts', icon: Users, path: '/contacts' },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook, path: '/webhooks' },
    { id: 'integrations', label: 'Integrations', icon: Puzzle, path: '/integrations' }
  ];

  const settingsMenuItems = [
    { id: 'credentials', label: 'Credentials', icon: Key, path: '/settings?tab=credentials' },
    { id: 'users', label: 'Users', icon: User, path: '/settings?tab=users' },
    { id: 'billing', label: 'Billing Overview', icon: Receipt, path: '/settings?tab=billing' }
  ];

  if (!isSidebarOpen && isMobile) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 bg-background border rounded-md shadow-sm z-50"
      >
        <Menu size={16} />
      </button>
    );
  }

  return (
    <div className={cn(
      "h-screen bg-sidebar text-sidebar-foreground relative flex flex-col border-r overflow-hidden transition-all duration-300 ease-in-out",
      isMobile ? "fixed z-40 w-64" : "w-64",
      !isSidebarOpen && !isMobile && "w-16"
    )}>
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-sidebar-accent/50"
        >
          <X size={16} className="text-sidebar-foreground" />
        </button>
      )}
      
      <div className="py-5 px-4 flex items-center justify-center border-b border-sidebar-border">
        {(isSidebarOpen || isMobile) ? (
          <img 
            src="/lovable-uploads/8d387d20-f6d7-4ae4-9083-cb9133b1580e.png" 
            alt="Callab AI Logo" 
            className="h-7" 
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#341539]"></div>
        )}
      </div>
      
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "sidebar-item text-xs group",
                  isActive && "active"
                )}
              >
                <item.icon size={16} className="min-w-4" />
                {(isSidebarOpen || isMobile) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-3 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/30 rounded-lg p-3 mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">Credit Balance</span>
            <span className="text-xs font-bold">{creditBalance}%</span>
          </div>
          <Progress value={creditBalance} className="h-1.5" />
          {(isSidebarOpen || isMobile) && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-sidebar-foreground/70">Remaining</span>
              <span className="text-xs font-semibold">$126.50</span>
            </div>
          )}
        </div>
        
        {isMobile ? (
          <div>
            <div 
              className="sidebar-item text-xs flex items-center justify-between"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center">
                <Settings size={16} className="min-w-4" />
                <span className="ml-2 truncate">Settings</span>
              </div>
              {isSettingsOpen ? 
                <ChevronUp size={14} /> : 
                <ChevronDown size={14} />
              }
            </div>
            
            {isSettingsOpen && (
              <div className="pl-4 pt-1.5 space-y-1.5">
                {settingsMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="sidebar-item text-xs"
                  >
                    <item.icon size={14} className="min-w-4" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : isSidebarOpen ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="sidebar-item text-xs flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <Settings size={16} className="min-w-4" />
                  <span className="ml-2 truncate">Settings</span>
                </div>
                <ChevronUp size={14} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end" side="top">
              <div className="py-1">
                {settingsMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-sidebar-accent transition-colors"
                  >
                    <item.icon size={14} className="min-w-4" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex justify-center py-1">
            <Settings size={16} className="cursor-pointer text-sidebar-foreground/80 hover:text-sidebar-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
