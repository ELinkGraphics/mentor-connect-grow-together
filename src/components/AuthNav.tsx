
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/use-profile';

const AuthNav: React.FC = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  
  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="outline">Log In</Button>
        </Link>
        <Link to="/register">
          <Button>Sign Up</Button>
        </Link>
      </div>
    );
  }
  
  const initials = profile 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : user.email?.substring(0, 2).toUpperCase() || 'U';
    
  const fullName = profile 
    ? `${profile.first_name} ${profile.last_name}`
    : user.email?.split('@')[0] || 'User';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={fullName} />
            ) : (
              <AvatarFallback className="bg-mentor-primary text-white">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">My Profile</Link>
        </DropdownMenuItem>
        {profile?.role === 'mentor' || profile?.role === 'both' ? (
          <DropdownMenuItem asChild>
            <Link to="/mentor-dashboard">Mentor Dashboard</Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNav;
