
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Star } from 'lucide-react';

// Sample mentor data
const allMentors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior UX Designer',
    company: 'Design Labs',
    rating: 4.9,
    reviews: 127,
    expertise: ['User Experience', 'Product Design', 'UI/UX'],
    category: 'design',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80',
    available: true,
    hourlyRate: 85
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Principal Engineer',
    company: 'TechGrowth',
    rating: 4.8,
    reviews: 93,
    expertise: ['Software Architecture', 'System Design', 'Leadership'],
    category: 'engineering',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&q=80',
    available: true,
    hourlyRate: 120
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    title: 'Marketing Director',
    company: 'Global Reach',
    rating: 4.7,
    reviews: 58,
    expertise: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
    category: 'marketing',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&q=80',
    available: false,
    hourlyRate: 95
  },
  {
    id: 4,
    name: 'Jennifer Taylor',
    title: 'Data Science Lead',
    company: 'Insight Analytics',
    rating: 4.9,
    reviews: 112,
    expertise: ['Machine Learning', 'Data Analysis', 'Python'],
    category: 'data',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&q=80',
    available: true,
    hourlyRate: 110
  },
  {
    id: 5,
    name: 'David Wilson',
    title: 'Product Manager',
    company: 'InnovateCorp',
    rating: 4.6,
    reviews: 87,
    expertise: ['Product Strategy', 'Agile', 'User Research'],
    category: 'product',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&q=80',
    available: true,
    hourlyRate: 90
  },
  {
    id: 6,
    name: 'Rachel Kim',
    title: 'Frontend Lead',
    company: 'WebSolutions',
    rating: 4.8,
    reviews: 73,
    expertise: ['React', 'JavaScript', 'UI Development'],
    category: 'engineering',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80',
    available: true,
    hourlyRate: 95
  }
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'data', label: 'Data Science' }
];

const FindMentors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState(allMentors);

  // Apply filters when any filter changes
  React.useEffect(() => {
    let result = allMentors;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(mentor => 
        mentor.name.toLowerCase().includes(term) ||
        mentor.title.toLowerCase().includes(term) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(mentor => mentor.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(mentor => 
      mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1]
    );
    
    // Filter by availability
    if (availableOnly) {
      result = result.filter(mentor => mentor.available);
    }
    
    setFilteredMentors(result);
  }, [searchTerm, selectedCategory, priceRange, availableOnly]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="mb-4">Find Your <span className="gradient-text">Perfect Mentor</span></h1>
            <p className="text-lg text-muted-foreground">
              Browse our community of expert mentors and find the right match for your professional goals.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12 bg-background rounded-xl p-6 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search by name, title, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <Label>Price Range ($/hr)</Label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 150]}
                  min={0}
                  max={150}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="available-only" 
                  checked={availableOnly}
                  onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
                />
                <Label htmlFor="available-only" className="ml-2">
                  Show only available mentors
                </Label>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">Showing {filteredMentors.length} mentors</p>
          </div>

          {/* Mentors Grid */}
          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMentors.map((mentor) => (
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
                      <span className="ml-auto font-semibold">${mentor.hourlyRate}/hr</span>
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
                        <a href={`/mentor/${mentor.id}`}>View Profile</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No mentors found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find mentors.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindMentors;
