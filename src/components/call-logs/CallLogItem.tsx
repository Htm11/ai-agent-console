
import React, { useState } from 'react';
import { format } from 'date-fns';
import { CallLog } from '@/types/call-logs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Calendar, Clock, User, FileAudio, FileText, Gauge, MoveDown, PlusCircle, Tag, MessagesSquare } from 'lucide-react';

interface CallLogItemProps {
  callLog: CallLog;
}

const CallLogItem: React.FC<CallLogItemProps> = ({ callLog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
    <>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <Collapsible
            open={isExpanded}
            onOpenChange={setIsExpanded}
            className="w-full"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="h-8 w-8 text-primary/70 bg-primary/10 p-1.5 rounded-full" />
                </div>
                <div>
                  <h3 className="font-medium">{callLog.callerName}</h3>
                  <p className="text-sm text-muted-foreground">{callLog.callerId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(callLog.status)}>
                  {callLog.status}
                </Badge>
                {callLog.sentiment && (
                  <Badge variant="outline" className={getSentimentColor(callLog.sentiment)}>
                    {callLog.sentiment}
                  </Badge>
                )}
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8 rounded-full">
                    <MoveDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            
            <CollapsibleContent>
              <div className="border-t px-4 py-3 space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(callLog.timestamp, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{format(callLog.timestamp, 'h:mm a')} ({formatDuration(callLog.duration)})</span>
                  </div>
                  {callLog.agentName && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{callLog.agentName}</span>
                    </div>
                  )}
                  {callLog.latency && (
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span>Latency: {callLog.latency}ms</span>
                    </div>
                  )}
                </div>
                
                {callLog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                    {callLog.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {(callLog.transcript || callLog.recording) && (
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setIsDetailModalOpen(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      View Full Details
                    </Button>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{callLog.callerName}</h3>
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
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(callLog.timestamp, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{format(callLog.timestamp, 'h:mm a')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Duration: {formatDuration(callLog.duration)}</span>
              </div>
              {callLog.agentName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{callLog.agentName}</span>
                </div>
              )}
              {callLog.latency && (
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span>Latency: {callLog.latency}ms</span>
                </div>
              )}
            </div>
            
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
                    <div className="flex items-start gap-2 mb-2">
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallLogItem;
