
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
        
        // Mock data for sessions until database is updated
        const mockSessions: Session[] = [
          {
            id: '101',
            mentor_id: user.id,
            mentee_id: '1',
            title: 'Career Path Planning',
            description: 'Discussing long-term career goals and creating an action plan.',
            scheduled_at: new Date(Date.now() + 86400000).toISOString(), // tomorrow
            duration: 60,
            status: 'scheduled',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            mentee: {
              id: '1',
              username: 'sarah_dev',
              avatar_url: 'https://i.pravatar.cc/150?u=1',
              first_name: 'Sarah',
              last_name: 'Johnson'
            }
          },
          {
            id: '102',
            mentor_id: user.id,
            mentee_id: '2',
            title: 'UX Design Review',
            description: 'Reviewing portfolio and providing feedback.',
            scheduled_at: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
            duration: 45,
            status: 'scheduled',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            mentee: {
              id: '2',
              username: 'mike_design',
              avatar_url: 'https://i.pravatar.cc/150?u=2',
              first_name: 'Michael',
              last_name: 'Rodriguez'
            }
          },
          {
            id: '103',
            mentor_id: user.id,
            mentee_id: '1',
            title: 'Technical Interview Prep',
            description: 'Practice session for upcoming interviews.',
            scheduled_at: new Date(Date.now() - 86400000).toISOString(), // yesterday
            duration: 60,
            status: 'completed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            mentee: {
              id: '1',
              username: 'sarah_dev',
              avatar_url: 'https://i.pravatar.cc/150?u=1',
              first_name: 'Sarah',
              last_name: 'Johnson'
            }
          }
        ];
        
        setSessions(mockSessions);
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
  }, [user?.id]);

  const createSession = async (sessionData: Omit<Session, 'id' | 'created_at' | 'updated_at' | 'mentor_id'>) => {
    if (!user?.id) return { success: false, error: new Error('User not authenticated') };
    
    try {
      // Generate a mock ID for the new session
      const newId = Math.random().toString(36).substring(2, 11);
      
      // Create a new session object
      const newSession: Session = {
        id: newId,
        mentor_id: user.id,
        mentee_id: sessionData.mentee_id,
        title: sessionData.title,
        description: sessionData.description,
        scheduled_at: sessionData.scheduled_at,
        duration: sessionData.duration,
        status: sessionData.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Update local state
      setSessions(prev => [...prev, newSession]);
      
      toast({
        title: "Session Created",
        description: "The mentorship session has been scheduled"
      });
      
      return { success: true, data: newSession };
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
      // Update local state
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionId ? { ...session, ...updates, updated_at: new Date().toISOString() } : session
        )
      );
      
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
