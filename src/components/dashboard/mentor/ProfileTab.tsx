
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProfileTabProps {
  mentorStats: {
    topSkills: string[];
  };
}

const ProfileTab: React.FC<ProfileTabProps> = ({ mentorStats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentor Profile</CardTitle>
        <CardDescription>Manage how you appear to potential mentees</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-mentor-primary to-mentor-secondary flex items-center justify-center text-white text-4xl">
              SJ
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Dr. Sarah Johnson</h3>
              <p className="text-lg">Chief UX Officer at DesignHub</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {mentorStats.topSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-mentor-primary/10 text-mentor-primary rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <Button variant="outline" className="mr-2">Edit Profile</Button>
                <Button>Preview Public View</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Profile Visibility</h3>
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Open to New Mentees</p>
                  <p className="text-sm text-muted-foreground">Your profile will appear in search results</p>
                </div>
                <Button variant="outline">Currently ON</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Featured Mentor Status</p>
                  <p className="text-sm text-muted-foreground">Eligible based on your excellent ratings</p>
                </div>
                <Button variant="outline">Apply</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Mentor Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Maximum Active Mentees</p>
                  <p className="text-sm text-muted-foreground">Current limit: 10</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Session Preferences</p>
                  <p className="text-sm text-muted-foreground">Video preferred, 45-60 minutes</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Calendar Integration</p>
                  <p className="text-sm text-muted-foreground">Google Calendar connected</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Notification Preferences</p>
                  <p className="text-sm text-muted-foreground">Email and mobile alerts enabled</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
