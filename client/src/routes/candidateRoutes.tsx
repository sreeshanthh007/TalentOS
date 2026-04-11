import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CandidateLayout } from '@/shared/layouts/DashboardLayouts'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'
import PageTransition from '@/shared/components/PageTransition'
import AppliedJobsPage from '@/modules/candidate/pages/AppliedJobsPage'
import ShortlistedPage from '@/modules/candidate/pages/ShortlistedPage'
import LoadingSpinner from '@/shared/components/common/LoadingSpinner'


const CandidateDashboardPage = lazy(() => import('@/modules/candidate/pages/CandidateDashboardPage'))

const ResumeBuilderPage = lazy(() => import('@/modules/candidate/pages/ResumeBuilderPage'))
const CandidateProfilePage = lazy(() => import('@/modules/candidate/pages/CandidateProfilePage'))

const CandidateRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<ProtectedRoute role="candidate"><CandidateLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<PageTransition><CandidateDashboardPage /></PageTransition>} />
          <Route path="applied-jobs" element={<PageTransition><AppliedJobsPage /></PageTransition>} />
          <Route path="shortlisted" element={<PageTransition><ShortlistedPage /></PageTransition>} />
          <Route path="resume-builder" element={<PageTransition><ResumeBuilderPage /></PageTransition>} />
          <Route path="profile" element={<PageTransition><CandidateProfilePage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default CandidateRoutes
