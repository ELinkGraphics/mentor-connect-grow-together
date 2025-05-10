
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
import { useSessions } from '@/hooks/use-sessions';
import { useMentorships } from '@/hooks/use-mentorships';
import { useMessages } from '@/hooks/use-messages';
import { useMentorStats } from '@/hooks/use-mentor-stats';

const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Use real-time data from Supabase
  const { sessions, loading: sessionsLoading, createSession, updateSession } = useSessions();
  const { mentees, loading: menteesLoading, updateMentorshipStatus } = useMentorships();
  const { messages, unreadCount, loading: messagesLoading, markAsRead, sendMessage } = useMessages();
  const { stats, loading: statsLoading } = useMentorStats();

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

  // Get upcoming sessions (scheduled sessions in the future)
  const upcomingSessions = sessions
    .filter(session => 
      session.status === 'scheduled' && 
      new Date(session.scheduled_at) > new Date()
    )
    .sort((a, b) => 
      new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
    );

  const isLoading = sessionsLoading || menteesLoading || messagesLoading || statsLoading;

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
                activeMentees={stats.activeMentees}
                totalMentees={stats.totalMentees}
                upcomingSessions={upcomingSessions}
                unreadMessages={unreadCount}
                averageRating={stats.averageRating}
                totalSessions={stats.totalSessions}
                getTimeUntil={getTimeUntil}
                loading={isLoading}
              />
              
              {/* Upcoming Sessions & Mentorship Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UpcomingSessions 
                  sessions={upcomingSessions} 
                  formatDate={formatDate}
                  loading={isLoading}
                />
                <MentorshipStats 
                  stats={stats}
                  loading={isLoading} 
                />
              </div>
              
              {/* Active Mentees & Mentor Toolkit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActiveMenteesList 
                  mentees={mentees.filter(m => m.status === 'active')}
                  loading={isLoading}
                />
                <MentorToolkit />
              </div>
            </TabsContent>
            
            <TabsContent value="sessions">
              <SessionsTab 
                upcomingSessions={upcomingSessions} 
                formatDate={formatDate}
                allSessions={sessions}
                createSession={createSession}
                updateSession={updateSession}
                loading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="mentees">
              <MenteesTab 
                mentees={mentees} 
                mentorStats={stats}
                updateMentorshipStatus={updateMentorshipStatus}
                loading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="messages">
              <MessagesTab 
                messages={messages} 
                formatDate={formatDate}
                markAsRead={markAsRead}
                sendMessage={sendMessage}
                loading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileTab mentorStats={stats} loading={isLoading} />
            </TabsContent>
          </DashboardTabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentorDashboard;
