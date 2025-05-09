
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Award } from 'lucide-react';

const MentorToolkit: React.FC = () => {
  return (
    <Card>
      <CardHeader className="bg-soft-peach/30 rounded-t-lg">
        <CardTitle className="flex items-center text-orange-600">
          <FileText className="mr-2 h-5 w-5" /> Mentor Toolkit
        </CardTitle>
        <CardDescription>Resources for mentors</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
            <FileText className="h-5 w-5 mr-3 text-mentor-primary" />
            <div>
              <p className="text-sm font-medium">Session Templates</p>
              <p className="text-xs text-muted-foreground">Frameworks for effective meetings</p>
            </div>
          </div>
          <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
            <Users className="h-5 w-5 mr-3 text-mentor-secondary" />
            <div>
              <p className="text-sm font-medium">Mentorship Best Practices</p>
              <p className="text-xs text-muted-foreground">Tips for impactful guidance</p>
            </div>
          </div>
          <div className="flex items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
            <Award className="h-5 w-5 mr-3 text-mentee-primary" />
            <div>
              <p className="text-sm font-medium">Growth Assessment</p>
              <p className="text-xs text-muted-foreground">Tools to measure mentee progress</p>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full bg-mentor-primary hover:bg-mentor-primary/90">
              Access Resource Library
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorToolkit;
