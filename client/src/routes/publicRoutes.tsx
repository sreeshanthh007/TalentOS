import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import { PublicLayout } from '@/shared/layouts/PublicLayout';
import PageTransition from '@/shared/components/PageTransition';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const HomePage = lazy(() => import('@/modules/public/pages/HomePage'));
const AboutPage = lazy(() => import('@/modules/public/pages/AboutPage'));
const JobListingsPage = lazy(() => import('@/modules/public/pages/JobListingsPage'));
const JobDetailPage = lazy(() => import('@/modules/public/pages/JobDetailPage'));
const EmployersLandingPage = lazy(() => import('@/modules/public/pages/EmployersLandingPage'));
const LoginPage = lazy(() => import('@/modules/auth/pages/LoginPage'));
const CandidateRegisterPage = lazy(() => import('@/modules/auth/pages/CandidateRegisterPage'));
const EmployerRegisterPage = lazy(() => import('@/modules/auth/pages/EmployerRegisterPage'));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<PageTransition><HomePage /></PageTransition>} />
          <Route path={ROUTES.PUBLIC.ABOUT} element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path={ROUTES.PUBLIC.JOBS} element={<PageTransition><JobListingsPage /></PageTransition>} />
          <Route path={ROUTES.PUBLIC.JOB_DETAIL} element={<PageTransition><JobDetailPage /></PageTransition>} />
          <Route path={ROUTES.PUBLIC.EMPLOYERS} element={<PageTransition><EmployersLandingPage /></PageTransition>} />
          <Route path={ROUTES.AUTH.LOGIN} element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path={ROUTES.AUTH.REGISTER_CANDIDATE} element={<PageTransition><CandidateRegisterPage /></PageTransition>} />
          <Route path={ROUTES.AUTH.REGISTER_EMPLOYER} element={<PageTransition><EmployerRegisterPage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
