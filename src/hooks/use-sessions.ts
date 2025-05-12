
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Session {
  id: string;
  mentor_id: string;
  mentee_id: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  mentee?: {
    id: string;
    avatar_url: string | null;
    username: string;
    first_name?: string;
    last_name?: string;
  };
}

export const useSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchSessions = async () => {
      try {
        setLoading(true);
        
        // Get sessions with mentee profiles
        const { data, error } = await supabase
          .from('sessions')
          .select(`
            *,
            mentee:mentee_id(
              id,
              username,
              avatar_url,
              first_name,
              last_name
            )
          `)
          .eq('mentor_id', user.id)
          .order('scheduled_at', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setSessions(data);
        }
      } catch (err: any) {
        setError(err);
        console.error('Error fetching sessions:', err);
        toast({
          variant: "destructive",
          title: "Error fetching sessions",
          description: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('sessions-changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'sessions',
          filter: `mentor_id=eq.${user.id}`
        }, 
        () => {
          // Refresh data when changes occur
          fetchSessions();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const createSession = async (sessionData: Omit<Session, 'id' | 'created_at' | 'updated_at' | 'mentor_id'>) => {
    if (!user?.id) return { success: false, error: new Error('User not authenticated') };
    
    try {
      const newSession = {
        mentor_id: user.id,
        mentee_id: sessionData.mentee_id,
        title: sessionData.title,
        description: sessionData.description,
        scheduled_at: sessionData.scheduled_at,
        duration: sessionData.duration,
        status: sessionData.status
      };
      
      const { data, error } = await supabase
        .from('sessions')
        .insert([newSession])
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Session Created",
        description: "The mentorship session has been scheduled"
      });
      
      return { success: true, data };
    } catch (err: any) {
      console.error('Error creating session:', err);
      toast({
        variant: "destructive",
        title: "Failed to create session",
        description: err.message
      });
      
      return { success: false, error: err };
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<Session>) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .eq('mentor_id', user?.id);
      
      if (error) throw error;
      
      toast({
        title: "Session Updated",
        description: "The session details have been updated"
      });
      
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

  return { sessions, loading, error, createSession, updateSession };
};
