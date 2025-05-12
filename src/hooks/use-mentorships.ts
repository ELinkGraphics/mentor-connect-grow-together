
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Mentee {
  id: string;
  username: string;
  avatar_url: string | null;
  first_name?: string;
  last_name?: string;
  title?: string;
  company?: string;
  sessions_completed?: number;
  status: 'active' | 'pending' | 'completed';
}

export const useMentorships = (forMentee: boolean = false) => {
  const { user } = useAuth();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchMentorships = async () => {
      try {
        setLoading(true);
        
        // Get mentorships with appropriate profiles using specific column hints
        const { data, error } = await supabase
          .from('mentorships')
          .select(`
            status,
            ${forMentee ? 'mentor_id' : 'mentee_id'},
            profiles!mentorships_${forMentee ? 'mentor' : 'mentee'}_id_fkey(
              id,
              username,
              avatar_url,
              first_name,
              last_name,
              specialty
            )
          `)
          .eq(forMentee ? 'mentee_id' : 'mentor_id', user.id);
        
        if (error) throw error;
        
        if (data) {
          // Get completed sessions count for each relationship
          const mentorshipsWithData = await Promise.all(
            data.map(async (mentorship) => {
              const userId = forMentee ? mentorship.mentor_id : mentorship.mentee_id;

              const { count, error: sessionsError } = await supabase
                .from('sessions')
                .select('*', { count: 'exact', head: true })
                .eq('mentor_id', forMentee ? userId : user.id)
                .eq('mentee_id', forMentee ? user.id : userId)
                .eq('status', 'completed');
                
              if (sessionsError) {
                console.error('Error fetching session count:', sessionsError);
              }
              
              // Type the profiles data properly to avoid TypeScript errors
              const profileData = mentorship.profiles as Record<string, any> || {};
              
              return {
                id: userId,
                username: profileData.username || 'Unknown User',
                avatar_url: profileData.avatar_url || null,
                first_name: profileData.first_name || undefined,
                last_name: profileData.last_name || undefined,
                specialty: profileData.specialty || undefined,
                sessions_completed: count || 0,
                status: mentorship.status as 'active' | 'pending' | 'completed'
              };
            })
          );
          
          setMentees(mentorshipsWithData);
        }
      } catch (err: any) {
        setError(err);
        console.error('Error fetching mentorships:', err);
        toast({
          variant: "destructive",
          title: `Error fetching ${forMentee ? 'mentors' : 'mentees'}`,
          description: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();

    // Set up real-time subscription
    const channel = supabase
      .channel('mentorships-changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'mentorships',
          filter: `${forMentee ? 'mentee_id' : 'mentor_id'}=eq.${user.id}`
        }, 
        (payload) => {
          console.log('Real-time mentorship update received:', payload);
          // Refresh data when changes occur
          fetchMentorships();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, forMentee]);

  const addMentee = async (menteeId: string) => {
    if (!user?.id) return { success: false, error: new Error('User not authenticated') };
    
    try {
      const { data, error } = await supabase
        .from('mentorships')
        .insert([
          {
            mentor_id: user.id,
            mentee_id: menteeId,
            status: 'pending'
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Mentee Added",
        description: "The mentee has been added to your list"
      });
      
      // Refresh mentees list through real-time - no need to update state here
      
      return { success: true, data };
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to add mentee",
        description: err.message
      });
      
      return { success: false, error: err };
    }
  };

  const updateMentorshipStatus = async (relationId: string, status: 'active' | 'pending' | 'completed') => {
    try {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('mentorships')
        .update({ status, updated_at: new Date().toISOString() })
        .eq(forMentee ? 'mentee_id' : 'mentor_id', user.id)
        .eq(forMentee ? 'mentor_id' : 'mentee_id', relationId);
      
      if (error) throw error;
      
      toast({
        title: "Status Updated",
        description: `Mentorship status changed to ${status}`
      });
      
      // Real-time updates will handle state updates
      
      return true;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: err.message
      });
      return false;
    }
  };

  return { mentees, loading, error, addMentee, updateMentorshipStatus };
};
