
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/mentor/DashboardHeader';
import DashboardTabs from '@/components/dashboard/mentor/DashboardTabs';
import MentorStats from '@/components/dashboard/mentor/MentorStats';
import UpcomingSessions from '@/components/dashboard/mentor/UpcomingSessions';
import MentorshipStats from '@/components/dashboard/mentor/MentorshipStats';
import ActiveMenteesList from '@/components/dashboard/mentor/ActiveMenteesList';
import MentorToolkit from '@/components/dashboard/mentor/MentorToolkit';
import SessionsTab from '@/components/dashboard/mentor/SessionsTab';
import MenteesTab from '@/components/dashboard/mentor/MenteesTab';
import MessagesTab from '@/components/dashboard/mentor/MessagesTab';
import ProfileTab from '@/components/dashboard/mentor/ProfileTab';

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

  const unreadMessagesCount = messages.filter(m => m.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-50">
      <Navbar />
      
      <main className="flex-grow py-20 pt-32">
        <div className="container mx-auto px-4">
          <DashboardHeader />
          
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab}>
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <MentorStats 
                activeMentees={mentorStats.activeMentees}
                totalMentees={mentorStats.totalMentees}
                upcomingSessions={upcomingSessions}
                unreadMessages={unreadMessagesCount}
                averageRating={mentorStats.averageRating}
                totalSessions={mentorStats.totalSessions}
                getTimeUntil={getTimeUntil}
              />
              
              {/* Upcoming Sessions & Mentorship Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UpcomingSessions sessions={upcomingSessions} formatDate={formatDate} />
                <MentorshipStats stats={mentorStats} />
              </div>
              
              {/* Active Mentees & Mentor Toolkit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActiveMenteesList mentees={mentees} />
                <MentorToolkit />
              </div>
            </TabsContent>
            
            <TabsContent value="sessions">
              <SessionsTab upcomingSessions={upcomingSessions} formatDate={formatDate} />
            </TabsContent>
            
            <TabsContent value="mentees">
              <MenteesTab mentees={mentees} mentorStats={mentorStats} />
            </TabsContent>
            
            <TabsContent value="messages">
              <MessagesTab messages={messages} formatDate={formatDate} />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileTab mentorStats={mentorStats} />
            </TabsContent>
          </DashboardTabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentorDashboard;
