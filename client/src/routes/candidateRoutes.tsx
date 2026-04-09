import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CandidateLayout } from '@/shared/layouts/DashboardLayouts';
import PageTransition from '@/shared/components/PageTransition';
import ProtectedRoute from '@/shared/components/common/ProtectedRoute';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const CandidateDashboardPage = lazy(() => import('@/modules/candidate/pages/CandidateDashboardPage'));
const ResumeBuilderPage = lazy(() => import('@/modules/candidate/pages/ResumeBuilderPage'));
const CandidateProfilePage = lazy(() => import('@/modules/candidate/pages/CandidateProfilePage'));

const CandidateRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute role="candidate">
              <CandidateLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PageTransition><CandidateDashboardPage /></PageTransition>} />
          <Route path="profile" element={<PageTransition><CandidateProfilePage /></PageTransition>} />
          <Route path="resume-builder" element={<PageTransition><ResumeBuilderPage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default CandidateRoutes;
