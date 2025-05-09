
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
      <div className="space-y-1">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
          <span className="ml-3 px-3 py-1 text-xs font-medium bg-mentor-primary text-white rounded-full">Mentor</span>
        </div>
        <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-2">
        <Button variant="outline" className="border-mentor-primary text-mentor-primary hover:bg-mentor-primary hover:text-white">
          <Clock className="mr-2 h-4 w-4" /> Availability Settings
        </Button>
        <Button className="bg-mentor-primary hover:bg-mentor-primary/90">
          <Calendar className="mr-2 h-4 w-4" /> Manage Sessions
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
