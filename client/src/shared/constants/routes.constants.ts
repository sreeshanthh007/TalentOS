export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER_CANDIDATE: '/register/candidate',
    REGISTER_EMPLOYER: '/register/employer',
  },
  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    APPLIED_JOBS: '/candidate/applied-jobs',
    SHORTLISTED: '/candidate/shortlisted',
    RESUME_BUILDER: '/candidate/resume-builder',
    PROFILE: '/candidate/profile',
  },
  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    JOBS: '/employer/jobs',
    APPLICANTS: '/employer/applicants',
    PROFILE: '/employer/profile',
    SUBSCRIPTION: '/employer/subscription',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EMPLOYERS: '/admin/employers',
    CANDIDATES: '/admin/candidates',
    PLANS: '/admin/plans',
    INQUIRIES: '/admin/inquiries',
  },
  PUBLIC: {
    JOBS: '/jobs',
    JOB_DETAIL: '/jobs/:id',
    EMPLOYERS: '/employers',
    ABOUT: '/about',
  }
}
