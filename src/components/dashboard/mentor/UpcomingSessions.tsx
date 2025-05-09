
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, UserCheck } from 'lucide-react';

interface Session {
  id: number;
  menteeName: string;
  date: string;
  duration: number;
  topic: string;
}

interface UpcomingSessionsProps {
  sessions: Session[];
  formatDate: (dateString: string) => string;
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions, formatDate }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="bg-soft-purple/30 rounded-t-lg">
        <CardTitle className="flex items-center text-mentor-primary">
          <Calendar className="mr-2 h-5 w-5" /> Upcoming Sessions
        </CardTitle>
        <CardDescription>Your scheduled mentorship sessions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-mentor-primary to-mentor-secondary text-white p-3 rounded-full">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{session.topic}</h4>
                    <p className="text-sm text-muted-foreground">with {session.menteeName}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(session.date)} ({session.duration} mins)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm" className="bg-mentor-primary hover:bg-mentor-primary/90">Join Session</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No upcoming sessions scheduled</p>
            <Button variant="outline" className="mt-4">Update Availability</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
