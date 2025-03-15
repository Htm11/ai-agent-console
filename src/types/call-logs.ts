
export interface Recording {
  url: string;
  duration: number;
}

export type SentimentType = 'positive' | 'negative' | 'neutral' | null;
export type CallStatus = 'completed' | 'missed' | 'in-progress' | 'failed';

export interface CallLog {
  id: string;
  callerId: string;
  callerName: string;
  timestamp: Date;
  duration: number; // in seconds
  status: CallStatus;
  recording: Recording | null;
  transcript: string | null;
  sentiment: SentimentType;
  agentName: string | null;
  latency: number | null; // in milliseconds
  tags: string[];
}
