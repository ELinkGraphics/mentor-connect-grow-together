
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

// Sample mentor data
const mentors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior UX Designer',
    company: 'Design Labs',
    rating: 4.9,
    reviews: 127,
    expertise: ['User Experience', 'Product Design', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80',
    available: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Principal Engineer',
    company: 'TechGrowth',
    rating: 4.8,
    reviews: 93,
    expertise: ['Software Architecture', 'System Design', 'Leadership'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&q=80',
    available: true
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    title: 'Marketing Director',
    company: 'Global Reach',
    rating: 4.7,
    reviews: 58,
    expertise: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&q=80',
    available: false
  }
];

const MentorShowcase: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-4">Meet Our <span className="gradient-text">Expert Mentors</span></h2>
          <p className="text-lg text-muted-foreground">
            Connect with industry professionals who are passionate about sharing their knowledge and experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div 
              key={mentor.id} 
              className="bg-background rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                />
                {mentor.available ? (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Available
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                    Fully Booked
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm bg-soft-purple text-mentor-tertiary px-2 py-1 rounded-full">
                    {mentor.expertise[0]}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold">{mentor.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{mentor.title} at {mentor.company}</p>
                
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">({mentor.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-6">
                  {mentor.expertise.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex">
                  <Button className="w-full" asChild>
                    <Link to={`/mentor/${mentor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to="/find-mentors" className="px-8">See All Mentors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MentorShowcase;
