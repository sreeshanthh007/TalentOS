import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/shared/layouts/AdminLayout';
import PageTransition from '@/shared/components/PageTransition';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const AdminDashboardPage = lazy(() => import('@/modules/admin/pages/AdminDashboardPage'));
const EmployerManagementPage = lazy(() => import('@/modules/admin/pages/EmployerManagementPage'));
const CandidateManagementPage = lazy(() => import('@/modules/admin/pages/CandidateManagementPage'));
const PlanManagementPage = lazy(() => import('@/modules/admin/pages/PlanManagementPage'));
const InquiriesPage = lazy(() => import('@/modules/admin/pages/InquiriesPage'));
const AdminChatPage = lazy(() => import('@/modules/admin/pages/AdminChatPage'));

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
          <Route path="inquiries" element={<PageTransition><InquiriesPage /></PageTransition>} />
          <Route path="inquiries/:id/chat" element={<PageTransition><AdminChatPage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  );
};


export default AdminRoutes;
