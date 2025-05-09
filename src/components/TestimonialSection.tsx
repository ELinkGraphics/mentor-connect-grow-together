
import React from 'react';
import { Separator } from '@/components/ui/separator';

const testimonials = [
  {
    quote: "Finding a mentor on MentorConnect completely changed my career trajectory. The guidance I received helped me transition to a senior role within just 6 months.",
    author: "Jamie Smith",
    role: "Product Manager",
    company: "Innovate Labs"
  },
  {
    quote: "As a mentor, I've been able to give back to the community while also expanding my own network. The platform makes scheduling and communication incredibly easy.",
    author: "Dr. Priya Patel",
    role: "Engineering Director",
    company: "TechGiant Inc."
  },
  {
    quote: "The matching algorithm connected me with a mentor who perfectly understood my goals and challenges. Our sessions have been invaluable for my professional growth.",
    author: "Carlos Rodriguez",
    role: "Marketing Specialist",
    company: "Brand Forward"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-4">What Our <span className="gradient-text">Community Says</span></h2>
          <p className="text-lg text-muted-foreground">
            Real stories from mentors and mentees who have experienced the power of meaningful connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl text-mentor-primary mb-4">"</div>
              <p className="italic mb-6">{testimonial.quote}</p>
              <Separator className="mb-6" />
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
