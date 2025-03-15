
import React from 'react';
import { CallLog } from '@/types/call-logs';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Phone, MessagesSquare, FileAudio } from 'lucide-react';

interface CallLogsListProps {
  callLogs: CallLog[];
}

const CallLogsList: React.FC<CallLogsListProps> = ({ callLogs }) => {
  const navigate = useNavigate();

  if (callLogs.length === 0) {
    return (
      <div className="bg-background border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No call logs found for this period.</p>
      </div>
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
    <Table className="border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>Caller</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead className="text-center">Content</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {callLogs.map((log) => (
          <TableRow 
            key={log.id} 
            className="cursor-pointer hover:bg-muted"
            onClick={() => navigate(`/call-logs/${log.id}`)}
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Phone className="h-3.5 w-3.5 text-primary/70" />
                </div>
                <div>
                  <p className="font-medium">{log.callerName}</p>
                  <p className="text-xs text-muted-foreground">{log.callerId}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p>{format(log.timestamp, 'MMM dd, yyyy')}</p>
              <p className="text-xs text-muted-foreground">{format(log.timestamp, 'h:mm a')}</p>
            </TableCell>
            <TableCell>{formatDuration(log.duration)}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(log.status)}>
                {log.status}
              </Badge>
            </TableCell>
            <TableCell>
              {log.sentiment && (
                <Badge variant="outline" className={getSentimentColor(log.sentiment)}>
                  {log.sentiment}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex justify-center gap-3">
                {log.transcript && <MessagesSquare className="h-4 w-4 text-muted-foreground" />}
                {log.recording && <FileAudio className="h-4 w-4 text-muted-foreground" />}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CallLogsList;
