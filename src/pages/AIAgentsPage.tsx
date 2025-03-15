
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const AIAgentsPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">AI Agents</h1>
        <p className="text-muted-foreground">Manage your AI voice agents here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AIAgentsPage;
