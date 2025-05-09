
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bell } from 'lucide-react';

interface Message {
  id: number;
  from: string;
  preview: string;
  timestamp: string;
  unread: boolean;
}

interface MessagesTabProps {
  messages: Message[];
  formatDate: (dateString: string) => string;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ messages, formatDate }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Communicate with your mentees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className="flex items-start justify-between border-b border-border pb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-soft-peach p-3 rounded-full">
                    <MessageSquare className="h-5 w-5 text-mentor-primary" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{message.from}</h4>
                      {message.unread && (
                        <span className="ml-2 bg-mentor-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-sm">{message.preview}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(message.timestamp)}</p>
                  </div>
                </div>
                <Button size="sm">Reply</Button>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="outline">View All Messages</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Recent updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 border-b border-border pb-4">
              <div className="bg-soft-yellow p-3 rounded-full">
                <Bell className="h-5 w-5 text-mentor-primary" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Session Reminder:</span> Your session with John Smith is tomorrow at 10:30 AM.
                </p>
                <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 border-b border-border pb-4">
              <div className="bg-soft-purple p-3 rounded-full">
                <Bell className="h-5 w-5 text-mentor-primary" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">New Mentee Request:</span> Alex Wong has requested you as a mentor.
                </p>
                <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 border-b border-border pb-4">
              <div className="bg-soft-green p-3 rounded-full">
                <Bell className="h-5 w-5 text-mentor-primary" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">New Feedback:</span> Emma Johnson left a 5-star review for your last session.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday at 2:15 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MessagesTab;
