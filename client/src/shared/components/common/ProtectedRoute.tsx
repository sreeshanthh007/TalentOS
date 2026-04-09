import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { ROUTES } from '@/shared/constants/routes.constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'candidate' | 'employer' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} />;
  }
  
  if (role && user?.role !== role) {
    return <Navigate to={ROUTES.HOME} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
