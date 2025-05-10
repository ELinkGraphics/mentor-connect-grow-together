
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface Mentee {
  id: string;
  username: string;
  avatar_url: string | null;
  first_name?: string;
  last_name?: string;
  title?: string;
  company?: string;
  sessions_completed?: number;
  status: 'active' | 'pending' | 'completed';
}

interface MenteesTabProps {
  mentees: Mentee[];
  mentorStats: {
    totalMentees: number;
    activeMentees: number;
  };
  updateMentorshipStatus: (menteeId: string, status: 'active' | 'pending' | 'completed') => Promise<boolean>;
  loading?: boolean;
}

const MenteesTab: React.FC<MenteesTabProps> = ({ 
  mentees, 
  mentorStats,
  updateMentorshipStatus,
  loading = false
}) => {
  // Helper function to get mentee display name
  const getMenteeName = (mentee: Mentee) => {
    if (mentee.first_name && mentee.last_name) {
      return `${mentee.first_name} ${mentee.last_name}`;
    }
    
    return mentee.username;
  };

  const activeMentees = mentees.filter(m => m.status === 'active');
  const pendingMentees = mentees.filter(m => m.status === 'pending');
  const completedMentees = mentees.filter(m => m.status === 'completed');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Mentees</CardTitle>
        <CardDescription>Manage your mentorship relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">All Mentees ({mentorStats.totalMentees})</h3>
              <p className="text-sm text-muted-foreground">{mentorStats.activeMentees} active mentees</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button className="bg-mentor-primary hover:bg-mentor-primary/90" size="sm">Add Mentee</Button>
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeMentees.concat(pendingMentees).map(mentee => (
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
                    <TableCell>{mentee.company || 'N/A'}</TableCell>
                    <TableCell>{mentee.sessions_completed || 0}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        mentee.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {mentee.status === 'active' ? 'Active' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm">Message</Button>
                        <Button variant="outline" size="sm">Schedule</Button>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            // If pending, make active; if active, complete
                            const newStatus = mentee.status === 'pending' ? 'active' : 'completed';
                            updateMentorshipStatus(mentee.id, newStatus);
                          }}
                        >
                          {mentee.status === 'pending' ? 'Approve' : 'View'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {mentees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No mentees found</p>
                      <Button className="mt-4">Add Your First Mentee</Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          
          {/* Past Mentees Section */}
          {completedMentees.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">Past Mentees</h3>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {completedMentees.map(mentee => (
                    <div key={mentee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          {mentee.avatar_url ? (
                            <img 
                              src={mentee.avatar_url} 
                              alt={getMenteeName(mentee)}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <span>👤</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{getMenteeName(mentee)}</h4>
                          <p className="text-sm text-muted-foreground">
                            {mentee.title || 'Mentee'} {mentee.company ? `at ${mentee.company}` : ''}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">
                          {mentee.sessions_completed || 0} sessions completed
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMentorshipStatus(mentee.id, 'active')}
                        >
                          Reconnect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenteesTab;
