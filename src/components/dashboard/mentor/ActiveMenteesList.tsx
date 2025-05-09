
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Mentee {
  id: number;
  name: string;
  title: string;
  company: string;
  sessionsCompleted: number;
  status: string;
  avatar: string;
}

interface ActiveMenteesListProps {
  mentees: Mentee[];
}

const ActiveMenteesList: React.FC<ActiveMenteesListProps> = ({ mentees }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="bg-soft-green/30 rounded-t-lg">
        <CardTitle className="flex items-center text-green-600">
          <Users className="mr-2 h-5 w-5" /> Active Mentees
        </CardTitle>
        <CardDescription>Your current mentorship relationships</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentee</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentees.map(mentee => (
                <TableRow key={mentee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-mentor-primary/10 flex items-center justify-center mr-2">
                        <span>{mentee.avatar}</span>
                      </div>
                      {mentee.name}
                    </div>
                  </TableCell>
                  <TableCell>{mentee.title}</TableCell>
                  <TableCell>{mentee.sessionsCompleted}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mentee.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {mentee.status === 'active' ? 'Active' : 'New'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline">View All Mentees</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveMenteesList;
