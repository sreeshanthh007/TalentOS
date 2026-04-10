import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { type UserRole } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';

interface ProtectedRouteProps {
  role: UserRole;
  children: React.ReactNode;
}

export const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => {
    if (role === 'candidate') return state.candidate.isAuthenticated;
    if (role === 'employer') return state.employer.isAuthenticated;
    if (role === 'admin') return state.admin.isAuthenticated;
    return false;
  });

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
};
