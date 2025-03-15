
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, ExternalLink, Globe, MessageSquare, Calendar, FileText, CreditCard } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected';
  lastSynced?: Date;
  category: 'crm' | 'messaging' | 'calendar' | 'document' | 'payment';
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Salesforce',
    description: 'Sync customer data with Salesforce CRM',
    icon: <Globe className="h-5 w-5" />,
    status: 'connected',
    lastSynced: new Date('2023-06-10T15:30:00'),
    category: 'crm'
  },
  {
    id: '2',
    name: 'Zendesk',
    description: 'Create tickets from calls automatically',
    icon: <MessageSquare className="h-5 w-5" />,
    status: 'disconnected',
    category: 'crm'
  },
  {
    id: '3',
    name: 'Google Calendar',
    description: 'Schedule appointments from calls',
    icon: <Calendar className="h-5 w-5" />,
    status: 'connected',
    lastSynced: new Date('2023-06-15T09:45:00'),
    category: 'calendar'
  },
  {
    id: '4',
    name: 'Slack',
    description: 'Get notifications for important events',
    icon: <MessageSquare className="h-5 w-5" />,
    status: 'connected',
    lastSynced: new Date('2023-06-12T14:22:00'),
    category: 'messaging'
  },
  {
    id: '5',
    name: 'Google Drive',
    description: 'Store call recordings and transcripts',
    icon: <FileText className="h-5 w-5" />,
    status: 'disconnected',
    category: 'document'
  },
  {
    id: '6',
    name: 'Stripe',
    description: 'Process payments during calls',
    icon: <CreditCard className="h-5 w-5" />,
    status: 'disconnected',
    category: 'payment'
  }
];

const getCategoryColor = (category: Integration['category']) => {
  switch (category) {
    case 'crm':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'messaging':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'calendar':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'document':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'payment':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: Integration['status']) => {
  switch (status) {
    case 'connected':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'disconnected':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const IntegrationsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-muted-foreground">Connect your AI voice agents with other services</p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Integrations Overview</CardTitle>
            <CardDescription>You have {mockIntegrations.filter(i => i.status === 'connected').length} active integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-semibold">{mockIntegrations.length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-2xl font-semibold">{mockIntegrations.filter(i => i.status === 'connected').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Disconnected</p>
                <p className="text-2xl font-semibold">{mockIntegrations.filter(i => i.status === 'disconnected').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-semibold">{new Set(mockIntegrations.map(i => i.category)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {integration.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge variant="outline" className={getCategoryColor(integration.category)}>
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-3">
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
                {integration.lastSynced && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Last synced: {integration.lastSynced.toLocaleDateString()} {integration.lastSynced.toLocaleTimeString()}
                  </p>
                )}
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                {integration.status === 'connected' ? (
                  <>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Settings size={14} />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-destructive">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button className="w-full gap-1">
                    <ExternalLink size={14} />
                    Connect
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntegrationsPage;
