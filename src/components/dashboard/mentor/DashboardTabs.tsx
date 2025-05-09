
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, Users, BarChart3, User } from 'lucide-react';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="bg-white rounded-lg p-1 shadow-sm">
        <TabsList className="grid grid-cols-5 w-full gap-4">
          <TabsTrigger value="overview" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
            <BarChart3 className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
            <Calendar className="mr-2 h-4 w-4" /> Sessions
          </TabsTrigger>
          <TabsTrigger value="mentees" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" /> Mentees
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
            <MessageSquare className="mr-2 h-4 w-4" /> Messages
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-mentor-primary data-[state=active]:text-white">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
        </TabsList>
      </div>
      
      {children}
    </Tabs>
  );
};

export default DashboardTabs;
