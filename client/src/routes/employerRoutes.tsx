import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { EmployerLayout } from '@/shared/layouts/EmployerLayout'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'
import PageTransition from '@/shared/components/PageTransition'
import LoadingSpinner from '@/shared/components/common/LoadingSpinner'

const EmployerDashboardPage = lazy(() => import('@/modules/employer/pages/EmployerDashboardPage'))
const JobManagementPage = lazy(() => import('@/modules/employer/pages/JobManagementPage'))
const ApplicantPipelinePage = lazy(() => import('@/modules/employer/pages/ApplicantPipelinePage'))
const SubscriptionPage = lazy(() => import('@/modules/employer/pages/SubscriptionPage'))
const EmployerProfilePage = lazy(() => import('@/modules/employer/pages/EmployerProfilePage'))
const EmployerInquiriesPage = lazy(() => import('@/modules/employer/pages/EmployerInquiriesPage'))
const EmployerChatPage = lazy(() => import('@/modules/employer/pages/EmployerChatPage'))

const EmployerRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<ProtectedRoute role="employer"><EmployerLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<PageTransition><EmployerDashboardPage /></PageTransition>} />
          <Route path="jobs" element={<PageTransition><JobManagementPage /></PageTransition>} />
          <Route path="jobs/:id/applicants" element={<PageTransition><ApplicantPipelinePage /></PageTransition>} />
          <Route path="subscription" element={<PageTransition><SubscriptionPage /></PageTransition>} />
          <Route path="profile" element={<PageTransition><EmployerProfilePage /></PageTransition>} />
          <Route path="verification" element={<PageTransition><EmployerProfilePage /></PageTransition>} />
          <Route path="inquiries" element={<PageTransition><EmployerInquiriesPage /></PageTransition>} />
          <Route path="inquiries/:id/chat" element={<PageTransition><EmployerChatPage /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  )
}


export default EmployerRoutes
