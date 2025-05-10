
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bell, Send } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender_id: string;
  sender?: {
    username: string;
    avatar_url: string | null;
    first_name?: string;
    last_name?: string;
  };
  mentorship_id: string;
}

interface MessagesTabProps {
  messages: Message[];
  formatDate: (dateString: string) => string;
  markAsRead: (messageId: string) => Promise<boolean>;
  sendMessage: (mentorshipId: string, content: string) => Promise<any>;
  loading?: boolean;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ 
  messages, 
  formatDate, 
  markAsRead,
  sendMessage,
  loading = false 
}) => {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Group messages by sender to simulate conversations
  const conversations: { [key: string]: Message[] } = {};
  
  messages.forEach(msg => {
    const senderId = msg.sender_id;
    if (!conversations[senderId]) {
      conversations[senderId] = [];
    }
    conversations[senderId].push(msg);
  });
  
  // Get unique senders with their latest message
  const uniqueSenders = Object.keys(conversations).map(senderId => {
    const latestMessage = conversations[senderId].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    return latestMessage;
  });
  
  // Sort by date (newest first)
  uniqueSenders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Helper function to get sender display name
  const getSenderName = (message: Message) => {
    if (!message.sender) return 'Unknown User';
    
    if (message.sender.first_name && message.sender.last_name) {
      return `${message.sender.first_name} ${message.sender.last_name}`;
    }
    
    return message.sender.username;
  };

  const handleMarkAsRead = async (messageId: string) => {
    await markAsRead(messageId);
    setSelectedMessageId(messageId);
  };

  const handleSendReply = async (mentorshipId: string) => {
    if (!replyText.trim()) return;
    
    const result = await sendMessage(mentorshipId, replyText);
    if (result.success) {
      setReplyText('');
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Communicate with your mentees</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start justify-between border-b border-border pb-4">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-48 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-16" />
                </div>
              ))}
            </div>
          ) : uniqueSenders.length > 0 ? (
            <div className="space-y-4">
              {uniqueSenders.map(message => (
                <div key={message.id} className="flex items-start justify-between border-b border-border pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-soft-peach p-3 rounded-full">
                      {message.sender?.avatar_url ? (
                        <img 
                          src={message.sender.avatar_url}
                          alt={getSenderName(message)}
                          className="h-5 w-5 rounded-full object-cover" 
                        />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-mentor-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{getSenderName(message)}</h4>
                        {!message.is_read && message.sender_id !== message.sender_id && (
                          <span className="ml-2 bg-mentor-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(message.created_at)}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleMarkAsRead(message.id)}
                  >
                    Reply
                  </Button>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <Button variant="outline">View All Messages</Button>
              </div>
              
              {selectedMessageId && (
                <div className="mt-6 border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Reply</h4>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Type your reply..." 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button 
                      onClick={() => {
                        const message = messages.find(m => m.id === selectedMessageId);
                        if (message) {
                          handleSendReply(message.mentorship_id);
                        }
                      }}
                    >
                      <Send className="h-4 w-4 mr-2" /> Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/20 rounded-lg">
              <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No messages found</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Recent updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start space-x-4 border-b border-border pb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-64 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.length > 0 && (
                <div className="flex items-start space-x-4 border-b border-border pb-4">
                  <div className="bg-soft-yellow p-3 rounded-full">
                    <Bell className="h-5 w-5 text-mentor-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Session Reminder:</span> Your next session is {formatDate(upcomingSessions[0].scheduled_at)}.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Just now</p>
                  </div>
                </div>
              )}
              
              {newMessages.length > 0 && (
                <div className="flex items-start space-x-4 border-b border-border pb-4">
                  <div className="bg-soft-purple p-3 rounded-full">
                    <Bell className="h-5 w-5 text-mentor-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">New Messages:</span> You have {newMessages.length} unread message{newMessages.length !== 1 ? 's' : ''}.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Today</p>
                  </div>
                </div>
              )}
              
              {!upcomingSessions.length && !newMessages.length && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No new notifications</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

// Helper constant to avoid ReferenceError
const upcomingSessions: any[] = [];
const newMessages: any[] = [];

export default MessagesTab;
