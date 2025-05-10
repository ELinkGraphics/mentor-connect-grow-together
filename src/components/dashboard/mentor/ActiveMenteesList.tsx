
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface Mentee {
  id: string;
  username: string;
  title?: string;
  company?: string;
  sessions_completed?: number;
  status: string;
  avatar_url: string | null;
  first_name?: string;
  last_name?: string;
}

interface ActiveMenteesListProps {
  mentees: Mentee[];
  loading?: boolean;
}

const ActiveMenteesList: React.FC<ActiveMenteesListProps> = ({ mentees, loading = false }) => {
  // Helper function to get mentee display name
  const getMenteeName = (mentee: Mentee) => {
    if (mentee.first_name && mentee.last_name) {
      return `${mentee.first_name} ${mentee.last_name}`;
    }
    
    return mentee.username;
  };

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
          {loading ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="py-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-9 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                          {mentee.avatar_url ? (
                            <img 
                              src={mentee.avatar_url} 
                              alt={getMenteeName(mentee)}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <span>👤</span>
                          )}
                        </div>
                        {getMenteeName(mentee)}
                      </div>
                    </TableCell>
                    <TableCell>{mentee.title || 'Mentee'}</TableCell>
                    <TableCell>{mentee.sessions_completed || 0}</TableCell>
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
                {mentees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      <p className="text-muted-foreground">No active mentees found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline">View All Mentees</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveMenteesList;
