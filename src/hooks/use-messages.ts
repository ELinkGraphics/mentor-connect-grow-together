
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  mentorship_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    username: string;
    avatar_url: string | null;
    first_name?: string;
    last_name?: string;
  };
}

export const useMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        setLoading(true);
        
        // First, get all mentorships where the user is a mentor
        const { data: mentorships, error: mentorshipsError } = await supabase
          .from('mentorships')
          .select('id')
          .eq('mentor_id', user.id);
        
        if (mentorshipsError) throw mentorshipsError;
        
        if (!mentorships || mentorships.length === 0) {
          setMessages([]);
          setUnreadCount(0);
          return;
        }
        
        const mentorshipIds = mentorships.map(m => m.id);
        
        // Then get all messages for these mentorships
        const { data, error } = await supabase
          .from('mentorship_messages')
          .select(`
            *,
            sender:sender_id(username, avatar_url, first_name, last_name)
          `)
          .in('mentorship_id', mentorshipIds)
          .order('created_at', { ascending: false })
          .limit(50); // Limit to recent messages
        
        if (error) throw error;
        
        setMessages(data || []);
        
        // Count unread messages
        const unread = (data || []).filter(
          msg => !msg.is_read && msg.sender_id !== user.id
        ).length;
        
        setUnreadCount(unread);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('mentorship-messages')
      .on('postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mentorship_messages'
        }, 
        async (payload) => {
          console.log('New message received:', payload);
          
          // Check if this message belongs to one of user's mentorships
          const messageData = payload.new as Message;
          
          const { data } = await supabase
            .from('mentorships')
            .select('id')
            .eq('id', messageData.mentorship_id)
            .eq('mentor_id', user.id)
            .single();
          
          if (data) {
            // This message is relevant to the user, refetch messages
            fetchMessages();
            
            // Show notification if message is not from the user
            if (messageData.sender_id !== user.id) {
              toast({
                title: "New Message",
                description: "You have received a new message from a mentee",
                variant: "default"
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('mentorship_messages')
        .update({ is_read: true })
        .eq('id', messageId);
      
      if (error) throw error;
      
      // Update local state
      setMessages(current => 
        current.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
      
      // Update unread count
      setUnreadCount(current => Math.max(0, current - 1));
      
      return true;
    } catch (err: any) {
      console.error('Error marking message as read:', err);
      return false;
    }
  };

  const sendMessage = async (mentorshipId: string, content: string) => {
    if (!user?.id) return { success: false, error: new Error('User not authenticated') };
    
    try {
      const { data, error } = await supabase
        .from('mentorship_messages')
        .insert({
          mentorship_id: mentorshipId,
          sender_id: user.id,
          content,
          is_read: false
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (err: any) {
      console.error('Error sending message:', err);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: err.message
      });
      
      return { success: false, error: err };
    }
  };

  return { 
    messages, 
    unreadCount, 
    loading, 
    error, 
    markAsRead, 
    sendMessage 
  };
};
