
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CallLogsList from '@/components/call-logs/CallLogsList';
import { CallLog } from '@/types/call-logs';

// Mock data for call logs - export so it can be used in the detail page
export const mockCallLogs: CallLog[] = [
  {
    id: '1',
    callerId: '+1234567890',
    callerName: 'John Doe',
    timestamp: new Date('2023-05-12T14:30:00'),
    duration: 145, // in seconds
    status: 'completed',
    recording: {
      url: 'https://example.com/recordings/call-1.mp3',
      duration: 145
    },
    transcript: "Hello, I'm interested in upgrading my current plan. Can you tell me about the premium features?",
    sentiment: 'positive',
    agentName: 'Sales Assistant',
    latency: 120, // in milliseconds
    tags: ['sales', 'upgrade']
  },
  {
    id: '2',
    callerId: '+1987654321',
    callerName: 'Jane Smith',
    timestamp: new Date('2023-05-10T11:15:00'),
    duration: 320, // in seconds
    status: 'completed',
    recording: {
      url: 'https://example.com/recordings/call-2.mp3',
      duration: 320
    },
    transcript: "I've been having issues with my account. I can't seem to access my reports from last month.",
    sentiment: 'neutral',
    agentName: 'Support Assistant',
    latency: 150, // in milliseconds
    tags: ['support', 'account-issue']
  },
  {
    id: '3',
    callerId: '+1567890123',
    callerName: 'Robert Johnson',
    timestamp: new Date('2023-05-09T09:45:00'),
    duration: 78, // in seconds
    status: 'completed',
    recording: {
      url: 'https://example.com/recordings/call-3.mp3',
      duration: 78
    },
    transcript: "This service is terrible! I've been waiting for a response for three days now. I want to cancel my subscription immediately!",
    sentiment: 'negative',
    agentName: 'Support Assistant',
    latency: 200, // in milliseconds
    tags: ['support', 'cancellation']
  },
  {
    id: '4',
    callerId: '+1456789012',
    callerName: 'Emily Williams',
    timestamp: new Date('2023-05-08T16:20:00'),
    duration: 215, // in seconds
    status: 'completed',
    recording: {
      url: 'https://example.com/recordings/call-4.mp3',
      duration: 215
    },
    transcript: "I'd like to schedule a demo for my team. We're looking to implement your solution company-wide.",
    sentiment: 'positive',
    agentName: 'Sales Assistant',
    latency: 110, // in milliseconds
    tags: ['sales', 'demo']
  },
  {
    id: '5',
    callerId: 'Unknown',
    callerName: 'Unknown Caller',
    timestamp: new Date('2023-05-07T13:10:00'),
    duration: 45, // in seconds
    status: 'missed',
    recording: null,
    transcript: null,
    sentiment: null,
    agentName: null,
    latency: null,
    tags: ['unknown']
  }
];

const CallLogsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Call Logs</h1>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedPeriod}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <CallLogsList callLogs={mockCallLogs} />
          </TabsContent>
          
          <TabsContent value="today" className="mt-0">
            <CallLogsList 
              callLogs={mockCallLogs.filter(log => {
                const today = new Date();
                return log.timestamp.toDateString() === today.toDateString();
              })} 
            />
          </TabsContent>
          
          <TabsContent value="week" className="mt-0">
            <CallLogsList 
              callLogs={mockCallLogs.filter(log => {
                const today = new Date();
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                return log.timestamp >= weekAgo;
              })} 
            />
          </TabsContent>
          
          <TabsContent value="month" className="mt-0">
            <CallLogsList 
              callLogs={mockCallLogs.filter(log => {
                const today = new Date();
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                return log.timestamp >= monthAgo;
              })} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CallLogsPage;
