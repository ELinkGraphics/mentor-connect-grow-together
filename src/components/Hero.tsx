
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute opacity-20 top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-mentor-primary to-mentor-light rounded-full blur-3xl"></div>
        <div className="absolute opacity-20 bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-mentee-primary to-mentee-tertiary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">
            <span className="gradient-text">Connect, Learn, Grow</span> with Expert Mentorship
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            MentorConnect helps you find the perfect mentor to guide your professional journey, or become a mentor and share your expertise with others.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register" className="px-8">Find a Mentor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/become-mentor" className="px-8">Become a Mentor</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-mentor-primary">1000+</span>
              <span className="text-sm text-muted-foreground">Expert Mentors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-mentor-primary">50,000+</span>
              <span className="text-sm text-muted-foreground">Mentorship Sessions</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-mentor-primary">95%</span>
              <span className="text-sm text-muted-foreground">Satisfaction Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-mentor-primary">100+</span>
              <span className="text-sm text-muted-foreground">Skills & Areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
