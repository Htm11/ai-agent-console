
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const WebhooksPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Webhooks</h1>
        <p className="text-muted-foreground">Configure and manage your webhooks for integration with other services.</p>
      </div>
    </DashboardLayout>
  );
};

export default WebhooksPage;
