import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, MessageSquare, User, Clock, Bell, 
  Book, CheckCircle, Award, FileText, BarChart3, 
  PieChart 
} from 'lucide-react';

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
      match: '95%',
      avatar: '💻'
    },
    {
      id: 2,
      name: 'David Wilson',
      title: 'Product Manager',
      expertise: ['Product Strategy', 'Agile', 'User Research'],
      match: '88%',
      avatar: '📊'
    }
  ];

  const skillProgress = [
    { skill: 'React', progress: 75 },
    { skill: 'UI/UX', progress: 60 },
    { skill: 'JavaScript', progress: 85 },
    { skill: 'Product Management', progress: 45 }
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-50">
      <Navbar />
      
      <main className="flex-grow py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Welcome, John!</h1>
              <p className="text-muted-foreground">Here's your mentorship journey at a glance</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" className="border-mentor-primary text-mentor-primary hover:bg-mentor-primary hover:text-white">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Session
              </Button>
              <Button asChild className="bg-mentor-primary hover:bg-mentor-primary/90">
                <Link to="/find-mentors">Find New Mentors</Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <TabsList className="grid grid-cols-4 w-full gap-4">
                <TabsTrigger value="overview" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <PieChart className="mr-2 h-4 w-4" /> Overview
                </TabsTrigger>
                <TabsTrigger value="sessions" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <Calendar className="mr-2 h-4 w-4" /> Sessions
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <MessageSquare className="mr-2 h-4 w-4" /> Messages
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <Award className="mr-2 h-4 w-4" /> Skills
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-mentor-primary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
                    <User className="h-4 w-4 text-mentor-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Connected with 3 mentors</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-mentor-secondary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                    <Calendar className="h-4 w-4 text-mentor-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                    <p className="text-xs text-muted-foreground">Next session in {upcomingSessions.length > 0 ? getTimeUntil(upcomingSessions[0].date) : 'N/A'}</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-mentee-primary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-mentee-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{messages.filter(m => m.unread).length}</div>
                    <p className="text-xs text-muted-foreground">Last message {messages.length > 0 ? '2 hours ago' : 'N/A'}</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-mentee-secondary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Skills Improving</CardTitle>
                    <Award className="h-4 w-4 text-mentee-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{skillProgress.length}</div>
                    <p className="text-xs text-muted-foreground">Making progress in {skillProgress.length} areas</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Upcoming Sessions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="bg-soft-purple/30 rounded-t-lg">
                    <CardTitle className="flex items-center text-mentor-primary">
                      <Calendar className="mr-2 h-5 w-5" /> Upcoming Sessions
                    </CardTitle>
                    <CardDescription>Your next mentorship sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingSessions.map(session => (
                          <div key={session.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                            <div className="flex items-center space-x-4">
                              <div className="bg-gradient-to-br from-mentor-primary to-mentor-secondary text-white p-3 rounded-full">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{session.topic}</h4>
                                <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(session.date)}</p>
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
                        <Button variant="outline" className="mt-4">Schedule a Session</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recommended Mentors */}
                <Card>
                  <CardHeader className="bg-soft-blue/30 rounded-t-lg">
                    <CardTitle className="flex items-center text-mentee-primary">
                      <User className="mr-2 h-5 w-5" /> Recommended Mentors
                    </CardTitle>
                    <CardDescription>Based on your interests</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {recommendations.map(mentor => (
                        <div key={mentor.id} className="flex items-center space-x-4 border-b border-border pb-4 last:border-0">
                          <div className="flex items-center justify-center w-12 h-12 text-lg bg-gradient-to-br from-mentee-primary to-mentee-secondary text-white rounded-full">
                            {mentor.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{mentor.name}</h4>
                              <span className="text-xs bg-mentor-primary/10 text-mentor-primary px-2 py-0.5 rounded-full">
                                {mentor.match} match
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{mentor.title}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {mentor.expertise.slice(0, 2).map((skill, index) => (
                                <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                              {mentor.expertise.length > 2 && (
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  +{mentor.expertise.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button className="bg-mentee-primary hover:bg-mentee-primary/90 w-full">
                        View All Recommendations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Progress & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="bg-soft-green/30 rounded-t-lg">
                    <CardTitle className="flex items-center text-green-600">
                      <BarChart3 className="mr-2 h-5 w-5" /> Your Skill Progress
                    </CardTitle>
                    <CardDescription>Track your growth over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {skillProgress.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.skill}</span>
                            <span className="text-sm text-muted-foreground">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{
                                width: `${item.progress}%`,
                                background: index % 2 === 0 ? 
                                  'linear-gradient(to right, var(--mentor-primary), var(--mentor-secondary))' : 
                                  'linear-gradient(to right, var(--mentee-primary), var(--mentee-secondary))'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="bg-soft-peach/30 rounded-t-lg">
                    <CardTitle className="flex items-center text-orange-600">
                      <FileText className="mr-2 h-5 w-5" /> Quick Resources
                    </CardTitle>
                    <CardDescription>Helpful tools & guides</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                        <Book className="h-5 w-5 mr-3 text-mentor-primary" />
                        <div>
                          <p className="text-sm font-medium">Mentorship Guide</p>
                          <p className="text-xs text-muted-foreground">How to get the most from your sessions</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                        <CheckCircle className="h-5 w-5 mr-3 text-mentor-secondary" />
                        <div>
                          <p className="text-sm font-medium">Goal Setting Template</p>
                          <p className="text-xs text-muted-foreground">Define clear career objectives</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                        <FileText className="h-5 w-5 mr-3 text-mentee-primary" />
                        <div>
                          <p className="text-sm font-medium">Session Preparation</p>
                          <p className="text-xs text-muted-foreground">Checklist for productive meetings</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Development</CardTitle>
                  <CardDescription>Track your professional growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium text-lg mb-4 flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-mentor-primary" />
                        Skills in Progress
                      </h3>
                      
                      <div className="space-y-6">
                        {skillProgress.map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-2">
                              <div>
                                <h4 className="font-medium">{item.skill}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {item.progress < 30 ? 'Beginner' : 
                                   item.progress < 60 ? 'Intermediate' : 
                                   item.progress < 85 ? 'Advanced' : 'Expert'}
                                </p>
                              </div>
                              <span className="text-sm bg-mentor-primary/10 text-mentor-primary px-2 py-0.5 rounded-full h-fit">
                                {item.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{
                                  width: `${item.progress}%`,
                                  background: index % 2 === 0 ? 
                                    'linear-gradient(to right, #8B5CF6, #7E69AB)' : 
                                    'linear-gradient(to right, #0EA5E9, #38BDF8)'
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-4 flex items-center">
                        <Award className="mr-2 h-5 w-5 text-mentor-primary" />
                        Recommended Skill Development
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 hover:bg-muted/10 cursor-pointer transition-colors">
                          <h4 className="font-medium">Leadership Skills</h4>
                          <p className="text-sm text-muted-foreground mb-2">Recommended based on your career goals</p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-muted/10 cursor-pointer transition-colors">
                          <h4 className="font-medium">System Design</h4>
                          <p className="text-sm text-muted-foreground mb-2">Suggested by your mentor Sarah</p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-muted/10 cursor-pointer transition-colors">
                          <h4 className="font-medium">Public Speaking</h4>
                          <p className="text-sm text-muted-foreground mb-2">Important for your career growth</p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-muted/10 cursor-pointer transition-colors">
                          <h4 className="font-medium">Data Analysis</h4>
                          <p className="text-sm text-muted-foreground mb-2">Trending in your industry</p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </div>
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
