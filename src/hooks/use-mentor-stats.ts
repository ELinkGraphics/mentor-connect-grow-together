
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
        
        // Fetch mentor profile to get skills
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('specialty')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        // Fetch total mentees count
        const { count: totalMentees, error: menteesError } = await supabase
          .from('mentorships')
          .select('*', { count: 'exact', head: true })
          .eq('mentor_id', user.id);
        
        if (menteesError) throw menteesError;
        
        // Fetch active mentees count
        const { count: activeMentees, error: activeError } = await supabase
          .from('mentorships')
          .select('*', { count: 'exact', head: true })
          .eq('mentor_id', user.id)
          .eq('status', 'active');
        
        if (activeError) throw activeError;
        
        // Fetch sessions data
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select('*')
          .eq('mentor_id', user.id);
        
        if (sessionsError) throw sessionsError;
        
        // Calculate session stats
        const totalSessions = sessions ? sessions.length : 0;
        const completedSessions = sessions 
          ? sessions.filter(s => s.status === 'completed').length
          : 0;
          
        const completedHours = sessions
          ? sessions
              .filter(s => s.status === 'completed')
              .reduce((total, session) => total + (session.duration / 60), 0)
          : 0;
        
        // Parse skills
        const specialty = profileData?.specialty || '';
        const topSkills = specialty
          ? specialty.split(',').map(s => s.trim()).filter(s => s.length > 0)
          : ['Leadership', 'Mentoring'];
          
        if (topSkills.length === 0) {
          topSkills.push('Leadership', 'Mentoring');
        }
        
        setStats({
          totalMentees: totalMentees || 0,
          activeMentees: activeMentees || 0,
          totalSessions,
          completedSessions,
          completedHours: parseFloat(completedHours.toFixed(1)),
          averageRating: 4.8, // Default as we don't have ratings implemented yet
          topSkills
        });
      } catch (err: any) {
        setError(err);
        console.error('Error fetching mentor stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Set up real-time subscription for sessions
    const sessionsChannel = supabase
      .channel('sessions-stats')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'sessions',
          filter: `mentor_id=eq.${user.id}`
        }, 
        () => {
          fetchStats(); // Refetch stats when sessions change
        }
      )
      .subscribe();
      
    // Set up real-time subscription for mentorships
    const mentorshipsChannel = supabase
      .channel('mentorships-stats')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'mentorships',
          filter: `mentor_id=eq.${user.id}`
        }, 
        () => {
          fetchStats(); // Refetch stats when mentorships change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sessionsChannel);
      supabase.removeChannel(mentorshipsChannel);
    };
  }, [user?.id]);

  return { stats, loading, error };
};
