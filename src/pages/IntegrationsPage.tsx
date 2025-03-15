
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const IntegrationsPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Integrations</h1>
        <p className="text-muted-foreground">Connect your AI voice agents with other services and platforms.</p>
      </div>
    </DashboardLayout>
  );
};

export default IntegrationsPage;
