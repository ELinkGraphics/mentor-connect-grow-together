
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface Session {
  id: string;
  title: string;
  description?: string | null;
  scheduled_at: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  mentee?: {
    id: string;
    username: string;
    first_name?: string;
    last_name?: string;
  };
  mentee_id: string;
}

interface SessionsTabProps {
  upcomingSessions: Session[];
  allSessions: Session[];
  formatDate: (dateString: string) => string;
  createSession: (sessionData: any) => Promise<any>;
  updateSession: (sessionId: string, updates: any) => Promise<boolean>;
  loading?: boolean;
}

const SessionsTab: React.FC<SessionsTabProps> = ({ 
  upcomingSessions, 
  allSessions, 
  formatDate, 
  createSession,
  updateSession,
  loading = false 
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    mentee_id: '',
    scheduled_at: '',
    duration: 60,
    status: 'scheduled'
  });

  // Find previous sessions (completed or cancelled)
  const previousSessions = allSessions.filter(
    session => session.status === 'completed' || session.status === 'cancelled'
  ).sort((a, b) => 
    new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
  );

  // Helper function to get mentee display name
  const getMenteeName = (mentee?: { first_name?: string; last_name?: string; username: string }) => {
    if (!mentee) return 'Unknown Mentee';
    
    if (mentee.first_name && mentee.last_name) {
      return `${mentee.first_name} ${mentee.last_name}`;
    }
    
    return mentee.username;
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the date correctly for the database
    const scheduledDate = new Date(newSession.scheduled_at);
    
    const result = await createSession({
      ...newSession,
      scheduled_at: scheduledDate.toISOString()
    });
    
    if (result.success) {
      setDialogOpen(false);
      // Reset form
      setNewSession({
        title: '',
        description: '',
        mentee_id: '',
        scheduled_at: '',
        duration: 60,
        status: 'scheduled'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Management</CardTitle>
        <CardDescription>Schedule and manage your mentorship sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-mentor-primary" />
              Upcoming Sessions
            </h3>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-mentor-primary hover:bg-mentor-primary/90">
                  <Plus className="mr-2 h-4 w-4" /> New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Session</DialogTitle>
                  <DialogDescription>
                    Create a new mentorship session with a mentee.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateSession} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Session Title</Label>
                    <Input 
                      id="title" 
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      placeholder="E.g., Career Growth Strategy" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      value={newSession.description}
                      onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                      placeholder="Session details..." 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mentee_id">Mentee</Label>
                    <Input 
                      id="mentee_id" 
                      value={newSession.mentee_id}
                      onChange={(e) => setNewSession({...newSession, mentee_id: e.target.value})}
                      placeholder="Mentee ID" 
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the mentee's ID. You can find this in their profile.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date & Time</Label>
                      <Input 
                        id="date" 
                        type="datetime-local" 
                        value={newSession.scheduled_at}
                        onChange={(e) => setNewSession({...newSession, scheduled_at: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Select
                        value={newSession.duration.toString()}
                        onValueChange={(value) => setNewSession({...newSession, duration: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-mentor-primary hover:bg-mentor-primary/90">
                      Schedule Session
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <Skeleton className="h-5 w-40 mb-1" />
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </div>
                ))}
              </>
            ) : upcomingSessions.length > 0 ? (
              upcomingSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <p className="text-sm text-muted-foreground">with {getMenteeName(session.mentee)}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(session.scheduled_at)} ({session.duration} mins)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Notes</Button>
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button size="sm" className="bg-mentor-primary hover:bg-mentor-primary/90">Join Session</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-muted/20 rounded-lg">
                <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                <Button variant="outline" className="mt-4">Update Availability</Button>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-mentor-primary" />
              Previous Sessions
            </h3>
            
            <div className="space-y-4">
              {loading ? (
                <>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  ))}
                </>
              ) : previousSessions.length > 0 ? (
                previousSessions.slice(0, 3).map(session => (
                  <div key={session.id} className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">with {getMenteeName(session.mentee)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(session.scheduled_at)} ({session.duration} mins)
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {session.status === 'completed' ? 'Completed' : 'Cancelled'}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">View Notes</Button>
                      <Button variant="outline" size="sm">Follow Up</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">No previous sessions found</p>
                </div>
              )}
              
              {previousSessions.length > 3 && (
                <div className="flex justify-center mt-4">
                  <Button variant="outline">View All Sessions</Button>
                </div>
              )}
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
