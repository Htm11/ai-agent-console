
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Bot, PhoneCall, Clock, Users, Webhook, Puzzle, 
  ChevronDown, ChevronUp, Settings, Key, User, Receipt, X, Menu, Search, Captions
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isMobile, isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsSearch, setSettingsSearch] = useState('');
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
    { 
      id: 'account', 
      label: 'Account', 
      subtitle: 'Manage account settings',
      icon: User, 
      items: [
        { id: 'credentials', label: 'API Credentials', icon: Key, path: '/settings?tab=credentials' },
        { id: 'users', label: 'Team Members', icon: User, path: '/settings?tab=users' }
      ]
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      subtitle: 'Manage subscription and payments',
      icon: Receipt, 
      items: [
        { id: 'billing', label: 'Billing Overview', icon: Receipt, path: '/settings?tab=billing' }
      ]
    }
  ];

  const filterSettingsItems = (query: string) => {
    if (!query) return settingsMenuItems;
    
    return settingsMenuItems
      .map(category => {
        // Filter items within each category
        const filteredItems = category.items.filter(item => 
          item.label.toLowerCase().includes(query.toLowerCase())
        );
        
        // Only include categories that have matching items
        if (filteredItems.length > 0) {
          return { ...category, items: filteredItems };
        }
        return null;
      })
      .filter(Boolean) as typeof settingsMenuItems;
  };

  const filteredSettingsMenuItems = filterSettingsItems(settingsSearch);

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
      "h-screen text-sidebar-foreground relative flex flex-col border-r overflow-hidden transition-all duration-300 ease-in-out",
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
              <div className="pl-4 pt-3 space-y-3">
                <div className="px-2">
                  <Input
                    type="text"
                    placeholder="Search settings..."
                    value={settingsSearch}
                    onChange={(e) => setSettingsSearch(e.target.value)}
                    className="h-7 text-xs"
                    prefix={<Search size={12} className="mr-1.5 text-sidebar-foreground/60" />}
                  />
                </div>
                
                {filteredSettingsMenuItems.length > 0 ? (
                  filteredSettingsMenuItems.map((category) => (
                    <div key={category.id} className="space-y-1.5">
                      <div className="flex items-center px-2 text-[11px] text-sidebar-foreground/60 font-medium">
                        <Captions size={12} className="mr-1.5" />
                        <span>{category.label}</span>
                      </div>
                      <div className="text-[10px] px-2 -mt-1 mb-1.5 text-sidebar-foreground/50">
                        {category.subtitle}
                      </div>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="sidebar-item text-xs py-1.5"
                          >
                            <item.icon size={14} className="min-w-4" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-3 text-center text-xs text-sidebar-foreground/50">
                    No settings match your search
                  </div>
                )}
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
            <PopoverContent className="w-64 p-2" align="end" side="top">
              <Command className="rounded-lg border shadow-md">
                <CommandInput 
                  placeholder="Search settings..." 
                  value={settingsSearch}
                  onValueChange={setSettingsSearch}
                  className="h-8 text-xs"
                />
                <CommandList>
                  {filteredSettingsMenuItems.length > 0 ? (
                    filteredSettingsMenuItems.map((category) => (
                      <CommandGroup key={category.id} heading={
                        <div className="flex items-center text-xs">
                          <Captions size={12} className="mr-1.5" />
                          <span>{category.label}</span>
                        </div>
                      } className="py-1.5">
                        <div className="text-[10px] px-2 -mt-1 mb-1.5 text-sidebar-foreground/50">
                          {category.subtitle}
                        </div>
                        {category.items.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.id}
                            className="text-xs flex items-center gap-2 py-1.5"
                            onSelect={() => {
                              window.location.href = item.path;
                            }}
                          >
                            <item.icon size={14} className="min-w-4" />
                            <span>{item.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))
                  ) : (
                    <CommandEmpty className="py-3 text-xs">
                      No settings match your search
                    </CommandEmpty>
                  )}
                </CommandList>
              </Command>
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
