
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Webhook, Edit, Trash, AlertCircle, Check, Copy } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  lastTriggered: Date | null;
}

const mockWebhooks: Webhook[] = [
  {
    id: '1',
    name: 'Call Completed Notification',
    url: 'https://api.example.com/webhooks/call-completed',
    events: ['call.completed'],
    status: 'active',
    lastTriggered: new Date('2023-06-10T15:30:00')
  },
  {
    id: '2',
    name: 'New Call Started',
    url: 'https://api.example.com/webhooks/call-started',
    events: ['call.started'],
    status: 'active',
    lastTriggered: new Date('2023-06-15T09:45:00')
  },
  {
    id: '3',
    name: 'AI Agent Status Change',
    url: 'https://api.example.com/webhooks/agent-status',
    events: ['agent.status.changed'],
    status: 'inactive',
    lastTriggered: null
  },
  {
    id: '4',
    name: 'Call Recording Available',
    url: 'https://api.example.com/webhooks/recording-ready',
    events: ['recording.ready'],
    status: 'active',
    lastTriggered: new Date('2023-06-12T14:22:00')
  }
];

const getEventColor = (event: string) => {
  if (event.startsWith('call')) {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  } else if (event.startsWith('agent')) {
    return 'bg-purple-100 text-purple-800 border-purple-200';
  } else if (event.startsWith('recording')) {
    return 'bg-amber-100 text-amber-800 border-amber-200';
  } else {
    return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const WebhooksPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Webhooks</h1>
            <p className="text-muted-foreground">Configure webhooks to integrate with external systems</p>
          </div>
          <Button className="gap-2">
            <PlusCircle size={16} />
            New Webhook
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Webhooks Overview</CardTitle>
            <CardDescription>Receive real-time updates about calls and agent activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total Webhooks</p>
                <p className="text-2xl font-semibold">{mockWebhooks.length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-semibold">{mockWebhooks.filter(w => w.status === 'active').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Event Types</p>
                <p className="text-2xl font-semibold">{new Set(mockWebhooks.flatMap(w => w.events)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {mockWebhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Webhook size={16} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">{webhook.name}</CardTitle>
                  </div>
                  <Switch checked={webhook.status === 'active'} />
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md bg-muted/30">
                    <div className="flex items-center gap-2 text-sm truncate">
                      <span className="text-muted-foreground">URL:</span>
                      <code className="font-mono">{webhook.url}</code>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Copy size={14} />
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Events:</h4>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event, idx) => (
                        <Badge key={idx} variant="outline" className={getEventColor(event)}>
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-3">
                    <div className="text-sm">
                      {webhook.lastTriggered ? (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Check size={14} className="text-green-500" />
                          Last triggered: {webhook.lastTriggered.toLocaleDateString()} at {webhook.lastTriggered.toLocaleTimeString()}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <AlertCircle size={14} className="text-amber-500" />
                          Never triggered
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive">
                        <Trash size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WebhooksPage;
