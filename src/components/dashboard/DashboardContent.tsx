
import React from 'react';
import { Bot, Phone, Activity, ArrowUpRight, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
      <p className="text-muted-foreground">
        Here's an overview of your AI voice agents and current activities
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="overflow-hidden border-border animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
          <CardFooter className="p-2 bg-muted/50">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              View all agents
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden border-border animate-scale-in [animation-delay:100ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Numbers</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
          <CardFooter className="p-2 bg-muted/50">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              View all numbers
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden border-border animate-scale-in [animation-delay:200ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
            <p className="text-xs text-muted-foreground">
              +124 from last month
            </p>
          </CardContent>
          <CardFooter className="p-2 bg-muted/50">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              View call logs
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden border-border animate-scale-in [animation-delay:300ms] sm:col-span-2 lg:col-span-3 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="truncate">New agent "Customer Support" created</p>
              <p className="text-xs text-muted-foreground">10 minutes ago</p>
            </div>
          </CardContent>
          <CardFooter className="p-2 bg-muted/50">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              View all activity
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-12">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlayCircle className="mr-2 h-4 w-4" />
          Launch New AI Agent
        </Button>
      </div>
    </div>
  );
};

export default DashboardContent;
