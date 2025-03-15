
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placeholder pages for the sidebar menu items
import AIAgentsPage from "./pages/AIAgentsPage";
import ActiveNumbersPage from "./pages/ActiveNumbersPage";
import CallLogsPage from "./pages/CallLogsPage";
import CallLogDetailPage from "./pages/CallLogDetailPage";
import ContactsPage from "./pages/ContactsPage";
import WebhooksPage from "./pages/WebhooksPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import LaunchAIPage from "./pages/LaunchAIPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-agents" element={<AIAgentsPage />} />
          <Route path="/active-numbers" element={<ActiveNumbersPage />} />
          <Route path="/call-logs" element={<CallLogsPage />} />
          <Route path="/call-logs/:id" element={<CallLogDetailPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/webhooks" element={<WebhooksPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/launch-ai" element={<LaunchAIPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
