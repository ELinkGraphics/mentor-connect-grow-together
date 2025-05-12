
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MenteeStats {
  activeMentors: number;
  totalMentors: number;
  completedSessions: number;
  upcomingSessions: number;
  nextSessionDate: string | null;
  averageRating: number;
  topSkills: string[];
  growthAreas: string[];
}

export const useMenteeStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<MenteeStats>({
    activeMentors: 0,
    totalMentors: 0,
    completedSessions: 0,
    upcomingSessions: 0,
    nextSessionDate: null,
    averageRating: 0,
    topSkills: ['JavaScript', 'React', 'TypeScript', 'UI/UX Design'],
    growthAreas: ['Data Structures', 'System Design', 'Leadership']
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const calculateStats = async () => {
      try {
        setLoading(true);
        
        // Get mentorship data
        const { data: mentorships, error: mentorshipError } = await supabase
          .from('mentorships')
          .select('status')
          .eq('mentee_id', user.id);
          
        if (mentorshipError) throw mentorshipError;
        
        // Get session data
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select('*')
          .eq('mentee_id', user.id)
          .order('scheduled_at', { ascending: true });
          
        if (sessionsError) throw sessionsError;
        
        // Get rating data
        const { data: ratings, error: ratingsError } = await supabase
          .from('ratings')
          .select('rating')
          .eq('session_id', user.id); // This might need adjustment based on your schema
          
        if (ratingsError) {
          console.error('Error fetching ratings:', ratingsError);
        }
        
        // Process data
        const activeMentors = mentorships?.filter(m => m.status === 'active').length || 0;
        const totalMentors = mentorships?.length || 0;
        
        const completedSessions = sessions?.filter(s => s.status === 'completed').length || 0;
        const upcomingSessions = sessions?.filter(s => 
          s.status === 'scheduled' && new Date(s.scheduled_at) > new Date()
        ).length || 0;
        
        const nextSession = sessions?.find(s => 
          s.status === 'scheduled' && new Date(s.scheduled_at) > new Date()
        );
        
        const nextSessionDate = nextSession?.scheduled_at || null;
        
        let avgRating = 0;
        if (ratings && ratings.length > 0) {
          const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
          avgRating = Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal place
        }
        
        setStats({
          activeMentors,
          totalMentors,
          completedSessions,
          upcomingSessions,
          nextSessionDate,
          averageRating: avgRating,
          topSkills: ['JavaScript', 'React', 'TypeScript', 'UI/UX Design'],
          growthAreas: ['Data Structures', 'System Design', 'Leadership']
        });
        
      } catch (error) {
        console.error('Error calculating mentee stats:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateStats();
    
    // Set up real-time subscriptions
    const mentorshipsChannel = supabase
      .channel('mentee-mentorships')
      .on('postgres_changes', 
        {
          event: '*', 
          schema: 'public',
          table: 'mentorships',
          filter: `mentee_id=eq.${user.id}`
        },
        () => calculateStats()
      )
      .subscribe();
      
    const sessionsChannel = supabase
      .channel('mentee-sessions')
      .on('postgres_changes', 
        {
          event: '*', 
          schema: 'public',
          table: 'sessions',
          filter: `mentee_id=eq.${user.id}`
        },
        () => calculateStats()
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(mentorshipsChannel);
      supabase.removeChannel(sessionsChannel);
    };
  }, [user?.id]);

  return { stats, loading };
};
