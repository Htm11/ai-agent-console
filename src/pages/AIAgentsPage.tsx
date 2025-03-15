
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Phone, Plus, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface AIAgent {
  id: string;
  name: string;
  type: 'sales' | 'customer-service' | 'appointment';
  status: 'active' | 'paused' | 'draft';
  calls: number;
  lastModified: Date;
}

const mockAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Sales Assistant',
    type: 'sales',
    status: 'active',
    calls: 142,
    lastModified: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'Support Agent',
    type: 'customer-service',
    status: 'active',
    calls: 356,
    lastModified: new Date('2023-06-10')
  },
  {
    id: '3',
    name: 'Appointment Scheduler',
    type: 'appointment',
    status: 'paused',
    calls: 89,
    lastModified: new Date('2023-05-22')
  },
  {
    id: '4',
    name: 'Lead Qualifier',
    type: 'sales',
    status: 'draft',
    calls: 0,
    lastModified: new Date('2023-06-18')
  }
];

const getStatusColor = (status: AIAgent['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'draft':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type: AIAgent['type']) => {
  switch (type) {
    case 'sales':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'customer-service':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'appointment':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const AIAgentsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <Button className="gap-2">
            <Plus size={16} />
            New Agent
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAgents.map((agent) => (
                <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bot size={20} className="text-primary" />
                      </div>
                      <Badge variant="outline" className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{agent.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className={getTypeColor(agent.type)}>
                        {agent.type}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{agent.calls} calls</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Settings size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAgents.filter(agent => agent.status === 'active').map((agent) => (
                <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bot size={20} className="text-primary" />
                      </div>
                      <Badge variant="outline" className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{agent.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className={getTypeColor(agent.type)}>
                        {agent.type}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{agent.calls} calls</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Settings size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="paused" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAgents.filter(agent => agent.status === 'paused').map((agent) => (
                <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bot size={20} className="text-primary" />
                      </div>
                      <Badge variant="outline" className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{agent.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className={getTypeColor(agent.type)}>
                        {agent.type}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{agent.calls} calls</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Settings size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="draft" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAgents.filter(agent => agent.status === 'draft').map((agent) => (
                <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bot size={20} className="text-primary" />
                      </div>
                      <Badge variant="outline" className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{agent.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className={getTypeColor(agent.type)}>
                        {agent.type}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{agent.calls} calls</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Settings size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIAgentsPage;
