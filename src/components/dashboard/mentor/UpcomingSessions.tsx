
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, UserCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Session {
  id: string;
  title: string;
  scheduled_at: string;
  duration: number;
  mentee?: {
    id: string;
    username: string;
    first_name?: string;
    last_name?: string;
  };
}

interface UpcomingSessionsProps {
  sessions: Session[];
  formatDate: (dateString: string) => string;
  loading?: boolean;
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions, formatDate, loading = false }) => {
  // Helper function to get mentee display name
  const getMenteeName = (mentee?: { first_name?: string; last_name?: string; username: string }) => {
    if (!mentee) return 'Unknown Mentee';
    
    if (mentee.first_name && mentee.last_name) {
      return `${mentee.first_name} ${mentee.last_name}`;
    }
    
    return mentee.username;
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader className="bg-soft-purple/30 rounded-t-lg">
        <CardTitle className="flex items-center text-mentor-primary">
          <Calendar className="mr-2 h-5 w-5" /> Upcoming Sessions
        </CardTitle>
        <CardDescription>Your scheduled mentorship sessions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-mentor-primary to-mentor-secondary text-white p-3 rounded-full">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <p className="text-sm text-muted-foreground">with {getMenteeName(session.mentee)}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(session.scheduled_at)} ({session.duration} mins)</p>
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
