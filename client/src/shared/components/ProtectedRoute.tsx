import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { UserRole } from '@/shared/types';
import { useAppInit } from '@/shared/hooks/useAppInit';
import { ROUTES } from '@/shared/constants/routes.constants';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  role: UserRole;
  children: React.ReactNode;
}

export const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const { isInitializing } = useAppInit();

  const isAuthenticated = useAppSelector((state) => {
    if (role === 'candidate') return state.candidate.isAuthenticated;
    if (role === 'employer') return state.employer.isAuthenticated;
    if (role === 'admin') return state.admin.isAuthenticated;
    return false;
  });

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a2329]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-16 w-16 rounded-full border-4 border-t-teal-500 border-r-teal-500 border-b-transparent border-l-transparent"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
};
