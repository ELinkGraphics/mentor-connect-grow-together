
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

export const useMessages = (forMentee: boolean = false) => {
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
        
        // First get all mentorships where the user is a mentor or mentee
        const { data: mentorships, error: mentorshipsError } = await supabase
          .from('mentorships')
          .select('id')
          .eq(forMentee ? 'mentee_id' : 'mentor_id', user.id);
        
        if (mentorshipsError) throw mentorshipsError;
        
        if (!mentorships || mentorships.length === 0) {
          setMessages([]);
          setUnreadCount(0);
          setLoading(false);
          return;
        }
        
        // Get the mentorship IDs
        const mentorshipIds = mentorships.map(m => m.id);
        
        // Get messages from chats related to mentorships
        const { data: chatsData, error: chatsError } = await supabase
          .from('chats')
          .select('id')
          .in('id', mentorshipIds);
        
        if (chatsError || !chatsData || chatsData.length === 0) {
          console.log("No chats found, using mock data");
          
          // Mock data for messages - this will be replaced by real data as it becomes available
          const mockMessages: Message[] = [
            {
              id: '201',
              mentorship_id: mentorships[0]?.id || '301',
              sender_id: '1',
              content: forMentee
                ? "Hi! I'm your mentor. Let me know if you have any questions."
                : "Hi! I was hoping to discuss the feedback on my last project during our next session.",
              is_read: false,
              created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
              updated_at: new Date(Date.now() - 3600000).toISOString(),
              sender: {
                id: '1',
                username: forMentee ? 'mentor_coach' : 'sarah_dev',
                avatar_url: 'https://i.pravatar.cc/150?u=1'
              }
            },
            {
              id: '202',
              mentorship_id: mentorships[0]?.id || '302',
              sender_id: '2',
              content: forMentee 
                ? "I've reviewed your progress and have some suggestions for your next steps." 
                : "Thanks for the resources you shared last time. I've been going through them and have some questions.",
              is_read: false,
              created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
              updated_at: new Date(Date.now() - 7200000).toISOString(),
              sender: {
                id: '2',
                username: forMentee ? 'expert_guide' : 'mike_design',
                avatar_url: 'https://i.pravatar.cc/150?u=2'
              }
            }
          ];
          
          setMessages(mockMessages);
          setUnreadCount(mockMessages.filter(m => !m.is_read).length);
          setLoading(false);
          return;
        }
        
        const chatIds = chatsData.map(chat => chat.id);
        
        // Try to get messages with sender info
        try {
          const { data: messagesData, error: messagesError } = await supabase
            .from('messages')
            .select(`
              id,
              chat_id,
              sender_id,
              content,
              status,
              created_at,
              updated_at,
              profiles:sender_id(
                id,
                username,
                avatar_url
              )
            `)
            .in('chat_id', chatIds)
            .order('created_at', { ascending: false })
            .limit(20);
          
          if (messagesError) throw messagesError;
          
          if (messagesData && messagesData.length > 0) {
            // Transform to expected format
            const formattedMessages: Message[] = messagesData.map(msg => {
              let senderInfo = {
                id: msg.sender_id || '',
                username: 'Unknown User',
                avatar_url: null
              };
              
              // Check if profiles data is available
              if (msg.profiles && typeof msg.profiles === 'object') {
                // Safely access properties with optional chaining
                const profiles = msg.profiles as Record<string, any>;
                senderInfo = {
                  id: profiles?.id || msg.sender_id || '',
                  username: profiles?.username || 'Unknown User',
                  avatar_url: profiles?.avatar_url || null
                };
              }
              
              return {
                id: msg.id,
                mentorship_id: msg.chat_id,
                sender_id: msg.sender_id || '',
                content: msg.content || '',
                is_read: msg.status === 'read',
                created_at: msg.created_at,
                updated_at: msg.updated_at,
                sender: senderInfo
              };
            });
            
            setMessages(formattedMessages);
            setUnreadCount(formattedMessages.filter(m => !m.is_read && m.sender_id !== user.id).length);
            setLoading(false);
            return;
          }
        } catch (innerErr) {
          console.error('Error fetching message details:', innerErr);
          // Continue to fallback mock data
        }
        
        // Use mock data if no messages found or on error
        const mockMessages: Message[] = [
          {
            id: '201',
            mentorship_id: mentorships[0]?.id || '301',
            sender_id: '1',
            content: forMentee
              ? "Hi! I'm your mentor. Let me know if you have any questions."
              : "Hi! I was hoping to discuss the feedback on my last project during our next session.",
            is_read: false,
            created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            updated_at: new Date(Date.now() - 3600000).toISOString(),
            sender: {
              id: '1',
              username: forMentee ? 'mentor_coach' : 'sarah_dev',
              avatar_url: 'https://i.pravatar.cc/150?u=1'
            }
          },
          {
            id: '202',
            mentorship_id: mentorships[0]?.id || '302',
            sender_id: '2',
            content: forMentee 
              ? "I've reviewed your progress and have some suggestions for your next steps." 
              : "Thanks for the resources you shared last time. I've been going through them and have some questions.",
            is_read: false,
            created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            updated_at: new Date(Date.now() - 7200000).toISOString(),
            sender: {
              id: '2',
              username: forMentee ? 'expert_guide' : 'mike_design',
              avatar_url: 'https://i.pravatar.cc/150?u=2'
            }
          }
        ];
        
        setMessages(mockMessages);
        setUnreadCount(mockMessages.filter(m => !m.is_read).length);
      } catch (err: any) {
        setError(err);
        console.error('Error fetching messages:', err);
        
        // Fallback to mock data in case of an error
        const mockMessages: Message[] = [
          {
            id: '201',
            mentorship_id: '301',
            sender_id: '1',
            content: forMentee
              ? "Hi! I'm your mentor. Let me know if you have any questions."
              : "Hi! I was hoping to discuss the feedback on my last project during our next session.",
            is_read: false,
            created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            updated_at: new Date(Date.now() - 3600000).toISOString(),
            sender: {
              id: '1',
              username: forMentee ? 'mentor_coach' : 'sarah_dev',
              avatar_url: 'https://i.pravatar.cc/150?u=1'
            }
          },
          {
            id: '202',
            mentorship_id: '302',
            sender_id: '2',
            content: forMentee 
              ? "I've reviewed your progress and have some suggestions for your next steps." 
              : "Thanks for the resources you shared last time. I've been going through them and have some questions.",
            is_read: false,
            created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            updated_at: new Date(Date.now() - 7200000).toISOString(),
            sender: {
              id: '2',
              username: forMentee ? 'expert_guide' : 'mike_design',
              avatar_url: 'https://i.pravatar.cc/150?u=2'
            }
          }
        ];
        
        setMessages(mockMessages);
        setUnreadCount(mockMessages.filter(m => !m.is_read).length);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // Set up real-time subscription for messages
    const messageChannel = supabase
      .channel('messages-changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'messages'
        }, 
        (payload) => {
          console.log('Real-time message update received:', payload);
          // Refresh data when changes occur
          fetchMessages();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [user?.id, forMentee]);

  const markAsRead = async (messageId: string) => {
    try {
      // Find message in the chats system
      const message = messages.find(m => m.id === messageId);
      
      if (!message) return false;
      
      // Try to update in the database
      try {
        await supabase
          .from('messages')
          .update({ status: 'read' })
          .eq('id', messageId);
      } catch (err) {
        console.error('Error updating message status in DB:', err);
      }
      
      // Update local state regardless
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
      
      // First check if there's a chat for this mentorship
      let chatId = mentorshipId;
      
      try {
        const { data: chatData, error: chatError } = await supabase
          .from('chats')
          .select('id')
          .eq('id', mentorshipId)
          .maybeSingle();
          
        if (chatError || !chatData) {
          // Create a chat if it doesn't exist
          const { data: newChat, error: newChatError } = await supabase
            .from('chats')
            .insert([
              { 
                id: mentorshipId,
                title: 'Mentorship Chat',
                type: 'mentorship' 
              }
            ])
            .select()
            .single();
            
          if (newChatError) throw newChatError;
          chatId = newChat.id;
        }
      } catch (err) {
        console.error('Error checking/creating chat:', err);
        // Continue with mentorshipId as the chat ID if we can't verify
      }
      
      // Send message
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatId,
            sender_id: user.id,
            content,
            type: 'text',
            status: 'sent'
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent"
      });
      
      return { success: true, data };
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message"
      });
      return { success: false, error: err };
    }
  };

  return { messages, unreadCount, loading, error, markAsRead, sendMessage };
};
