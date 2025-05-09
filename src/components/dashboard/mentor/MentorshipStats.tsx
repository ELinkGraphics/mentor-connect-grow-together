
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface MentorshipStatsProps {
  stats: {
    totalSessions: number;
    completedHours: number;
    averageRating: number;
    topSkills: string[];
  };
}

const MentorshipStats: React.FC<MentorshipStatsProps> = ({ stats }) => {
  return (
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
            <span className="font-medium">{stats.totalSessions}</span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-sm">Hours Mentored</span>
            <span className="font-medium">{stats.completedHours}</span>
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
            {stats.topSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-mentor-primary/10 text-mentor-primary rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorshipStats;
