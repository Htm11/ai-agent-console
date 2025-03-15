
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const ActiveNumbersPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Active Numbers</h1>
        <p className="text-muted-foreground">Manage your active phone numbers here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ActiveNumbersPage;
