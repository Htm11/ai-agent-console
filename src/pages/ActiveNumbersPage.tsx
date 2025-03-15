
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Phone, Plus, Trash } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

interface PhoneNumber {
  id: string;
  number: string;
  location: string;
  assignedTo: string | null;
  status: 'active' | 'inactive';
  calls: number;
  type: 'local' | 'toll-free';
}

const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    assignedTo: 'Sales Assistant',
    status: 'active',
    calls: 78,
    type: 'local'
  },
  {
    id: '2',
    number: '+1 (888) 987-6543',
    location: 'New York, NY',
    assignedTo: 'Support Agent',
    status: 'active',
    calls: 145,
    type: 'toll-free'
  },
  {
    id: '3',
    number: '+1 (555) 789-0123',
    location: 'Chicago, IL',
    assignedTo: 'Appointment Scheduler',
    status: 'active',
    calls: 42,
    type: 'local'
  },
  {
    id: '4',
    number: '+1 (800) 555-1212',
    location: 'Austin, TX',
    assignedTo: null,
    status: 'inactive',
    calls: 0,
    type: 'toll-free'
  },
  {
    id: '5',
    number: '+1 (555) 432-1098',
    location: 'Seattle, WA',
    assignedTo: null,
    status: 'inactive',
    calls: 0,
    type: 'local'
  }
];

const getStatusColor = (status: PhoneNumber['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type: PhoneNumber['type']) => {
  switch (type) {
    case 'local':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'toll-free':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ActiveNumbersPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Active Numbers</h1>
            <p className="text-muted-foreground">Manage phone numbers for your AI voice agents</p>
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            Add Number
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Numbers Overview</CardTitle>
            <CardDescription>You have {mockPhoneNumbers.filter(n => n.status === 'active').length} active phone numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total Numbers</p>
                <p className="text-2xl font-semibold">{mockPhoneNumbers.length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-semibold">{mockPhoneNumbers.filter(n => n.status === 'active').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Assigned</p>
                <p className="text-2xl font-semibold">{mockPhoneNumbers.filter(n => n.assignedTo).length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-semibold">{mockPhoneNumbers.filter(n => !n.assignedTo && n.status === 'inactive').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Numbers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Calls</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPhoneNumbers.map((phoneNumber) => (
                  <TableRow key={phoneNumber.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <Phone className="h-3.5 w-3.5 text-primary/70" />
                        </div>
                        <span>{phoneNumber.number}</span>
                      </div>
                    </TableCell>
                    <TableCell>{phoneNumber.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(phoneNumber.type)}>
                        {phoneNumber.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(phoneNumber.status)}>
                        {phoneNumber.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{phoneNumber.assignedTo || '-'}</TableCell>
                    <TableCell>{phoneNumber.calls}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Calls</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPhoneNumbers.filter(n => n.status === 'active').map((phoneNumber) => (
                  <TableRow key={phoneNumber.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <Phone className="h-3.5 w-3.5 text-primary/70" />
                        </div>
                        <span>{phoneNumber.number}</span>
                      </div>
                    </TableCell>
                    <TableCell>{phoneNumber.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(phoneNumber.type)}>
                        {phoneNumber.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{phoneNumber.assignedTo || '-'}</TableCell>
                    <TableCell>{phoneNumber.calls}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPhoneNumbers.filter(n => n.status === 'inactive').map((phoneNumber) => (
                  <TableRow key={phoneNumber.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <Phone className="h-3.5 w-3.5 text-primary/70" />
                        </div>
                        <span>{phoneNumber.number}</span>
                      </div>
                    </TableCell>
                    <TableCell>{phoneNumber.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(phoneNumber.type)}>
                        {phoneNumber.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ActiveNumbersPage;
