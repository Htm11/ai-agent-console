
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, User, Gauge, FileAudio, FileText, MessagesSquare, Tag } from 'lucide-react';
import { CallLog } from '@/types/call-logs';

// Import mock data for now (in a real app, you'd fetch this based on the ID)
import { mockCallLogs } from './CallLogsPage';

const CallLogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the call log with the matching ID
  const callLog = mockCallLogs.find(log => log.id === id);
  
  if (!callLog) {
    return (
      <DashboardLayout>
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/call-logs')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Call Logs
            </Button>
          </div>
          <Card>
            <CardContent className="py-10">
              <p className="text-center text-muted-foreground">Call log not found</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }
  
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentColor = (sentiment: CallLog['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: CallLog['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'missed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/call-logs')}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Call Logs
          </Button>
        </div>
        
        <Card>
          <CardContent className="py-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold">{callLog.callerName}</h2>
                <p className="text-muted-foreground">{callLog.callerId}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className={getStatusColor(callLog.status)}>
                  {callLog.status}
                </Badge>
                {callLog.sentiment && (
                  <Badge variant="outline" className={getSentimentColor(callLog.sentiment)}>
                    {callLog.sentiment}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{format(callLog.timestamp, 'MMM dd, yyyy')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>{format(callLog.timestamp, 'h:mm a')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p>{formatDuration(callLog.duration)}</p>
                </div>
              </div>
              {callLog.agentName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Agent</p>
                    <p>{callLog.agentName}</p>
                  </div>
                </div>
              )}
              {callLog.latency && (
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p>{callLog.latency}ms</p>
                  </div>
                </div>
              )}
            </div>
            
            {callLog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-6 items-center">
                <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                {callLog.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <Tabs defaultValue="transcript" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="transcript" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Transcript
                </TabsTrigger>
                <TabsTrigger value="recording" className="flex-1">
                  <FileAudio className="h-4 w-4 mr-2" />
                  Recording
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcript" className="mt-4">
                {callLog.transcript ? (
                  <div className="border rounded-md p-4 bg-muted/30">
                    <div className="flex items-start gap-2">
                      <MessagesSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                      <p className="text-sm whitespace-pre-wrap">{callLog.transcript}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No transcript available
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recording" className="mt-4">
                {callLog.recording ? (
                  <div className="border rounded-md p-4 bg-muted/30">
                    <audio 
                      controls 
                      className="w-full"
                      src={callLog.recording.url}
                    >
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recording duration: {formatDuration(callLog.recording.duration)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No recording available
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CallLogDetailPage;
