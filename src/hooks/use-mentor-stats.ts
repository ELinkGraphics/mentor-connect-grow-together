
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

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
        
        // Get mentor profile data to check specialty
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('specialty')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        // Get total number of mentees (unique mentees across all mentorships)
        const { data: mentorshipsData, error: mentorshipsError } = await supabase
          .from('mentorships')
          .select('mentee_id, status')
          .eq('mentor_id', user.id);
        
        if (mentorshipsError) throw mentorshipsError;
        
        const totalMentees = mentorshipsData ? mentorshipsData.length : 0;
        const activeMentees = mentorshipsData ? 
          mentorshipsData.filter(m => m.status === 'active').length : 0;
        
        // Get session statistics
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('sessions')
          .select('status, duration')
          .eq('mentor_id', user.id);
        
        if (sessionsError) throw sessionsError;
        
        const totalSessions = sessionsData ? sessionsData.length : 0;
        const completedSessions = sessionsData ? 
          sessionsData.filter(s => s.status === 'completed').length : 0;
        
        // Calculate total hours (duration is stored in minutes)
        const completedHours = sessionsData ? 
          sessionsData
            .filter(s => s.status === 'completed')
            .reduce((total, session) => total + (session.duration / 60), 0) : 0;
        
        // Get average rating
        const { data: ratingsData, error: ratingsError } = await supabase
          .from('ratings')
          .select('rating, sessions!inner(mentor_id)')
          .eq('sessions.mentor_id', user.id);
        
        if (ratingsError) throw ratingsError;
        
        const averageRating = ratingsData && ratingsData.length > 0 ? 
          ratingsData.reduce((sum, item) => sum + item.rating, 0) / ratingsData.length : 0;
        
        // Parse skills from specialty field or use default if not set
        let topSkills: string[] = [];
        if (profileData?.specialty) {
          topSkills = profileData.specialty.split(',').map(skill => skill.trim());
        } else {
          topSkills = ['Leadership', 'Career Development', 'Technical Mentoring', 'Public Speaking'];
        }
        
        setStats({
          totalMentees,
          activeMentees,
          totalSessions,
          completedSessions,
          completedHours,
          averageRating,
          topSkills
        });
      } catch (err: any) {
        setError(err);
        console.error('Error fetching mentor stats:', err);
        toast({
          variant: "destructive",
          title: "Error fetching stats",
          description: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  return { stats, loading, error };
};
