
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

interface Session {
  id: number;
  menteeName: string;
  date: string;
  duration: number;
  topic: string;
}

interface SessionsTabProps {
  upcomingSessions: Session[];
  formatDate: (dateString: string) => string;
}

const SessionsTab: React.FC<SessionsTabProps> = ({ upcomingSessions, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Management</CardTitle>
        <CardDescription>Schedule and manage your mentorship sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-mentor-primary" />
              Upcoming Sessions
            </h3>
            
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <h4 className="font-medium">{session.topic}</h4>
                    <p className="text-sm text-muted-foreground">with {session.menteeName}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(session.date)} ({session.duration} mins)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Notes</Button>
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button size="sm" className="bg-mentor-primary hover:bg-mentor-primary/90">Join Session</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-mentor-primary" />
              Previous Sessions
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h4 className="font-medium">Career Growth Strategies</h4>
                  <p className="text-sm text-muted-foreground">with Emma Johnson</p>
                  <p className="text-sm text-muted-foreground">May 2, 2025 at 2:00 PM (60 mins)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">View Notes</Button>
                  <Button variant="outline" size="sm">Follow Up</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h4 className="font-medium">Design Portfolio Review</h4>
                  <p className="text-sm text-muted-foreground">with John Smith</p>
                  <p className="text-sm text-muted-foreground">Apr 25, 2025 at 10:00 AM (45 mins)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">View Notes</Button>
                  <Button variant="outline" size="sm">Follow Up</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h4 className="font-medium">Leadership Skills Development</h4>
                  <p className="text-sm text-muted-foreground">with Alex Wong</p>
                  <p className="text-sm text-muted-foreground">Apr 18, 2025 at 3:30 PM (60 mins)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">View Notes</Button>
                  <Button variant="outline" size="sm">Follow Up</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Availability Settings</h3>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                You currently have availability set for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center p-3 border rounded-lg bg-background">
                  <div className="mr-3 h-4 w-1 bg-green-500 rounded-full"></div>
                  <span>Mondays: 10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center p-3 border rounded-lg bg-background">
                  <div className="mr-3 h-4 w-1 bg-green-500 rounded-full"></div>
                  <span>Wednesdays: 1:00 PM - 4:00 PM</span>
                </div>
                <div className="flex items-center p-3 border rounded-lg bg-background">
                  <div className="mr-3 h-4 w-1 bg-green-500 rounded-full"></div>
                  <span>Fridays: 9:00 AM - 11:00 AM</span>
                </div>
              </div>
              <Button>Update Availability</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionsTab;
