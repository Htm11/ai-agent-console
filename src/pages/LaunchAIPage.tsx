
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles } from 'lucide-react';

const LaunchAIPage = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in max-w-2xl mx-auto text-center py-12">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
          <Bot size={32} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Launch New AI Agent</h1>
        <p className="text-muted-foreground mb-8">
          Create a new AI voice agent for your business. Configure the behavior, voice, and capabilities of your new agent.
        </p>
        <Button size="lg" className="gap-2">
          <Sparkles size={18} />
          Create New Agent
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default LaunchAIPage;
