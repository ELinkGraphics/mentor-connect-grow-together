
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-mentor-primary/90 to-mentor-secondary/90 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay"></div>
          <div className="relative p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Accelerate Your Growth?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Join thousands of professionals who are advancing their careers through 
              meaningful mentorship connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-mentor-primary hover:bg-white/90" asChild>
                <Link to="/register" className="px-8">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/how-it-works" className="px-8">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
