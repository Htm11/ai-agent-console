
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
      "h-screen bg-sidebar relative flex flex-col border-r overflow-hidden transition-all duration-300 ease-in-out animate-fade-in",
      isMobile ? "fixed z-40 w-60" : "w-60",
      !isSidebarOpen && !isMobile && "w-14"
    )}>
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-sidebar-accent"
        >
          <X size={16} className="text-sidebar-foreground" />
        </button>
      )}
      
      <div className="p-3 flex items-center">
        <div className="w-7 h-7 mr-3 rounded-md bg-primary/80 flex items-center justify-center">
          <Bot size={14} className="text-primary-foreground" />
        </div>
        {(isSidebarOpen || isMobile) && (
          <h1 className="text-base font-semibold">Voice Agents</h1>
        )}
      </div>
      
      <div className="px-2 py-2 flex-1 overflow-y-auto menu-animation">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "sidebar-item mb-1.5 group",
                isActive && "active"
              )}
            >
              <item.icon size={16} className={cn(
                "transition-transform duration-200",
                !isSidebarOpen && !isMobile && "ml-0.5"
              )} />
              {(isSidebarOpen || isMobile) && (
                <span className="text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
      
      <div className="p-3 border-t">
        <div className="bg-sidebar-accent/50 rounded-lg p-2 mb-2">
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
              className="sidebar-item mb-1 text-sm"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings size={16} />
              <span>General Settings</span>
              {isSettingsOpen ? 
                <ChevronUp size={14} className="ml-auto" /> : 
                <ChevronDown size={14} className="ml-auto" />
              }
            </div>
            
            {isSettingsOpen && (
              <div className="pl-3 menu-animation">
                {settingsMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="sidebar-item mb-1 text-sm"
                  >
                    <item.icon size={14} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : isSidebarOpen ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="sidebar-item mb-1 cursor-pointer text-sm">
                <Settings size={16} />
                <span>General Settings</span>
                <ChevronUp size={14} className="ml-auto" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end" side="top">
              <div className="py-1 menu-animation">
                {settingsMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-2 text-xs cursor-pointer hover:bg-sidebar-accent transition-colors"
                  >
                    <item.icon size={14} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex justify-center">
            <Settings size={16} className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
