
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Star, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  FileText
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample mentor data - in a real app this would come from an API
const mentorsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior UX Designer",
    company: "Design Labs",
    rating: 4.9,
    reviews: 127,
    expertise: ["User Experience", "Product Design", "UI/UX"],
    category: "design",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80",
    available: true,
    hourlyRate: 85,
    bio: "With over 8 years of experience in UX design, I help professionals develop their design thinking skills and create user-centered products. My approach focuses on practical exercises and real-world applications.",
    education: [
      { degree: "MS in Human-Computer Interaction", school: "Stanford University", year: "2017" },
      { degree: "BA in Visual Design", school: "Rhode Island School of Design", year: "2015" }
    ],
    experience: [
      { role: "Senior UX Designer", company: "Design Labs", duration: "2020 - Present" },
      { role: "UX Designer", company: "Creative Solutions", duration: "2017 - 2020" },
      { role: "UI/UX Intern", company: "TechStart", duration: "2016" }
    ],
    availableSlots: [
      { date: "2025-05-12", slots: ["10:00", "14:00", "16:00"] },
      { date: "2025-05-13", slots: ["09:00", "13:00"] },
      { date: "2025-05-14", slots: ["11:00", "15:00", "17:00"] },
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Principal Engineer",
    company: "TechGrowth",
    rating: 4.8,
    reviews: 93,
    expertise: ["Software Architecture", "System Design", "Leadership"],
    category: "engineering",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&q=80",
    available: true,
    hourlyRate: 120,
    bio: "I'm a principal engineer with 12+ years of experience building scalable systems. My mentoring focuses on software architecture, system design, and career growth for engineers looking to advance to senior and leadership roles.",
    education: [
      { degree: "MS in Computer Science", school: "MIT", year: "2011" },
      { degree: "BS in Software Engineering", school: "University of Washington", year: "2009" }
    ],
    experience: [
      { role: "Principal Engineer", company: "TechGrowth", duration: "2019 - Present" },
      { role: "Senior Software Engineer", company: "MegaCorp", duration: "2015 - 2019" },
      { role: "Software Engineer", company: "StartupX", duration: "2011 - 2015" }
    ],
    availableSlots: [
      { date: "2025-05-12", slots: ["09:00", "13:00", "17:00"] },
      { date: "2025-05-15", slots: ["10:00", "14:00"] },
      { date: "2025-05-16", slots: ["11:00", "15:00", "18:00"] },
    ]
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    title: "Marketing Director",
    company: "Global Reach",
    rating: 4.7,
    reviews: 58,
    expertise: ["Digital Marketing", "Brand Strategy", "Analytics"],
    category: "marketing",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&q=80",
    available: false,
    hourlyRate: 95,
    bio: "Marketing leader with 10+ years of experience in digital marketing, brand strategy, and analytics. I help professionals develop comprehensive marketing strategies and provide guidance on career advancement in the marketing field.",
    education: [
      { degree: "MBA, Marketing", school: "Columbia Business School", year: "2013" },
      { degree: "BA in Communications", school: "UCLA", year: "2010" }
    ],
    experience: [
      { role: "Marketing Director", company: "Global Reach", duration: "2018 - Present" },
      { role: "Senior Marketing Manager", company: "BrandBuilders", duration: "2015 - 2018" },
      { role: "Marketing Analyst", company: "DataDriven", duration: "2013 - 2015" }
    ],
    availableSlots: [
      { date: "2025-05-19", slots: ["10:00", "14:00"] },
      { date: "2025-05-20", slots: ["09:00", "13:00", "17:00"] },
      { date: "2025-05-21", slots: ["11:00", "15:00"] },
    ]
  },
  {
    id: 4,
    name: "Jennifer Taylor",
    title: "Data Science Lead",
    company: "Insight Analytics",
    rating: 4.9,
    reviews: 112,
    expertise: ["Machine Learning", "Data Analysis", "Python"],
    category: "data",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&q=80",
    available: true,
    hourlyRate: 110,
    bio: "Data scientist with expertise in machine learning, predictive modeling, and data visualization. I mentor professionals looking to break into data science or advance their analytical skills through hands-on projects and personalized guidance.",
    education: [
      { degree: "PhD in Statistics", school: "UC Berkeley", year: "2015" },
      { degree: "MS in Applied Mathematics", school: "University of Michigan", year: "2012" }
    ],
    experience: [
      { role: "Data Science Lead", company: "Insight Analytics", duration: "2019 - Present" },
      { role: "Senior Data Scientist", company: "DataCorp", duration: "2015 - 2019" },
      { role: "Research Assistant", company: "Berkeley AI Lab", duration: "2012 - 2015" }
    ],
    availableSlots: [
      { date: "2025-05-12", slots: ["10:00", "15:00"] },
      { date: "2025-05-13", slots: ["09:00", "14:00", "16:00"] },
      { date: "2025-05-14", slots: ["11:00", "13:00", "17:00"] },
    ]
  },
  {
    id: 5,
    name: "David Wilson",
    title: "Product Manager",
    company: "InnovateCorp",
    rating: 4.6,
    reviews: 87,
    expertise: ["Product Strategy", "Agile", "User Research"],
    category: "product",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&q=80",
    available: true,
    hourlyRate: 90,
    bio: "Product manager with a passion for innovative solutions and a track record of delivering successful products. My mentoring approach combines theory with practical exercises to help product professionals grow in their careers.",
    education: [
      { degree: "MBA", school: "Harvard Business School", year: "2014" },
      { degree: "BS in Computer Science", school: "Georgia Tech", year: "2011" }
    ],
    experience: [
      { role: "Product Manager", company: "InnovateCorp", duration: "2018 - Present" },
      { role: "Associate Product Manager", company: "TechSolutions", duration: "2015 - 2018" },
      { role: "Product Analyst", company: "DataFirst", duration: "2014 - 2015" }
    ],
    availableSlots: [
      { date: "2025-05-15", slots: ["09:00", "13:00", "17:00"] },
      { date: "2025-05-16", slots: ["10:00", "14:00"] },
      { date: "2025-05-17", slots: ["11:00", "15:00", "18:00"] },
    ]
  },
  {
    id: 6,
    name: "Rachel Kim",
    title: "Frontend Lead",
    company: "WebSolutions",
    rating: 4.8,
    reviews: 73,
    expertise: ["React", "JavaScript", "UI Development"],
    category: "engineering",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80",
    available: true,
    hourlyRate: 95,
    bio: "Frontend developer specialized in React and modern JavaScript frameworks. I help developers improve their frontend skills, master component architecture, and build accessible, responsive web applications.",
    education: [
      { degree: "MS in Web Engineering", school: "NYU", year: "2016" },
      { degree: "BS in Computer Science", school: "University of Illinois", year: "2014" }
    ],
    experience: [
      { role: "Frontend Lead", company: "WebSolutions", duration: "2019 - Present" },
      { role: "Senior Frontend Developer", company: "AppWorks", duration: "2016 - 2019" },
      { role: "UI Developer", company: "CreativeTech", duration: "2014 - 2016" }
    ],
    availableSlots: [
      { date: "2025-05-19", slots: ["10:00", "14:00"] },
      { date: "2025-05-20", slots: ["09:00", "13:00"] },
      { date: "2025-05-21", slots: ["11:00", "16:00", "18:00"] },
    ]
  }
];

