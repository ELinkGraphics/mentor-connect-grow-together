
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface MentorStats {
  totalMentees: number;
  activeMentees: number;
  totalSessions: number;
  completedSessions: number;
  completedHours: number;
  averageRating: number;
  topSkills: string[];
}

export const useMentorStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<MentorStats>({
    totalMentees: 0,
    activeMentees: 0,
    totalSessions: 0,
    completedSessions: 0,
    completedHours: 0,
    averageRating: 0,
    topSkills: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        // Set default stats since we don't have the actual tables yet
        const defaultStats = {
          totalMentees: 5,
          activeMentees: 3,
          totalSessions: 12,
          completedSessions: 8,
          completedHours: 12.5,
          averageRating: 4.8,
          // Generate some default skills
          topSkills: ['Leadership', 'Career Development', 'Technical Mentoring', 'Public Speaking']
        };
        
        setStats(defaultStats);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching mentor stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  return { stats, loading, error };
};
