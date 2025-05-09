
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface MenteesTabProps {
  mentees: Mentee[];
  mentorStats: {
    totalMentees: number;
    activeMentees: number;
  };
}

const MenteesTab: React.FC<MenteesTabProps> = ({ mentees, mentorStats }) => {
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
                  <TableCell>{mentee.company}</TableCell>
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
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">Message</Button>
                      <Button variant="outline" size="sm">Schedule</Button>
                      <Button size="sm">View</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Past Mentees Section */}
          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Past Mentees</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <span>👨‍💻</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Robert Brown</h4>
                    <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">8 sessions completed</span>
                  <Button variant="outline" size="sm">Reconnect</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <span>👩‍💼</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Lisa Chen</h4>
                    <p className="text-sm text-muted-foreground">Product Manager at Tesla</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">12 sessions completed</span>
                  <Button variant="outline" size="sm">Reconnect</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenteesTab;
