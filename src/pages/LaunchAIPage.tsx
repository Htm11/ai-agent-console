
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, Sparkles, UserCircle, Phone, MessageSquare, 
  Clock, ShieldCheck, LucideHeadphones, Building, CreditCard, FileText 
} from 'lucide-react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select, SelectContent, SelectGroup, SelectItem, 
  SelectLabel, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const LaunchAIPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Bot size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Create New AI Agent</h1>
          <p className="text-muted-foreground">
            Configure your AI voice agent to handle calls just the way you want
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`flex items-center ${s < 4 ? 'flex-1' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s === step ? 'bg-primary text-primary-foreground' : 
                  s < step ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 4 && (
                <div 
                  className={`h-1 flex-1 ${
                    s < step ? 'bg-primary/20' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Choose a name and purpose for your AI agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="agent-name">
                  Agent Name
                </label>
                <Input 
                  id="agent-name" 
                  placeholder="e.g., Sales Assistant, Support Agent" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Agent Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <UserCircle size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Sales</p>
                        <p className="text-sm text-muted-foreground">Qualify leads and close deals</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <LucideHeadphones size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Support</p>
                        <p className="text-sm text-muted-foreground">Handle customer inquiries</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Clock size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Scheduling</p>
                        <p className="text-sm text-muted-foreground">Book appointments and meetings</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Building size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Custom</p>
                        <p className="text-sm text-muted-foreground">Create a specialized agent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="agent-description">
                  Description
                </label>
                <Textarea 
                  id="agent-description" 
                  placeholder="Describe what your agent will do" 
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button onClick={() => setStep(2)}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Voice & Conversation</CardTitle>
              <CardDescription>Configure how your agent sounds and responds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="voice">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="voice">Voice Settings</TabsTrigger>
                  <TabsTrigger value="conversation">Conversation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="voice" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Voice Selection</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Male Voices</SelectLabel>
                          <SelectItem value="michael">Michael (American)</SelectItem>
                          <SelectItem value="james">James (British)</SelectItem>
                          <SelectItem value="takumi">Takumi (Japanese)</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Female Voices</SelectLabel>
                          <SelectItem value="emma">Emma (American)</SelectItem>
                          <SelectItem value="sophia">Sophia (British)</SelectItem>
                          <SelectItem value="maria">Maria (Spanish)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Voice Preview</label>
                    <div className="border rounded-md p-3 flex items-center justify-center h-20 mt-2 bg-muted/30">
                      <Button className="gap-2">
                        <MessageSquare size={16} />
                        Play Sample
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Speaking Rate</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" className="w-full">Slow</Button>
                      <Button variant="outline" size="sm" className="w-full bg-muted/30">Normal</Button>
                      <Button variant="outline" size="sm" className="w-full">Fast</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="conversation" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Greeting Message</label>
                    <Textarea 
                      placeholder="Hello, this is [Agent Name]. How can I help you today?" 
                      rows={2} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conversation Style</label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between border rounded-md p-3 cursor-pointer hover:border-primary">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <ShieldCheck size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Professional</p>
                            <p className="text-xs text-muted-foreground">Formal, business-focused tone</p>
                          </div>
                        </div>
                        <Badge variant="outline">Selected</Badge>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3 cursor-pointer hover:border-primary">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted p-2 rounded-full">
                            <MessageSquare size={14} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Conversational</p>
                            <p className="text-xs text-muted-foreground">Friendly, approachable tone</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3 cursor-pointer hover:border-primary">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted p-2 rounded-full">
                            <Sparkles size={14} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Enthusiastic</p>
                            <p className="text-xs text-muted-foreground">Energetic, vibrant tone</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Knowledge & Capabilities</CardTitle>
              <CardDescription>Define what your agent knows and can do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Knowledge Base</label>
                <div className="flex flex-col gap-2">
                  <div className="border rounded-md p-3 flex justify-between items-center hover:bg-muted/30 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <span>Product Information</span>
                    </div>
                    <Badge>Selected</Badge>
                  </div>
                  <div className="border rounded-md p-3 flex justify-between items-center hover:bg-muted/30 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <span>Pricing & Plans</span>
                    </div>
                    <Badge>Selected</Badge>
                  </div>
                  <div className="border rounded-md p-3 flex justify-between items-center hover:bg-muted/30 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <span>FAQ & Support Articles</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2 mt-2">
                    <FileText size={14} />
                    Upload Custom Documents
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Agent Capabilities</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="border rounded-md p-3 flex items-center gap-2">
                    <input type="checkbox" id="cap-1" checked readOnly />
                    <label htmlFor="cap-1">Answer product questions</label>
                  </div>
                  <div className="border rounded-md p-3 flex items-center gap-2">
                    <input type="checkbox" id="cap-2" checked readOnly />
                    <label htmlFor="cap-2">Handle pricing inquiries</label>
                  </div>
                  <div className="border rounded-md p-3 flex items-center gap-2">
                    <input type="checkbox" id="cap-3" checked readOnly />
                    <label htmlFor="cap-3">Schedule appointments</label>
                  </div>
                  <div className="border rounded-md p-3 flex items-center gap-2">
                    <input type="checkbox" id="cap-4" />
                    <label htmlFor="cap-4">Process payments</label>
                  </div>
                  <div className="border rounded-md p-3 flex items-center gap-2">
                    <input type="checkbox" id="cap-5" />
                    <label htmlFor="cap-5">Transfer to human agent</label>
                  </div>
                  <div className="border rounded-md p-3 flex items-center gap-2">
                    <input type="checkbox" id="cap-6" />
                    <label htmlFor="cap-6">Send follow-up emails</label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Phone Number & Launch</CardTitle>
              <CardDescription>Select a phone number and activate your agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Phone Number</label>
                <div className="border rounded-md p-3 flex flex-col gap-3">
                  <div className="flex items-center justify-between p-2 border rounded bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <div>
                        <p>+1 (555) 123-4567</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                      </div>
                    </div>
                    <Badge variant="outline">Selected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/10">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <div>
                        <p>+1 (555) 987-6543</p>
                        <p className="text-xs text-muted-foreground">New York, NY</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full gap-2 mt-1">
                    <Phone size={14} />
                    Get a New Number
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Billing Plan</label>
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-muted-foreground" />
                      <div>
                        <p>Pro Plan</p>
                        <p className="text-xs text-muted-foreground">$49/month, includes 1000 minutes</p>
                      </div>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    You have 850 minutes remaining this month
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Card className="bg-muted/20 border-dashed">
                  <CardContent className="pt-6 text-center">
                    <h3 className="font-semibold mb-2">Ready to Launch!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your AI agent is configured and ready to be activated
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button className="gap-2">
                <Sparkles size={16} />
                Launch Agent
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LaunchAIPage;
