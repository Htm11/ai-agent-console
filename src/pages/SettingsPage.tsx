
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, User, Receipt } from 'lucide-react';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p className="text-muted-foreground mb-6">Manage your account settings and preferences.</p>
        
        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="credentials" className="flex items-center gap-2">
              <Key size={14} />
              <span>Credentials</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User size={14} />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Receipt size={14} />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="credentials" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>API Credentials</CardTitle>
                <CardDescription>
                  Manage your API keys and authentication settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>API credential settings will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Add and manage users for your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>User management settings will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Overview</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Billing information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
