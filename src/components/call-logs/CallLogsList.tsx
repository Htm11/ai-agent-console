
import React from 'react';
import { CallLog } from '@/types/call-logs';
import CallLogItem from './CallLogItem';

interface CallLogsListProps {
  callLogs: CallLog[];
}

const CallLogsList: React.FC<CallLogsListProps> = ({ callLogs }) => {
  if (callLogs.length === 0) {
    return (
      <div className="bg-background border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No call logs found for this period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {callLogs.map((log) => (
        <CallLogItem key={log.id} callLog={log} />
      ))}
    </div>
  );
};

export default CallLogsList;
