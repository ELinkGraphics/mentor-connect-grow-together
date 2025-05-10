
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/hooks/use-profile';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize form fields when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setBio(profile.bio || '');
      setSpecialty(profile.specialty || '');
      setYearsExperience(profile.years_experience?.toString() || '');
    }
  }, [profile]);
  
  const handleStartEditing = () => {
    setIsEditing(true);
  };
  
  const handleCancelEditing = () => {
    // Reset form fields to original values
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setBio(profile.bio || '');
      setSpecialty(profile.specialty || '');
      setYearsExperience(profile.years_experience?.toString() || '');
    }
    setIsEditing(false);
  };
  
  const handleSaveProfile = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        bio,
        specialty,
        years_experience: yearsExperience ? parseInt(yearsExperience, 10) : null
      });
      
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <div className="space-y-4 w-full">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Profile Not Found</CardTitle>
              <CardDescription>We couldn't find your profile information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">Please try refreshing the page or contact support if the issue persists.</p>
              <Button onClick={() => window.location.reload()} className="w-full">Refresh Page</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  const initials = `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
  const fullName = `${profile.first_name} ${profile.last_name}`;
  const userRole = profile.role.charAt(0).toUpperCase() + profile.role.slice(1);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>View and manage your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar className="h-32 w-32 border-2 border-border">
                    {profile.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={fullName} />
                    ) : (
                      <AvatarFallback className="text-4xl bg-mentor-primary text-white">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="space-y-2">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{fullName}</h2>
                        <p className="text-mentor-primary font-medium">{userRole}</p>
                        <p className="text-muted-foreground">{user?.email}</p>
                      </>
                    )}
                    
                    {isEditing ? (
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button variant="outline" onClick={handleCancelEditing} disabled={isSaving}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={handleStartEditing} className="mt-4">
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                {profile.role !== 'mentee' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mentor Information</h3>
                    
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Specialty/Expertise</Label>
                          <Input
                            id="specialty"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            placeholder="e.g. Frontend Development, UX Design"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="yearsExperience">Years of Experience</Label>
                          <Input
                            id="yearsExperience"
                            type="number"
                            value={yearsExperience}
                            onChange={(e) => setYearsExperience(e.target.value)}
                            min="0"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-muted-foreground block">Specialty:</span>
                          <span>{profile.specialty || "Not specified"}</span>
                        </div>
                        
                        <div>
                          <span className="text-muted-foreground block">Experience:</span>
                          <span>{profile.years_experience ? `${profile.years_experience} years` : "Not specified"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bio</h3>
                  
                  {isEditing ? (
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell others about yourself..."
                      rows={6}
                    />
                  ) : (
                    <p className="whitespace-pre-line">
                      {profile.bio || "No bio provided yet."}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
