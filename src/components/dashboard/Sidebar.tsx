
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { 
  Bot, PhoneCall, Clock, Users, Webhook, PuzzlePiece, 
  Play, ChevronDown, ChevronUp, Settings, Key, User, Receipt, X, Menu
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
  const [activeItem, setActiveItem] = useState('ai-agents');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const creditBalance = 75; // Example value (percentage)

  const menuItems = [
    { id: 'ai-agents', label: 'AI Agents', icon: Bot },
    { id: 'active-numbers', label: 'Active Numbers', icon: PhoneCall },
    { id: 'call-logs', label: 'Call Logs', icon: Clock },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'integrations', label: 'Integrations', icon: PuzzlePiece },
    { id: 'launch-ai', label: 'Launch AI', icon: Play, highlight: true }
  ];

  const settingsMenuItems = [
    { id: 'credentials', label: 'Credentials', icon: Key },
    { id: 'users', label: 'Users', icon: User },
    { id: 'billing', label: 'Billing Overview', icon: Receipt }
  ];

  if (!isSidebarOpen && isMobile) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 bg-background border rounded-md shadow-sm z-50"
      >
        <Menu size={18} />
      </button>
    );
  }

  return (
    <div className={cn(
      "h-screen bg-sidebar relative flex flex-col border-r overflow-hidden transition-all duration-300 ease-in-out animate-fade-in",
      isMobile ? "fixed z-40 w-64" : "w-64",
      !isSidebarOpen && !isMobile && "w-16"
    )}>
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-sidebar-accent"
        >
          <X size={18} className="text-sidebar-foreground" />
        </button>
      )}
      
      <div className="p-4 flex items-center">
        <div className="w-8 h-8 mr-3 rounded-md bg-primary flex items-center justify-center">
          <Bot size={16} className="text-primary-foreground" />
        </div>
        {(isSidebarOpen || isMobile) && (
          <h1 className="text-lg font-semibold">Voice Agents</h1>
        )}
      </div>
      
      <div className="px-2 py-3 flex-1 overflow-y-auto menu-animation">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={cn(
              "sidebar-item mb-1 group",
              activeItem === item.id && "active",
              item.highlight && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            )}
          >
            <item.icon size={18} className={cn(
              "transition-transform duration-200",
              !isSidebarOpen && !isMobile && "ml-1",
              item.highlight ? "text-primary-foreground" : "text-sidebar-foreground"
            )} />
            {(isSidebarOpen || isMobile) && (
              <span className={item.highlight ? "text-primary-foreground" : ""}>{item.label}</span>
            )}
            {item.highlight && (isSidebarOpen || isMobile) && (
              <span className="ml-auto px-1.5 py-0.5 bg-white/20 rounded text-xs font-semibold">New</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t">
        <div className="bg-sidebar-accent rounded-lg p-3 mb-3">
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
              className="sidebar-item mb-1"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings size={18} />
              <span>General Settings</span>
              {isSettingsOpen ? 
                <ChevronUp size={16} className="ml-auto" /> : 
                <ChevronDown size={16} className="ml-auto" />
              }
            </div>
            
            {isSettingsOpen && (
              <div className="pl-3 menu-animation">
                {settingsMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="sidebar-item mb-1"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isSidebarOpen ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="sidebar-item mb-1">
                <Settings size={18} />
                <span>General Settings</span>
                <ChevronUp size={16} className="ml-auto" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end" side="top">
              <div className="py-1 menu-animation">
                {settingsMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-sidebar-accent transition-colors"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex justify-center">
            <Settings size={18} className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
