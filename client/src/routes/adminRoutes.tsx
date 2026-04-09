import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/shared/layouts/DashboardLayouts';
import PageTransition from '@/shared/components/PageTransition';
import ProtectedRoute from '@/shared/components/common/ProtectedRoute';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const AdminDashboardPage = lazy(() => import('@/modules/admin/pages/AdminDashboardPage'));
const EmployerManagementPage = lazy(() => import('@/modules/admin/pages/EmployerManagementPage'));
const CandidateManagementPage = lazy(() => import('@/modules/admin/pages/CandidateManagementPage'));
const PlanManagementPage = lazy(() => import('@/modules/admin/pages/PlanManagementPage'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PageTransition><AdminDashboardPage /></PageTransition>} />
          <Route path="employers" element={<PageTransition><EmployerManagementPage /></PageTransition>} />
          <Route path="candidates" element={<PageTransition><CandidateManagementPage /></PageTransition>} />
          <Route path="plans" element={<PageTransition><PlanManagementPage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
