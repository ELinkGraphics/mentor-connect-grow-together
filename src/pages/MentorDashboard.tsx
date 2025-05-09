
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar, MessageSquare, Users, Clock, Bell, 
  UserCheck, Award, FileText, BarChart3, User 
} from 'lucide-react';

const MentorDashboard: React.FC = () => {
  // Placeholder data - in a real app this would come from an API
  const upcomingSessions = [
    {
      id: 1,
      menteeName: 'John Smith',
      date: '2025-05-12T14:00:00',
      duration: 60,
      topic: 'UX Design Principles'
    },
    {
      id: 2,
      menteeName: 'Emma Johnson',
      date: '2025-05-15T10:30:00',
      duration: 45,
      topic: 'Software Architecture Review'
    },
    {
      id: 3,
      menteeName: 'Alex Wong',
      date: '2025-05-18T15:00:00',
      duration: 30,
      topic: 'Career Growth Planning'
    }
  ];
  
  const messages = [
    {
      id: 1,
      from: 'John Smith',
      preview: 'I have a question about tomorrow\'s session.',
      timestamp: '2025-05-09T09:23:00',
      unread: true
    },
    {
      id: 2,
      from: 'Emma Johnson',
      preview: "Thanks for the resources you shared!",
      timestamp: '2025-05-08T16:45:00',
      unread: true
    },
    {
      id: 3,
      from: 'Alex Wong',
      preview: "Looking forward to our next meeting.",
      timestamp: '2025-05-07T11:20:00',
      unread: false
    }
  ];
  
  const mentees = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Frontend Developer',
      company: 'TechCorp',
      sessionsCompleted: 5,
      status: 'active',
      avatar: '👨‍💻'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      title: 'UX Designer',
      company: 'DesignLab',
      sessionsCompleted: 3,
      status: 'active',
      avatar: '👩‍🎨'
    },
    {
      id: 3,
      name: 'Alex Wong',
      title: 'Product Manager',
      company: 'InnovateCo',
      sessionsCompleted: 1,
      status: 'new',
      avatar: '📊'
    }
  ];
  
  const mentorStats = {
    totalMentees: 12,
    activeMentees: 8,
    totalSessions: 47,
    completedHours: 58.5,
    averageRating: 4.8,
    topSkills: ['Leadership', 'UX Design', 'System Architecture', 'Career Planning']
  };
  
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
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
                <span className="ml-3 px-3 py-1 text-xs font-medium bg-mentor-primary text-white rounded-full">Mentor</span>
              </div>
              <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" className="border-mentor-primary text-mentor-primary hover:bg-mentor-primary hover:text-white">
                <Clock className="mr-2 h-4 w-4" /> Availability Settings
              </Button>
              <Button className="bg-mentor-primary hover:bg-mentor-primary/90">
                <Calendar className="mr-2 h-4 w-4" /> Manage Sessions
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <TabsList className="grid grid-cols-5 w-full gap-4">
                <TabsTrigger value="overview" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <BarChart3 className="mr-2 h-4 w-4" /> Overview
                </TabsTrigger>
                <TabsTrigger value="sessions" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <Calendar className="mr-2 h-4 w-4" /> Sessions
                </TabsTrigger>
                <TabsTrigger value="mentees" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <Users className="mr-2 h-4 w-4" /> Mentees
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <MessageSquare className="mr-2 h-4 w-4" /> Messages
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-mentor-primary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Mentees</CardTitle>
                    <Users className="h-4 w-4 text-mentor-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorStats.activeMentees}</div>
                    <p className="text-xs text-muted-foreground">Out of {mentorStats.totalMentees} total mentees</p>
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
                    <p className="text-xs text-muted-foreground">From {messages.filter(m => m.unread).length} different mentees</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-mentee-secondary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Mentor Rating</CardTitle>
                    <Award className="h-4 w-4 text-mentee-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorStats.averageRating} <span className="text-base">/ 5</span></div>
                    <p className="text-xs text-muted-foreground">Based on {mentorStats.totalSessions} sessions</p>
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
                    <CardDescription>Your scheduled mentorship sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingSessions.map(session => (
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
                
                {/* Mentor Stats */}
                <Card>
                  <CardHeader className="bg-soft-blue/30 rounded-t-lg">
                    <CardTitle className="flex items-center text-mentee-primary">
                      <BarChart3 className="mr-2 h-5 w-5" /> Mentorship Stats
                    </CardTitle>
                    <CardDescription>Your impact as a mentor</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 border-b">
                        <span className="text-sm">Total Sessions</span>
                        <span className="font-medium">{mentorStats.totalSessions}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span className="text-sm">Hours Mentored</span>
                        <span className="font-medium">{mentorStats.completedHours}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span className="text-sm">Average Duration</span>
                        <span className="font-medium">50 min</span>
                      </div>
                      <div className="flex justify-between items-center p-2">
                        <span className="text-sm">Completion Rate</span>
                        <span className="font-medium">97%</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Top Areas of Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {mentorStats.topSkills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-mentor-primary/10 text-mentor-primary rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Mentee Quick View & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                
                <Card>
                  <CardHeader className="bg-soft-peach/30 rounded-t-lg">
                    <CardTitle className="flex items-center text-orange-600">
                      <FileText className="mr-2 h-5 w-5" /> Mentor Toolkit
                    </CardTitle>
                    <CardDescription>Resources for mentors</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                        <FileText className="h-5 w-5 mr-3 text-mentor-primary" />
                        <div>
                          <p className="text-sm font-medium">Session Templates</p>
                          <p className="text-xs text-muted-foreground">Frameworks for effective meetings</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                        <Users className="h-5 w-5 mr-3 text-mentor-secondary" />
                        <div>
                          <p className="text-sm font-medium">Mentorship Best Practices</p>
                          <p className="text-xs text-muted-foreground">Tips for impactful guidance</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                        <Award className="h-5 w-5 mr-3 text-mentee-primary" />
                        <div>
                          <p className="text-sm font-medium">Growth Assessment</p>
                          <p className="text-xs text-muted-foreground">Tools to measure mentee progress</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full bg-mentor-primary hover:bg-mentor-primary/90">
                          Access Resource Library
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="sessions">
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
            </TabsContent>
            
            <TabsContent value="mentees">
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
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communicate with your mentees</CardDescription>
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
                        <Button size="sm">Reply</Button>
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
                          <span className="font-medium">Session Reminder:</span> Your session with John Smith is tomorrow at 10:30 AM.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 border-b border-border pb-4">
                      <div className="bg-soft-purple p-3 rounded-full">
                        <Bell className="h-5 w-5 text-mentor-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">New Mentee Request:</span> Alex Wong has requested you as a mentor.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 border-b border-border pb-4">
                      <div className="bg-soft-green p-3 rounded-full">
                        <Bell className="h-5 w-5 text-mentor-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">New Feedback:</span> Emma Johnson left a 5-star review for your last session.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday at 2:15 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Mentor Profile</CardTitle>
                  <CardDescription>Manage how you appear to potential mentees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-mentor-primary to-mentor-secondary flex items-center justify-center text-white text-4xl">
                        SJ
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Dr. Sarah Johnson</h3>
                        <p className="text-lg">Chief UX Officer at DesignHub</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mentorStats.topSkills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-mentor-primary/10 text-mentor-primary rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" className="mr-2">Edit Profile</Button>
                          <Button>Preview Public View</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Visibility</h3>
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Open to New Mentees</p>
                            <p className="text-sm text-muted-foreground">Your profile will appear in search results</p>
                          </div>
                          <Button variant="outline">Currently ON</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Featured Mentor Status</p>
                            <p className="text-sm text-muted-foreground">Eligible based on your excellent ratings</p>
                          </div>
                          <Button variant="outline">Apply</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Mentor Settings</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">Maximum Active Mentees</p>
                            <p className="text-sm text-muted-foreground">Current limit: 10</p>
                          </div>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                        <div className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">Session Preferences</p>
                            <p className="text-sm text-muted-foreground">Video preferred, 45-60 minutes</p>
                          </div>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                        <div className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">Calendar Integration</p>
                            <p className="text-sm text-muted-foreground">Google Calendar connected</p>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Notification Preferences</p>
                            <p className="text-sm text-muted-foreground">Email and mobile alerts enabled</p>
                          </div>
                          <Button variant="outline" size="sm">Update</Button>
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

export default MentorDashboard;
