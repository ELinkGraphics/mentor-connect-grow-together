
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

export const useSessions = (forMentee: boolean = false) => {
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
        
        // Get sessions with appropriate profiles using explicit foreign key reference
        const { data, error } = await supabase
          .from('sessions')
          .select(`
            *,
            profiles!sessions_${forMentee ? 'mentor' : 'mentee'}_id_fkey(
              id,
              username,
              avatar_url,
              first_name,
              last_name
            )
          `)
          .eq(forMentee ? 'mentee_id' : 'mentor_id', user.id)
          .order('scheduled_at', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          // Transform the data to match the Session interface
          const formattedSessions: Session[] = data.map(session => {
            // Type the profiles data properly to avoid TypeScript errors
            const profileData = session.profiles as Record<string, any> || {};
            
            return {
              id: session.id,
              mentor_id: session.mentor_id,
              mentee_id: session.mentee_id,
              title: session.title,
              description: session.description,
              scheduled_at: session.scheduled_at,
              duration: session.duration,
              status: session.status as 'scheduled' | 'completed' | 'cancelled',
              created_at: session.created_at,
              updated_at: session.updated_at,
              mentee: forMentee ? undefined : {
                id: session.mentee_id,
                username: profileData.username || 'Unknown User',
                avatar_url: profileData.avatar_url || null,
                first_name: profileData.first_name || undefined,
                last_name: profileData.last_name || undefined
              }
            };
          });
          
          setSessions(formattedSessions);
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
          filter: `${forMentee ? 'mentee_id' : 'mentor_id'}=eq.${user.id}`
        }, 
        (payload) => {
          console.log('Real-time session update received:', payload);
          // Refresh data when changes occur
          fetchSessions();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, forMentee]);

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
        .eq(forMentee ? 'mentee_id' : 'mentor_id', user?.id);
      
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