const MentorProfile: React.FC = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Find the mentor based on the ID parameter
  const mentor = mentorsData.find(m => m.id === Number(id));
  
  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Mentor Not Found</h1>
          <p className="text-xl text-gray-600 mb-4">We couldn't find the mentor you're looking for.</p>
          <a href="/find-mentors" className="text-blue-500 hover:text-blue-700 underline">
            Return to Find Mentors
          </a>
        </div>
      </div>
    );
  }
  
  // Get available times for selected date
  const getAvailableTimesForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const formattedDate = date.toISOString().split('T')[0];
    const dateSlot = mentor.availableSlots.find(slot => slot.date === formattedDate);
    return dateSlot ? dateSlot.slots : [];
  };
  
  const availableTimes = getAvailableTimesForDate(selectedDate);
  
  // Book session handler
  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Booking Failed",
        description: "Please select both date and time for your session.",
        variant: "destructive"
      });
      return;
    }
    
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    toast({
      title: "Session Booked!",
      description: `Your session with ${mentor.name} is scheduled for ${formattedDate} at ${selectedTime}.`,
      variant: "default"
    });
    
    // Reset selection
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 pt-32">
        <div className="container mx-auto px-4">
          {/* Mentor Profile Header */}
          <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  {mentor.available ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Available for Mentoring
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                      Currently Unavailable
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                    {mentor.category.charAt(0).toUpperCase() + mentor.category.slice(1)}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold mb-1">{mentor.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{mentor.title} at {mentor.company}</p>
                
                <div className="flex items-center mb-6">
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">({mentor.reviews} reviews)</span>
                  <span className="ml-auto text-xl font-semibold">${mentor.hourlyRate}/hr</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-muted-foreground">{mentor.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-muted"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="about" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Session</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            {/* About Section */}
            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Experience */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {mentor.experience.map((exp, index) => (
                        <div key={index}>
                          <p className="font-medium">{exp.role}</p>
                          <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Education */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Education
                    </h3>
                    <div className="space-y-4">
                      {mentor.education.map((edu, index) => (
                        <div key={index}>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Mentoring Approach */}
                <Card className="md:col-span-2">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Mentoring Approach</h3>
                    <div className="space-y-4">
                      <p>As a mentor, I focus on practical skill development tailored to your specific goals. My approach includes:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Personalized guidance based on your current skill level and career objectives</li>
                        <li>Regular feedback and progress tracking to ensure growth</li>
                        <li>Hands-on exercises and real-world projects to apply concepts</li>
                        <li>Industry insights and networking opportunities when relevant</li>
                        <li>Career development advice and strategies for professional advancement</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Scheduling Section */}
            <TabsContent value="schedule">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Calendar */}
                <Card className="md:col-span-2">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      Select a Date
                    </h3>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        className="rounded-md border"
                        disabled={(date) => {
                          // Disable past dates and dates not in available slots
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          
                          const formattedDate = date.toISOString().split('T')[0];
                          const isAvailable = mentor.availableSlots.some(slot => slot.date === formattedDate);
                          
                          return date < today || !isAvailable;
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Time Slots */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      Select a Time
                    </h3>
                    {availableTimes.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className="w-full"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        {selectedDate 
                          ? "No available times for selected date" 
                          : "Please select a date first"}
                      </p>
                    )}
                    
                    <div className="mt-6">
                      <Button 
                        className="w-full" 
                        disabled={!selectedDate || !selectedTime || !mentor.available}
                        onClick={handleBookSession}
                      >
                        Book Session
                      </Button>
                      
                      {!mentor.available && (
                        <p className="text-sm text-destructive mt-2 text-center">
                          This mentor is currently unavailable for booking
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Session Info */}
                <Card className="md:col-span-3">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Session Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Communication</h4>
                          <p className="text-sm text-muted-foreground">
                            Sessions are conducted via video call. You'll receive connection details after booking.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Duration</h4>
                          <p className="text-sm text-muted-foreground">
                            Each session is 60 minutes long with time for questions and practice.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Preparation</h4>
                          <p className="text-sm text-muted-foreground">
                            After booking, you'll receive a pre-session questionnaire to help tailor the mentoring to your needs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Reviews Section */}
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="bg-background rounded-xl border border-border p-6">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Reviews</h3>
                      <div className="flex items-center">
                        <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                        <span className="ml-1 font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Emma L.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">March 15, 2025</p>
                      <p>
                        {mentor.name} is an excellent mentor! Their guidance helped me improve my skills
                        significantly. The sessions were well-structured and the feedback was actionable.
                        Highly recommend!
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Marcus T.</div>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ))}
                          {[...Array(1)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">February 28, 2025</p>
                      <p>
                        Great sessions with practical insights. The mentor provided valuable industry perspective
                        and helped me improve my portfolio. Would definitely book again for follow-up sessions.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Sophia R.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">January 10, 2025</p>
                      <p>
                        I've had multiple sessions with {mentor.name} and each one has been incredibly helpful.
                        They take the time to understand your goals and tailor their guidance accordingly.
                        The resources they shared were also very relevant and useful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related Mentors */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Other Mentors You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mentorsData
                .filter(m => m.id !== mentor.id && m.category === mentor.category)
                .slice(0, 3)
                .map((relatedMentor) => (
                  <div 
                    key={relatedMentor.id} 
                    className="bg-background rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={relatedMentor.image} 
                        alt={relatedMentor.name} 
                        className="w-full h-full object-cover"
                      />
                      {relatedMentor.available ? (
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
                      <h3 className="text-xl font-semibold">{relatedMentor.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{relatedMentor.title}</p>
                      
                      <div className="flex items-center mb-4">
                        <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                        <span className="ml-1 font-medium">{relatedMentor.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">({relatedMentor.reviews} reviews)</span>
                        <span className="ml-auto font-semibold">${relatedMentor.hourlyRate}/hr</span>
                      </div>
                      
                      <div className="mt-4">
                        <Button className="w-full" asChild>
                          <a href={`/mentor/${relatedMentor.id}`}>View Profile</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentorProfile;
