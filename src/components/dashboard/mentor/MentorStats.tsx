
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, MessageSquare, Award } from 'lucide-react';

interface MentorStatsProps {
  activeMentees: number;
  totalMentees: number;
  upcomingSessions: any[];
  unreadMessages: number;
  averageRating: number;
  totalSessions: number;
  getTimeUntil: (dateString: string) => string;
}

const MentorStats: React.FC<MentorStatsProps> = ({
  activeMentees,
  totalMentees,
  upcomingSessions,
  unreadMessages,
  averageRating,
  totalSessions,
  getTimeUntil
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-mentor-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Mentees</CardTitle>
          <Users className="h-4 w-4 text-mentor-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeMentees}</div>
          <p className="text-xs text-muted-foreground">Out of {totalMentees} total mentees</p>
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
          <div className="text-2xl font-bold">{unreadMessages}</div>
          <p className="text-xs text-muted-foreground">From {unreadMessages} different mentees</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-mentee-secondary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Mentor Rating</CardTitle>
          <Award className="h-4 w-4 text-mentee-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating} <span className="text-base">/ 5</span></div>
          <p className="text-xs text-muted-foreground">Based on {totalSessions} sessions</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorStats;
