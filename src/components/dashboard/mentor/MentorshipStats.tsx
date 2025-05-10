
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface MentorshipStatsProps {
  stats: {
    totalSessions: number;
    completedSessions: number;
    completedHours: number;
    averageRating: number;
    topSkills: string[];
  };
  loading?: boolean;
}

const MentorshipStats: React.FC<MentorshipStatsProps> = ({ stats, loading = false }) => {
  return (
    <Card>
      <CardHeader className="bg-soft-blue/30 rounded-t-lg">
        <CardTitle className="flex items-center text-mentee-primary">
          <BarChart3 className="mr-2 h-5 w-5" /> Mentorship Stats
        </CardTitle>
        <CardDescription>Your impact as a mentor</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between items-center p-2 border-b">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
            <div className="mt-6">
              <Skeleton className="h-5 w-36 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 border-b">
                <span className="text-sm">Total Sessions</span>
                <span className="font-medium">{stats.totalSessions}</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <span className="text-sm">Completed Sessions</span>
                <span className="font-medium">{stats.completedSessions}</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <span className="text-sm">Hours Mentored</span>
                <span className="font-medium">{stats.completedHours}</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <span className="text-sm">Average Duration</span>
                <span className="font-medium">
                  {stats.completedSessions > 0
                    ? `${Math.round((stats.completedHours * 60) / stats.completedSessions)} min`
                    : '0 min'}
                </span>
              </div>
              <div className="flex justify-between items-center p-2">
                <span className="text-sm">Completion Rate</span>
                <span className="font-medium">
                  {stats.totalSessions > 0
                    ? `${Math.round((stats.completedSessions / stats.totalSessions) * 100)}%`
                    : '0%'}
                </span>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MentorshipStats;
