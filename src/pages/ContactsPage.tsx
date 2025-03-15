
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const ContactsPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <p className="text-muted-foreground">Manage your contacts and address book here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
