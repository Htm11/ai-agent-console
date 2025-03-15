
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, UserPlus, Filter, Phone, Mail, User, MoreHorizontal,
  Building, Calendar, ArrowUpDown, Tag 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'lead' | 'customer' | 'prospect';
  tags: string[];
  lastContacted: Date | null;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc',
    status: 'customer',
    tags: ['tech', 'enterprise'],
    lastContacted: new Date('2023-06-10')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'XYZ Corp',
    status: 'lead',
    tags: ['retail'],
    lastContacted: new Date('2023-06-15')
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 567-8901',
    company: 'ABC LLC',
    status: 'prospect',
    tags: ['healthcare', 'enterprise'],
    lastContacted: new Date('2023-06-05')
  },
  {
    id: '4',
    name: 'Emily Williams',
    email: 'emily.williams@example.com',
    phone: '+1 (555) 234-5678',
    company: 'Global Services',
    status: 'customer',
    tags: ['finance'],
    lastContacted: new Date('2023-06-12')
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 (555) 876-5432',
    company: 'Tech Solutions',
    status: 'lead',
    tags: ['tech', 'startup'],
    lastContacted: null
  },
  {
    id: '6',
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    phone: '+1 (555) 345-6789',
    company: 'Retail Group',
    status: 'prospect',
    tags: ['retail'],
    lastContacted: new Date('2023-06-08')
  }
];

const getStatusColor = (status: Contact['status']) => {
  switch (status) {
    case 'customer':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'lead':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'prospect':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTagColor = (tag: string) => {
  switch (tag) {
    case 'tech':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'retail':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'healthcare':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'finance':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'enterprise':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'startup':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-muted-foreground">Manage your contacts and customers</p>
          </div>
          <Button className="gap-2">
            <UserPlus size={16} />
            Add Contact
          </Button>
        </div>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>Contact Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-semibold">{mockContacts.length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Customers</p>
                <p className="text-2xl font-semibold">{mockContacts.filter(c => c.status === 'customer').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Leads</p>
                <p className="text-2xl font-semibold">{mockContacts.filter(c => c.status === 'lead').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Prospects</p>
                <p className="text-2xl font-semibold">{mockContacts.filter(c => c.status === 'prospect').length}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Companies</p>
                <p className="text-2xl font-semibold">{new Set(mockContacts.map(c => c.company)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Filter size={14} />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <ArrowUpDown size={14} />
              <span>Sort</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <span>Status</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Customers</DropdownMenuItem>
                <DropdownMenuItem>Leads</DropdownMenuItem>
                <DropdownMenuItem>Prospects</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Information</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Last Contacted</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <User className="h-3.5 w-3.5 text-primary/70" />
                      </div>
                      <span className="font-medium">{contact.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{contact.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {contact.lastContacted ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.lastContacted.toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem>Call Contact</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
