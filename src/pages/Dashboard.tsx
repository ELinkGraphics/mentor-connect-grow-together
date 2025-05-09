
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, User, Clock, Bell } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Placeholder data - in a real app this would come from an API
  const upcomingSessions = [
    {
      id: 1,
      mentorName: 'Sarah Johnson',
      date: '2025-05-12T14:00:00',
      duration: 60,
      topic: 'UX Design Principles'
    },
    {
      id: 2,
      mentorName: 'Michael Chen',
      date: '2025-05-15T10:30:00',
      duration: 45,
      topic: 'Software Architecture Review'
    }
  ];
  
  const messages = [
    {
      id: 1,
      from: 'Sarah Johnson',
      preview: 'Looking forward to our session on Monday!',
      timestamp: '2025-05-09T09:23:00',
      unread: true
    },
    {
      id: 2,
      from: 'Michael Chen',
      preview: "I've shared some resources for our next meeting.",
      timestamp: '2025-05-08T16:45:00',
      unread: false
    }
  ];
  
  const recommendations = [
    {
      id: 1,
      name: 'Rachel Kim',
      title: 'Frontend Lead',
      expertise: ['React', 'JavaScript', 'UI Development'],
      match: '95%'
    },
    {
      id: 2,
      name: 'David Wilson',
      title: 'Product Manager',
      expertise: ['Product Strategy', 'Agile', 'User Research'],
      match: '88%'
    }
  ];
  
  const [activeTab, setActiveTab] = useState('overview');

  // Format a date string for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Calculate time until a session
  const getTimeUntil = (dateString: string) => {
    const sessionDate = new Date(dateString);
    const now = new Date();
    const diffMs = sessionDate.getTime() - now.getTime();
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome, John!</h1>
              <p className="text-muted-foreground">Here's what's happening with your mentorship journey</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/find-mentors">Find New Mentors</Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Connected with 3 mentors</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                    <p className="text-xs text-muted-foreground">Next session in {upcomingSessions.length > 0 ? getTimeUntil(upcomingSessions[0].date) : 'N/A'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{messages.filter(m => m.unread).length}</div>
                    <p className="text-xs text-muted-foreground">Last message {messages.length > 0 ? '2 hours ago' : 'N/A'}</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Upcoming Sessions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between border-b border-border pb-4">
                          <div className="flex items-center space-x-4">
                            <div className="bg-soft-purple p-3 rounded-full">
                              <Calendar className="h-5 w-5 text-mentor-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{session.topic}</h4>
                              <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(session.date)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button size="sm">Join Session</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                      <Button variant="outline" className="mt-2">Schedule a Session</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Recommended Mentors */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Mentors for You</CardTitle>
                  <CardDescription>Based on your interests and goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map(mentor => (
                      <div key={mentor.id} className="flex items-center justify-between border-b border-border pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-soft-blue p-2 rounded-full">
                            <User className="h-5 w-5 text-mentee-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{mentor.name}</h4>
                            <p className="text-sm text-muted-foreground">{mentor.title}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {mentor.expertise.map((skill, index) => (
                                <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className="text-sm font-medium text-mentor-primary">{mentor.match} match</span>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Your Mentorship Sessions</CardTitle>
                  <CardDescription>Manage all your upcoming and past sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-4 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-mentor-primary" />
                        Upcoming Sessions
                      </h3>
                      
                      {upcomingSessions.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingSessions.map(session => (
                            <div key={session.id} className="flex items-center justify-between border-b border-border pb-4">
                              <div>
                                <h4 className="font-medium">{session.topic}</h4>
                                <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(session.date)} ({session.duration} mins)</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">Reschedule</Button>
                                <Button size="sm">Join Session</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-4 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-mentor-primary" />
                        Past Sessions
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                          <div>
                            <h4 className="font-medium">Career Growth Strategies</h4>
                            <p className="text-sm text-muted-foreground">with Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">May 2, 2025 at 2:00 PM (60 mins)</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Notes</Button>
                            <Button variant="secondary" size="sm">Leave Feedback</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-b border-border pb-4">
                          <div>
                            <h4 className="font-medium">Code Review Best Practices</h4>
                            <p className="text-sm text-muted-foreground">with Michael Chen</p>
                            <p className="text-sm text-muted-foreground">Apr 25, 2025 at 10:00 AM (45 mins)</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Notes</Button>
                            <Button variant="secondary" size="sm">Leave Feedback</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communicate with your mentors and mentees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div key={message.id} className="flex items-start justify-between border-b border-border pb-4">
                        <div className="flex items-start space-x-4">
                          <div className="bg-soft-peach p-3 rounded-full">
                            <MessageSquare className="h-5 w-5 text-mentor-primary" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">{message.from}</h4>
                              {message.unread && (
                                <span className="ml-2 bg-mentor-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>
                              )}
                            </div>
                            <p className="text-sm">{message.preview}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatDate(message.timestamp)}</p>
                          </div>
                        </div>
                        <Button size="sm">Read</Button>
                      </div>
                    ))}
                    
                    <div className="text-center pt-4">
                      <Button variant="outline">View All Messages</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Recent updates and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 border-b border-border pb-4">
                      <div className="bg-soft-yellow p-3 rounded-full">
                        <Bell className="h-5 w-5 text-mentor-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Session Reminder:</span> Your session with Michael Chen is tomorrow at 10:30 AM.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 border-b border-border pb-4">
                      <div className="bg-soft-green p-3 rounded-full">
                        <Bell className="h-5 w-5 text-mentor-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">New Resource:</span> Sarah Johnson shared a document "UX Design Principles" with you.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 border-b border-border pb-4">
                      <div className="bg-soft-blue p-3 rounded-full">
                        <Bell className="h-5 w-5 text-mentor-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Profile View:</span> Your profile was viewed by David Wilson, Product Manager at InnovateCorp.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday at 2:15 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
