
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  bio: string | null;
  specialty: string | null;
  years_experience: number | null;
  role: 'mentee' | 'mentor' | 'both';
  created_at: string;
  updated_at: string;
  // Fields from the Supabase database schema
  is_online?: boolean;
  last_seen?: string;
  username?: string;
}

export const useProfile = (userId?: string) => {
  const { user } = useAuth();
  const profileId = userId || user?.id;
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();
        
        if (error) throw error;
        
        // Make sure data matches our Profile interface
        // If some fields are missing in the database, provide defaults
        const profileData: Profile = {
          id: data.id,
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          avatar_url: data.avatar_url,
          bio: data.bio,
          specialty: data.specialty,
          years_experience: data.years_experience,
          role: data.role || 'mentee',
          created_at: data.created_at,
          updated_at: data.updated_at,
          // Add other fields from database schema
          is_online: data.is_online,
          last_seen: data.last_seen,
          username: data.username
        };
        
        setProfile(profileData);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!profileId) throw new Error('User ID is required');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profileId);
      
      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
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

  return { profile, loading, error, updateProfile };
};
