
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

export const useMentorships = () => {
  const { user } = useAuth();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchMentees = async () => {
      try {
        setLoading(true);
        
        // Get mentorships with mentee profiles - using specific column hints to avoid ambiguity
        const { data, error } = await supabase
          .from('mentorships')
          .select(`
            status,
            mentee_id,
            profiles!mentorships_mentee_id_fkey(
              id,
              username,
              avatar_url,
              first_name,
              last_name
            )
          `)
          .eq('mentor_id', user.id);
        
        if (error) throw error;
        
        if (data) {
          // Get completed sessions count for each mentee
          const menteesWithSessions = await Promise.all(
            data.map(async (mentorship) => {
              const { count, error: sessionsError } = await supabase
                .from('sessions')
                .select('*', { count: 'exact', head: true })
                .eq('mentor_id', user.id)
                .eq('mentee_id', mentorship.mentee_id)
                .eq('status', 'completed');
                
              if (sessionsError) {
                console.error('Error fetching session count:', sessionsError);
              }
              
              // Make sure profiles data is available before accessing properties
              const profileData = mentorship.profiles || {};
              
              return {
                id: mentorship.mentee_id,
                username: profileData.username || 'Unknown User',
                avatar_url: profileData.avatar_url || null,
                first_name: profileData.first_name || undefined,
                last_name: profileData.last_name || undefined,
                sessions_completed: count || 0,
                status: mentorship.status as 'active' | 'pending' | 'completed'
              };
            })
          );
          
          setMentees(menteesWithSessions);
        }
      } catch (err: any) {
        setError(err);
        console.error('Error fetching mentees:', err);
        toast({
          variant: "destructive",
          title: "Error fetching mentees",
          description: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, [user?.id]);

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
      
      // Refresh mentees list
      const { data: menteeData, error: menteeError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, first_name, last_name')
        .eq('id', menteeId)
        .single();
        
      if (!menteeError && menteeData) {
        setMentees(prev => [
          ...prev,
          {
            id: menteeData.id,
            username: menteeData.username,
            avatar_url: menteeData.avatar_url,
            first_name: menteeData.first_name,
            last_name: menteeData.last_name,
            sessions_completed: 0,
            status: 'pending'
          }
        ]);
      }
      
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

  const updateMentorshipStatus = async (menteeId: string, status: 'active' | 'pending' | 'completed') => {
    try {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('mentorships')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('mentor_id', user.id)
        .eq('mentee_id', menteeId);
      
      if (error) throw error;
      
      toast({
        title: "Status Updated",
        description: `Mentorship status changed to ${status}`
      });
      
      // Update local state
      setMentees(prev => 
        prev.map(mentee => 
          mentee.id === menteeId ? { ...mentee, status } : mentee
        )
      );
      
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
