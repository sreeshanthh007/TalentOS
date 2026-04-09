import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { EmployerLayout } from '@/shared/layouts/DashboardLayouts';
import PageTransition from '@/shared/components/PageTransition';
import ProtectedRoute from '@/shared/components/common/ProtectedRoute';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const EmployerDashboardPage = lazy(() => import('@/modules/employer/pages/EmployerDashboardPage'));
const JobManagementPage = lazy(() => import('@/modules/employer/pages/JobManagementPage'));
const ApplicantPipelinePage = lazy(() => import('@/modules/employer/pages/ApplicantPipelinePage'));

const EmployerRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute role="employer">
              <EmployerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PageTransition><EmployerDashboardPage /></PageTransition>} />
          <Route path="jobs" element={<PageTransition><JobManagementPage /></PageTransition>} />
          <Route path="applicants" element={<PageTransition><ApplicantPipelinePage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default EmployerRoutes;
