
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProfileFromDB {
  id: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  is_online: boolean | null;
  last_seen: string | null;
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string | null;
  specialty?: string | null;
  years_experience?: number | null;
  role?: 'mentee' | 'mentor' | 'both';
}

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
        
        // Cast the data to our intermediate type to handle the fields
        const dbProfile = data as ProfileFromDB;
        
        // Transform the database profile into our application profile model
        const profileData: Profile = {
          id: dbProfile.id,
          first_name: dbProfile.first_name || '',
          last_name: dbProfile.last_name || '',
          avatar_url: dbProfile.avatar_url,
          bio: dbProfile.bio || null,
          specialty: dbProfile.specialty || null,
          years_experience: dbProfile.years_experience || null,
          role: dbProfile.role || 'mentee',
          created_at: dbProfile.created_at,
          updated_at: dbProfile.updated_at,
          is_online: dbProfile.is_online,
          last_seen: dbProfile.last_seen,
          username: dbProfile.username
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
