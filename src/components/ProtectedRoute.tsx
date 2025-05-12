
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'mentee' | 'mentor' | 'both';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    // Role-based authorization
    if (requiredRole && userRole) {
      const hasRequiredRole = 
        userRole === requiredRole || 
        userRole === 'both' ||  
        requiredRole === 'both';
      
      if (!hasRequiredRole) {
        // Redirect to appropriate dashboard based on user role
        if (userRole === 'mentor') {
          navigate('/mentor-dashboard', { replace: true });
        } else if (userRole === 'mentee') {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    }
  }, [user, loading, navigate, requiredRole, userRole]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect due to the useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
