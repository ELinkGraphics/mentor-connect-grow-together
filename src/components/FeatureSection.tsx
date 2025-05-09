
import React from 'react';
import { Calendar, MessageSquare, Search, Award, Users } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-10 w-10 text-mentor-primary" />,
    title: 'Find the Perfect Match',
    description: 'Our intelligent matching algorithm connects you with mentors based on your goals, interests, and experience level.'
  },
  {
    icon: <Calendar className="h-10 w-10 text-mentor-primary" />,
    title: 'Easy Scheduling',
    description: 'Book sessions with your mentor through our integrated calendar system that handles time zones automatically.'
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-mentor-primary" />,
    title: 'Seamless Communication',
    description: 'Chat directly with your mentor through our built-in messaging system, share resources, and track progress.'
  },
  {
    icon: <Users className="h-10 w-10 text-mentor-primary" />,
    title: 'Community & Network',
    description: 'Connect with a community of peers and professionals to expand your network and share knowledge.'
  },
  {
    icon: <Award className="h-10 w-10 text-mentor-primary" />,
    title: 'Vetted Mentors',
    description: 'All mentors on our platform are vetted professionals with experience in their fields.'
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-4">How MentorConnect <span className="gradient-text">Works</span></h2>
          <p className="text-lg text-muted-foreground">
            Our platform makes it easy to connect with mentors and grow your skills through personalized guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-soft-purple inline-flex p-3 rounded-lg mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
