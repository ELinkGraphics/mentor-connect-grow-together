
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
    id: string;
    username: string;
    avatar_url: string | null;
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
        
        // Mock data since the table doesn't exist yet
        const mockMessages: Message[] = [
          {
            id: '201',
            mentorship_id: '301',
            sender_id: '1',
            content: "Hi! I was hoping to discuss the feedback on my last project during our next session.",
            is_read: false,
            created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            updated_at: new Date(Date.now() - 3600000).toISOString(),
            sender: {
              id: '1',
              username: 'sarah_dev',
              avatar_url: 'https://i.pravatar.cc/150?u=1'
            }
          },
          {
            id: '202',
            mentorship_id: '302',
            sender_id: '2',
            content: "Thanks for the resources you shared last time. I've been going through them and have some questions.",
            is_read: false,
            created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            updated_at: new Date(Date.now() - 7200000).toISOString(),
            sender: {
              id: '2',
              username: 'mike_design',
              avatar_url: 'https://i.pravatar.cc/150?u=2'
            }
          }
        ];
        
        setMessages(mockMessages);
        setUnreadCount(mockMessages.filter(m => !m.is_read).length);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user?.id]);

  const markAsRead = async (messageId: string) => {
    try {
      // Update local state
      setMessages(prev => 
        prev.map(message => 
          message.id === messageId ? { ...message, is_read: true } : message
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      return true;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark message as read"
      });
      return false;
    }
  };

  const sendMessage = async (mentorshipId: string, content: string) => {
    try {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Create new message object
      const newMessage: Message = {
        id: Math.random().toString(36).substring(2, 11),
        mentorship_id: mentorshipId,
        sender_id: user.id,
        content,
        is_read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sender: {
          id: user.id,
          username: 'you',
          avatar_url: null
        }
      };
      
      // Update local state
      setMessages(prev => [...prev, newMessage]);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent"
      });
      
      return true;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message"
      });
      return false;
    }
  };

  return { messages, unreadCount, loading, error, markAsRead, sendMessage };
};
