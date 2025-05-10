
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
        
        // Since we don't have the actual tables yet, create mock data
        const mockMentees: Mentee[] = [
          {
            id: '1',
            username: 'sarah_dev',
            avatar_url: 'https://i.pravatar.cc/150?u=1',
            first_name: 'Sarah',
            last_name: 'Johnson',
            title: 'Junior Developer',
            company: 'TechStart',
            sessions_completed: 4,
            status: 'active'
          },
          {
            id: '2',
            username: 'mike_design',
            avatar_url: 'https://i.pravatar.cc/150?u=2',
            first_name: 'Michael',
            last_name: 'Rodriguez',
            title: 'UX Designer',
            company: 'CreativeSolutions',
            sessions_completed: 2,
            status: 'active'
          },
          {
            id: '3',
            username: 'alex_pm',
            avatar_url: 'https://i.pravatar.cc/150?u=3',
            first_name: 'Alex',
            last_name: 'Williams',
            title: 'Product Manager',
            company: 'InnovateCorp',
            sessions_completed: 1,
            status: 'pending'
          }
        ];
        
        setMentees(mockMentees);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching mentees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, [user?.id]);

  const addMentee = async (menteeId: string) => {
    if (!user?.id) return { success: false, error: new Error('User not authenticated') };
    
    try {
      // Mock successful addition
      toast({
        title: "Mentee Added",
        description: "The mentee has been added to your list"
      });
      
      return { success: true, data: {} };
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
      // Mock successful update
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
