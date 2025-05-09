
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import MentorShowcase from '@/components/MentorShowcase';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <MentorShowcase />
        <TestimonialSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
