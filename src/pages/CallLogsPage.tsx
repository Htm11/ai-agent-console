
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const CallLogsPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Call Logs</h1>
        <p className="text-muted-foreground">View your call history and logs here.</p>
      </div>
    </DashboardLayout>
  );
};

export default CallLogsPage;
